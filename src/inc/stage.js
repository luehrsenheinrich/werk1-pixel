import W1Pixel from './pixel';
import { ElementObserver } from 'viewprt'
import TWEEN from '@tweenjs/tween.js';

/**
 * The stage defines a single canvas in which pixels are rendered.
 */
const stageDefaults = {
	color: 0xFFFFFF,
	pixelSize: 30, // The default size of one pixel.
	overflow: false, // If we want to draw pixel over the edge of the stage.
	vAlign: 'center', // top, center, bottom
	hAlign: 'center', // left, center, right
	pixelProbability: 50, // Only x% of possible pixels will be drawn
	rowProbabilities: {
		'-3': 50,
		'-2': 25,
		'-1': 10,
		'0': 10,
		'1': 25,
		'2': 50
	},
	colProbabilities: {
		'-3': 50,
		'-2': 25,
		'-1': 10,
		'0': 10,
		'1': 25,
		'2': 50
	}
};

export default class W1Stage {
	constructor( parentElement, params ) {
		/**
		 * Stores a set of parameters that customize the behavior of this stage.
		 *
		 * @type {Object}
		 */
		this.params = Object.assign({}, stageDefaults, params);

		/**
		 * Stores the pixels we currently display on this stage.
		 *
		 * @type {Array}
		 */
		this.pixels = [];

		/**
		 * The parent HTML Element
		 *
		 * @type {HTMLElement}
		 */
		this.parentElement = parentElement;

		/**
		 * If this Stage is currently in view.
		 *
		 * @type {Boolean}
		 */
		this.inView = false;

		/**
		 * A group containing the tweens of the pixels in this stage.
		 *
		 * @type {TWEEN}
		 */
		this.tweenGroup = new TWEEN.Group();

		/**
		 * The element observer that checks if the stage is in view.
		 *
		 * @type {ElementObserver}
		 */
		this.elementObserver = ElementObserver( this.parentElement, {
			onEnter: () => {
				this.inView = true;
			},
			onExit: () => {
				this.inView = false;
			}
		});

		this.createCanvas(parentElement);
		this.resizeCanvas();
		this.createPixels();
	}

	/**
	 * Create the canvas element.
	 *
	 * @param  {HTMLEntity} parentElement The parent element of the canvas.
	 *
	 * @return {void}
	 */
	createCanvas() {
		this.canvas = document.createElement('canvas');
		this.parentElement.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
	}

	/**
	 * Resize the canvas so it is rendered in a proper aspect ratio.
	 *
	 * @return {void}
	 */
	resizeCanvas() {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;

		this.calculateGrid();
	}

	/**
	 * Calculate the amount of pixels on the x and y axis.
	 *
	 * @return {void}
	 */
	calculateGrid() {
		// how many pixel can we stuff on the axis?
		this.xAmt = this.canvas.offsetWidth / this.params.pixelSize;
		this.yAmt = this.canvas.offsetHeight / this.params.pixelSize;

		// Floor or ceil the amounts depending on if we want overflow or not.
		if( this.params.overflow ) {
			this.xAmt = Math.ceil( this.xAmt );
			this.yAmt = Math.ceil( this.yAmt );
		} else {
			this.xAmt = Math.floor( this.xAmt );
			this.yAmt = Math.floor( this.yAmt );
		}

		if( this.params.vAlign === 'center' ) {
			this.offsetY = (this.canvas.offsetHeight - (this.yAmt * this.params.pixelSize)) / 2;
		} else if( this.params.vAlign === 'bottom' ) {
			this.offsetY = (this.canvas.offsetHeight - (this.yAmt * this.params.pixelSize));
		}

		if ( this.params.hAlign === 'center' ) {
			this.offsetX = (this.canvas.offsetWidth - (this.xAmt * this.params.pixelSize)) / 2;
		} else if ( this.params.hAlign === 'right' ) {
			this.offsetX = (this.canvas.offsetWidth - (this.xAmt * this.params.pixelSize));
		}
	}

	createPixels() {
		this.pixels = [];
		// Draw the pixel and add it to the container.
		for(let y = 0; y < this.yAmt; y++) {
			for(let x = 0; x < this.xAmt; x++) {
				const pixelParams = {
					ctx: this.ctx,
					tweenGroup: this.tweenGroup,
				};

				if ( y in this.params.rowProbabilities ) {
					if( Math.random() > this.params.rowProbabilities[y] / 100 ) {
						continue;
					}
				} else if ( ( y - this.yAmt ) in this.params.rowProbabilities ) {
					if( Math.random() > this.params.rowProbabilities[y - this.yAmt] / 100 ) {
						continue;
					}
				} if ( x in this.params.colProbabilities ) {
					if( Math.random() > this.params.colProbabilities[x] / 100 ) {
						continue;
					}
				} else if ( ( x - this.xAmt ) in this.params.colProbabilities ) {
					if( Math.random() > this.params.colProbabilities[x - this.xAmt] / 100 ) {
						continue;
					}
				} else if( Math.random() > this.params.pixelProbability / 100 ) {
					continue;
				}

				this.pixels.push(
					new W1Pixel(
						x * this.params.pixelSize + this.offsetX,
						y * this.params.pixelSize + this.offsetY,
						this.params.pixelSize,
						pixelParams
					)
				);
			}
		}
	}

	step( deltaTime ) {
		this.tweenGroup.update();

		if ( this.isVisible() ) {
			this.render();
		}
	}

	/**
	 * Check if the stage is in view.
	 *
	 * @return {Boolean} True if the stage is in view.
	 */
	isVisible() {
		return this.inView;
	}

	/**
	 * Render the contents of this stage.
	 *
	 * @return {void}
	 */
	render() {

		this.ctx.clearRect(
		  0,
			0,
			this.canvas.offsetWidth,
			this.canvas.offsetHeight
		);

		this.pixels.forEach( ( pixel ) => {
			pixel.render();
		});
	}
}
