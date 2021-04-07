import { Graphics } from '@pixi/graphics';

export default class W1Pixel extends Graphics {
	constructor() {
		super();
		this.drawPixel();
	}

	drawPixel() {
		this.beginFill(0xFFFFFF);
		this.drawRect(0, 0, 100, 100);
	}
}
