// Import external dependencies.
import { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import { Renderer, BatchRenderer } from '@pixi/core';
Renderer.registerPlugin( 'batch', BatchRenderer );

import { TickerPlugin } from '@pixi/ticker';
Application.registerPlugin(TickerPlugin);

// Import internal dependencies.
import W1Pixel from './inc/pixel'

// Parse or setup some options.
// This should ideally be externalised and be modified by a window object.
const options = {
	selectorClassName: 'w1-pixel-stage',
	pixelSize: 100, // The default size of one pixel.
	overflow: false, // If we want to draw pixel over the edge of the stage.
	vAlign: 'center', // top, center, bottom
	hAlign: 'center', // left, center, right
}

// Stuff we want to do on load.
window.addEventListener( 'load', function( event ) {
	const elements = document.getElementsByClassName( options.selectorClassName );
	Array.from( elements ).forEach( ( element ) => {
		// Generate the PIXI app and add it to the DOMElement.
		const app = new Application( {
			resizeTo: element
		} );
		element.appendChild( app.view );

		// Generate a pixi container to draw in.
		const container = new Container();
		app.stage.addChild(container);

		// how many pixel can we stuff on the x axis?
		let xAmt =  app.renderer.view.width / options.pixelSize;
		let yAmt =  app.renderer.view.height / options.pixelSize;

		// Floor or ceil the amounts depending on if we want overflow or not.
		if( options.overflow ) {
			xAmt = Math.ceil( xAmt );
			yAmt = Math.ceil( yAmt );
		} else {
			xAmt = Math.floor( xAmt );
			yAmt = Math.floor( yAmt );
		}

		// Draw the pixel and add it to the container.
		for(let y = 0; y < yAmt; y++) {
			for(let x = 0; x<xAmt; x++) {
				const graphics = new W1Pixel(x * options.pixelSize, y * options.pixelSize, options.pixelSize);
				container.addChild(graphics);
			}
		}

		// Calculate and modify the vertial alignment
		if ( options.vAlign === 'center' ) {
			container.y = (app.renderer.view.height - container.height) / 2;
		} else if ( options.vAlign === 'bottom' ) {
			container.y = (app.renderer.view.height - container.height);
		}

		// Calculate and modify the horizontal alignment
		if ( options.hAlign === 'center' ) {
			container.x = (app.renderer.view.width - container.width) / 2;
		} else if ( options.hAlign === 'right' ) {
			container.x = (app.renderer.view.width - container.width);
		}
	} );
});
