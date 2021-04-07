import * as PIXI from './../pixi.js';
import TWEEN from '@tweenjs/tween.js';

/**
 * An object with some default parameters.
 *
 * @type {Object}
 */
const pixelDefaults = {
	color: 0xFFFFFF,
}

/**
 * Get a random integer bewtween min and max.
 *
 * @type {Function}
 */
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

export default class W1Pixel extends PIXI.Graphics {

	/**
	 * Class constructor.
	 *
	 * @param {Number} x      The position of this pixel on the X axis.
	 * @param {Number} y      The position of this pixel on the Y axis.
	 * @param {Number} size   The size of this pixel in height and width.
	 * @param {Object} params An object of parameters.
	 */
	constructor(x, y, size, params) {
		// Call the parent constructor.
		super();

		// Define the parameters and its defaults.
		this.params = Object.assign({}, pixelDefaults, params);

		// Define the pixel size
		this.pixelSize = size;
		this.interactive = true;

		// Draw the pixel
		this.drawPixel();

		// Position the pixel
		this.x = x;
		this.y = y;
		this.alpha = Math.random();
		this.duration = 5000 * ( getRandomIntInclusive(50, 100) / 100 );
		this.delay = this.duration * ( getRandomIntInclusive(0, 100) / 50 );

		// Define the main tween
		this.mainTween = new TWEEN.Tween(this);
		this.mainTween.to({alpha: 0}, this.duration);
		this.mainTween.repeat(Infinity);
		this.mainTween.yoyo(true);
		this.mainTween.delay(this.delay);
		this.mainTween.repeatDelay(0);
		this.mainTween.easing(TWEEN.Easing.Cubic.InOut)
		this.mainTween.onUpdate((object) => {
			this.updateTween(object);
		});
		this.mainTween.onStart(() => {
			this.currentTween = this.mainTween;
		});

		// Define the hover tween
		this.hoverTween = new TWEEN.Tween(this);
		this.hoverTween.to({alpha: 0}, this.duration * 2);
		this.hoverTween.easing(TWEEN.Easing.Cubic.InOut)
		this.hoverTween.onUpdate((object) => {
			this.updateTween(object);
		});
		this.hoverTween.onStart((tween) => {
			this.currentTween = this.hoverTween;
		});
		this.hoverTween.onComplete(() => {
			this.mainTween.start();
		});

		this.fade();

		// Hover events
		this.on( 'pointerover', function() {
			this.currentTween.stop();
			this.alpha = 1;
			this.hoverTween.start();
		});
	}

	drawPixel() {
		this.clear();
		this.beginFill(this.params.color);
		this.drawRect(0, 0, this.pixelSize, this.pixelSize);
	}

	updateTween( object ) {
		this.alpha = object.alpha;
	}

	fade() {
		this.mainTween.start();
		this.currentTween = this.mainTween;
	}
}
