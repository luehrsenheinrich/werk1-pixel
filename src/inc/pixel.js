import TWEEN from '@tweenjs/tween.js';

/**
 * An object with some default parameters.
 *
 * @type {Object}
 */
const pixelDefaults = {
	color: '#ffffff',
	ctx: false,
	tweenGroup: false,
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

export default class W1Pixel {

	/**
	 * Class constructor.
	 *
	 * @param {Number} x      The position of this pixel on the X axis.
	 * @param {Number} y      The position of this pixel on the Y axis.
	 * @param {Number} size   The size of this pixel in height and width.
	 * @param {Object} params An object of parameters.
	 */
	constructor(x, y, size, params) {
		// Define the parameters and its defaults.
		this.params = Object.assign({}, pixelDefaults, params);

		// Define the pixel size
		this.pixelSize = size;

		// Position the pixel
		this.x = x;
		this.y = y;
		this.alpha = Math.random();
		this.duration = 10000 * ( getRandomIntInclusive(50, 100) / 100 );
		this.delay = this.duration * ( getRandomIntInclusive(0, 100) / 50 );

		// Define the main tween
		this.mainTween = new TWEEN.Tween(this, this.params.tweenGroup);
		this.mainTween.to({alpha: 0}, this.duration);
		this.mainTween.repeat(Infinity);
		this.mainTween.yoyo(true);
		this.mainTween.delay(this.delay);
		this.mainTween.repeatDelay(0);
		this.mainTween.easing(TWEEN.Easing.Cubic.InOut)
		this.mainTween.onStart(() => {
			this.currentTween = this.mainTween;
		});
		this.mainTween.start();

		// Define the hover tween
		this.hoverTween = new TWEEN.Tween(this);
		this.hoverTween.to({alpha: 0}, this.duration * 2);
		this.hoverTween.easing(TWEEN.Easing.Cubic.InOut)
		this.hoverTween.onStart((tween) => {
			this.currentTween = this.hoverTween;
		});
		this.hoverTween.onComplete(() => {
			this.mainTween.start();
		});

		this.render();
	}

	render() {

		this.params.ctx.globalAlpha = this.alpha;
		this.params.ctx.fillStyle = this.params.color;
		this.params.ctx.fillRect(
			this.x,
			this.y,
			this.pixelSize,
			this.pixelSize
		);

	}
}
