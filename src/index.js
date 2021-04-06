// Import external dependencies.
import { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Renderer, BatchRenderer } from '@pixi/core';
Renderer.registerPlugin( 'batch', BatchRenderer );

import { TickerPlugin } from '@pixi/ticker';
Application.registerPlugin(TickerPlugin);

// Parse or setup some options.
// This should ideally be externalised and be modified by a window object.
const options = {
	selectorClassName: 'w1-pixel-stage',
}

// Stuff we want to do on load.
window.addEventListener( 'load', function( event ) {
	const elements = document.getElementsByClassName( options.selectorClassName );
	Array.from( elements ).forEach( ( element ) => {
		// Generate the PIXI app and add it to the DOMElement.
		const app = new Application();
		element.appendChild( app.view );

		// Generate a pixi container to draw in.
		const container = new Container();
		app.stage.addChild(container);

		const graphics = new Graphics();

		graphics.beginFill(0xFFFF00);
		graphics.drawRect(0, 0, 100, 100);
		container.addChild(graphics);


		console.log( element );
	} );
});
