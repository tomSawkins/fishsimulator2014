/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="IComponent.ts" />
module FishSim.Components
{
    export class Notification implements IComponent
    {
        constructor(name: string, message: string)
        {
            // Generate a new ID for this bubble
            this.id = 'thoughts';
	        this.name = name;
	        this.message = message;

            // Create the bubble element and add to the scene
            var content = '<div id="{id}" class="thoughts"><div class="text">{message}</div></div>'.format(this);
            $('body').append(content);
			this.element = $('#' + this.id);

			setTimeout(() => { this.cleanUp(); }, 5000);
        }

        private element: JQuery;

        private position: IVector;

        public id: string;

		public name: string;

		public message: string;

        public tick(time: ITime): void
        {
	        
        }

        public cleanUp(): void
        {
			console.log('self sacrificing component');

            var body = document.getElementById('body');
            var element = document.getElementById(this.id);
            body.removeChild(element);

            this.element = null;
        }
    }
}