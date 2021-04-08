import TWEEN from '@tweenjs/tween.js';

// Import internal dependencies.
import W1Stage from './inc/stage';
import W1Pixel from './inc/pixel';

// Parse or setup some options.
// This should ideally be externalised and be modified by a window object.
const options = {
	selectorClassName: 'w1-pixel-stage',
}

// Stuff we want to do on load.
window.addEventListener( 'load', function( event ) {
	const elements = document.getElementsByClassName( options.selectorClassName );
	const stages = [];
	Array.from( elements ).forEach( ( element ) => {
		element.classList.add( options.selectorClassName + '-loading' );
		stages.push( new W1Stage( element ) );

		/*
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
		*/
		element.classList.remove( options.selectorClassName + '-loading' );
		element.classList.add( options.selectorClassName + '-loaded' );
	} );

	// Start a custom game loop.
	let lastRender = 0;
	const step = ( time ) => {
		var deltaTime = time - lastRender;
		lastRender = time;

		// Update and render the stages.
		stages.forEach( ( stage ) => {
			stage.step( deltaTime );
		});

		window.requestAnimationFrame( step );
	};
	window.requestAnimationFrame( step );

});
