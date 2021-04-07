webpackHotUpdate("index",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pixi_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/app */ "./node_modules/@pixi/app/dist/esm/app.js");
/* harmony import */ var _pixi_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pixi/display */ "./node_modules/@pixi/display/dist/esm/display.js");
/* harmony import */ var _pixi_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pixi/core */ "./node_modules/@pixi/core/dist/esm/core.js");
/* harmony import */ var _pixi_ticker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pixi/ticker */ "./node_modules/@pixi/ticker/dist/esm/ticker.js");
/* harmony import */ var _inc_pixel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inc/pixel */ "./src/inc/pixel.js");
// Import external dependencies.



_pixi_core__WEBPACK_IMPORTED_MODULE_2__["Renderer"].registerPlugin('batch', _pixi_core__WEBPACK_IMPORTED_MODULE_2__["BatchRenderer"]);

_pixi_app__WEBPACK_IMPORTED_MODULE_0__["Application"].registerPlugin(_pixi_ticker__WEBPACK_IMPORTED_MODULE_3__["TickerPlugin"]); // Import internal dependencies.

 // Parse or setup some options.
// This should ideally be externalised and be modified by a window object.

var options = {
  selectorClassName: 'w1-pixel-stage',
  pixelSize: 100,
  // The default size of one pixel.
  overflow: false,
  // If we want to draw pixel over the edge of the stage.
  vAlign: 'center',
  // top, center, bottom
  hAlign: 'center' // left, center, right

}; // Stuff we want to do on load.

window.addEventListener('load', function (event) {
  var elements = document.getElementsByClassName(options.selectorClassName);
  Array.from(elements).forEach(function (element) {
    // Generate the PIXI app and add it to the DOMElement.
    var app = new _pixi_app__WEBPACK_IMPORTED_MODULE_0__["Application"]({
      resizeTo: element
    });
    element.appendChild(app.view); // Generate a pixi container to draw in.

    var container = new _pixi_display__WEBPACK_IMPORTED_MODULE_1__["Container"]();
    app.stage.addChild(container); // how many pixel can we stuff on the x axis?

    var xAmt = app.renderer.view.width / options.pixelSize;
    var yAmt = app.renderer.view.height / options.pixelSize; // Floor or ceil the amounts depending on if we want overflow or not.

    if (options.overflow) {
      xAmt = Math.ceil(xAmt);
      yAmt = Math.ceil(yAmt);
    } else {
      xAmt = Math.floor(xAmt);
      yAmt = Math.floor(yAmt);
    } // Draw the pixel and add it to the container.


    for (var y = 0; y < yAmt; y++) {
      for (var x = 0; x < xAmt; x++) {
        var graphics = new _inc_pixel__WEBPACK_IMPORTED_MODULE_4__["default"](x * options.pixelSize, y * options.pixelSize, options.pixelSize);
        container.addChild(graphics);
      }
    } // Calculate and modify the vertial alignment


    if (options.vAlign === 'center') {
      container.y = (app.renderer.view.height - container.height) / 2;
    } else if (options.vAlign === 'bottom') {
      container.y = app.renderer.view.height - container.height;
    } // Calculate and modify the horizontal alignment


    if (options.hAlign === 'center') {
      container.x = (app.renderer.view.width - container.width) / 2;
    } else if (options.hAlign === 'right') {
      container.x = app.renderer.view.width - container.width;
    }
  });
});

/***/ })

})
//# sourceMappingURL=8885564-index-wps-hmr.js.map