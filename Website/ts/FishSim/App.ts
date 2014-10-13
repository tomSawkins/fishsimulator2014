/// <reference path="ITime.d.ts" />
/// <reference path="Components/Plumber.ts" />
/// <reference path="Libs/jquery-blink.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="Components/IComponent.ts" />
/// <reference path="../../scripts/typings/linq/linq.d.ts" />
/// <reference path="Components/IVector.ts" />
/// <reference path="Components/Seaweed.ts" />
/// <reference path="../../scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Hubs.ts" />
module FishSim
{
	export class App
{
		private static components = <IComponent[]>[];

		public static addComponent(component: IComponent)
{
			this.components.push(component);
		}

		public static removeComponent(component: IComponent)
{
			component.flaggedForRemoval = true;

			if (component.cleanUp)
{
				component.cleanUp();
			}

			if (this.loopingThruComponentsCount == 0)
{
				this.removeFlaggedComponents();
			}
		}

		private static removeFlaggedComponents(): void
{
			var index = 0;
			while (index < this.components.length)
{
				if (this.components[index].flaggedForRemoval)
{
					this.components.splice(index, 1);
				}
				else
{
					index++;
				}
			}
		}

		private static loopingThruComponentsCount = 0;

		public static forEachComponent(action: (IComponent) => any): void
{
			this.loopingThruComponentsCount++;
			try
{
				// Do a while loop to allow for additions to the components array
				var index = 0;
				while (index < this.components.length)
{
					var component = this.components[index];

					if (!component.flaggedForRemoval)
{
						action(component);
					}

					index++;
				}
			}
			finally
{
				this.loopingThruComponentsCount--;

				if (this.loopingThruComponentsCount == 0)
{
					this.removeFlaggedComponents();
				}
			}
		}

		public static getComponentById(id: string): FishSim.IComponent
{
			return Enumerable.From(this.components)
				.FirstOrDefault(null, c => c.id == id);
		}

		public static fps: number = 25;

		public static paused: boolean = false;

		private static startTime: number;

		public static run(): void
{
			$('.title').blink();

			// Subscribe to events
			var body = $('body');

			body.keydown((e) => this.keydown(e));

			body.keypress((e) => this.keypress(e));

			body.keyup((e) => this.keyup(e));

			// Add components to the scene here (or alternatively on the fly within your own components)
			this.addComponent(new FishSim.Components.Castle());
			this.addComponent(new FishSim.Components.FishFlag());

			// Add a bunch of seaweed
			var seaweedCount = 7;
			var screenWidth: number = $(window).width();
			var space = (screenWidth / seaweedCount + 1);
			for (var i = 0; i < seaweedCount; i++)
{
				var x = space * (i + 1) - (space / 2) + Math.randomRange(0, space);

				this.addComponent(new FishSim.Components.Seaweed(x));
			}

			this.startTime = (new Date()).getTime();
			this.lastTickTime = this.startTime;

			setInterval(() =>
{
				this.tick();
			},
				1000 / this.fps);

			var cachedStartupTime = null;

			var fishHub = $.connection.fishSimHub;

			//$.connection.hub.logging = true;

			fishHub.client.updateEnvironment = (name: string, health: Health) =>
			{
				console.log("Updated Health for " + name + " to " + health);

				var envComponent: IComponent = this.getComponentById(name);
				var fishy: IFish = <IFish>envComponent;
				fishy.makeBubble();

				if (health == Health.Failing)
				{
					$(document.body).css("background-color", "red");
				}
				else if (health == Health.Okay)
				{
					$(document.body).css("background-color", "green");
				}

				setTimeout(() => { $("body").css("background-color", "#272796"); }, 3000);
			};

			fishHub.client.marioMan = () =>
{
				this.addPlumber();
			};

			$.connection.hub.start().done(() =>
{
				fishHub.server.getConfig().done((config) =>
{
					console.log("SignalR Hub Starting -> Build Time: " + config.StartupTime);
					cachedStartupTime = config.StartupTime;

					Enumerable.From(config.Environments).ForEach((p: Environment) =>
{
						this.addComponent(new FishSim.Components.Fish(p.Name));
					});
				});
			});

			$.connection.hub.reconnected(() =>
{
				fishHub.server.getStartupTime().done((startupTime) =>
{
					console.log("reconnected startupTime: " + startupTime);
					console.log("cachedStartupTime: " + cachedStartupTime);

					if (cachedStartupTime == null)
						cachedStartupTime = startupTime;
					else if (startupTime != cachedStartupTime)
						window.location.reload(true);
				});
			});
		}

		private static lastTickTime: number;

		private static tick(): void
{
			var tickTime = (new Date()).getTime();

			var time: ITime = {
				elapsed: tickTime - this.lastTickTime,
				total: tickTime - this.startTime
			};

			try
{
				if (!this.paused)
{
					// Once an hour or so...
					if (Math.chance(time.elapsed, 1000 * 60 * 60))
{
						this.addPlumber();
					}

					// Loop through each component in the scene and call their tick handler
					this.forEachComponent((component: IComponent) =>
{
						component.tick(time);
					});
				}
			}
			finally
{
				this.lastTickTime = tickTime;
			}
		}

		private static keydown(event: JQueryKeyEventObject)
{
			this.forEachComponent((component: IComponent) =>
{
				if (component.keydown)
{
					component.keydown(event);
				}
			});
		}

		private static keypress(event: JQueryKeyEventObject)
{
			this.forEachComponent((component: IComponent) =>
{
				if (component.keypress)
{
					component.keypress(event);
				}
			});
		}

		private static keyup(event: JQueryKeyEventObject)
{
			if (event.keyCode == 80) // P
			{
				// Pause / Resume the sim
				this.paused = !this.paused;
			}
			else if (event.keyCode == 77) // M
			{
				// It's a me...
				this.addPlumber(Components.PlumberCharacter.Mario);
			}
			else if (event.keyCode == 76) // L
			{
				// It's a me...
				this.addPlumber(Components.PlumberCharacter.Luigi);
			}

			this.forEachComponent((component: IComponent) =>
{
				if (component.keyup)
{
					component.keyup(event);
				}
			});
		}

		private static addPlumber(character?: FishSim.Components.PlumberCharacter): void
{
			var y = Math.randomRange(100, $(window).height() - 150);

			if (character === undefined)
{
				character = Math.randomRange(0, 1);
			}

			this.components.push(new FishSim.Components.Plumber(character, y));
		}
	}

	window.onload = () =>
{
		App.run();
	};
}