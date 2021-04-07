import { Graphics } from '@pixi/graphics';

/**
 * An object with some default parameters.
 *
 * @type {Object}
 */
const pixelDefaults = {
	color: 0xFFFFFF,
}

export default class W1Pixel extends Graphics {

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

		this.drawPixel( size );
		this.x = x;
		this.y = y;
	}

	drawPixel( size ) {
		this.beginFill(this.params.color, Math.random());
		this.drawRect(0, 0, size, size);
	}
}
