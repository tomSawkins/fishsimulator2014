/// <reference path="IVector.ts" />
/// <reference path="../Extensions.ts" />
/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export enum FishState
	{
		Idle,
		Moving
	}

	export class Fish implements IComponent
	{
		private static fishCount = 0;

		private static maxTileCounts: IVector = { x: 10, y: 10 };

		private screenSize: IVector;

		private tileSize: IVector;

		constructor()
		{
			this.calculateDimensions();

			var body = $('body');

			// Generate a new ID for the fishy
			Fish.fishCount++;
			this.id = "fish" + Fish.fishCount;

			body.append('<div id="fish' + Fish.fishCount + '" class="fish"></div>');

			this.element = $('#' + this.id);

			// Pick a random starting tile
			this.tilePosition = {
				x: Math.randomRange(0, Fish.maxTileCounts.x - 1),
				y: Math.randomRange(0, Fish.maxTileCounts.y - 1)
			};

			this.moveToTile(this.tilePosition, false);

			// Handle window resize event
			$(window).resize(() =>
			{
				this.calculateDimensions();
			});
		}

		public id: string;

		private element: JQuery;

		public state: FishState = FishState.Idle;

		private tilePosition: IVector;

		private getAvailableTilePositions(): IVector[]
		{
			var result = <IVector[]>[];

			var min = {
				x: Math.max(this.tilePosition.x - 1, 0),
				y: Math.max(this.tilePosition.y - 1, 0)
			};

			var max = {
				x: Math.min(this.tilePosition.x + 1, Fish.maxTileCounts.x - 1),
				y: Math.min(this.tilePosition.y + 1, Fish.maxTileCounts.y - 1)
			};

			for (var x = min.x; x <= max.x; x++)
			{
				for (var y = min.y; y <= max.y; y++)
				{
					if (x == this.tilePosition.x && y == this.tilePosition.y)
					{
						continue;
					}

					result.push({
						x: x,
						y: y
					});
				}
			}

			return result;
		}

		private calculateDimensions(): void
		{
			this.screenSize = {
				x: $(window).width(),
				y: $(window).height()
			};

			this.tileSize = {
				x: Math.floor(this.screenSize.x / Fish.maxTileCounts.x),
				y: Math.floor(this.screenSize.y / Fish.maxTileCounts.y)
			};
		}

		public tick(elapsed: number): void
		{
			if (this.state == FishState.Idle)
			{
				// Chance a movement animation roughly every x milliseconds
				if (Math.chance(elapsed, 5000))
				{
					this.move();
				}

				// Chance a bubble to occur roughly every x milliseconds
				if (Math.chance(elapsed, 3000))
				{
					var bubble = new Bubble({
						x: this.element.position().left,
						y: this.element.position().top
					});

					App.addComponent(bubble);
				}
			}
		}

		private static tileToScreen(tile: IVector): IVector
		{
			return {
				x: ($(window).width() / Fish.maxTileCounts.x) * tile.x,
				y: ($(window).height() / Fish.maxTileCounts.y) * tile.y
			};
		}

		private moveToTile(tile: IVector, animate: boolean): void
		{
			// Translate from tile to screen
			var screen = Fish.tileToScreen(tile);

			// Center element within tile
			screen.x = Math.floor(screen.x + (this.tileSize.x / 2) - (this.element.width() / 2));
			screen.y = Math.floor(screen.y + (this.tileSize.y / 2) - (this.element.height() / 2));

			var properties = {
				left: screen.x + 'px',
				top: screen.y + 'px'
			};

			if (tile.x < this.tilePosition.x)
			{
				this.element.addClass('faceLeft');
			}
			else if (tile.x > this.tilePosition.x)
			{
				this.element.removeClass('faceLeft');
			}

			this.tilePosition = tile;

			if (animate)
			{
				this.element.animate(
					properties,
					1000,
					() =>
					{
						this.state = FishState.Idle;
					});
			}
			else
			{
				this.element.css(properties);

				this.state = FishState.Idle;
			}
		}

		private move(): void
		{
			this.state = FishState.Moving;

			// Pick a random available tile to move to
			var availableTiles = this.getAvailableTilePositions();

			var tile = availableTiles[Math.randomRange(0, availableTiles.length - 1)];

			this.moveToTile(tile, true);
		}
	}
} 