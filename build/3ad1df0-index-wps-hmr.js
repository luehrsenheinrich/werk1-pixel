webpackHotUpdate("index",{

/***/ "./node_modules/@pixi/graphics/dist/esm/graphics.js":
false,

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
// Import external dependencies.



_pixi_core__WEBPACK_IMPORTED_MODULE_2__["Renderer"].registerPlugin('batch', _pixi_core__WEBPACK_IMPORTED_MODULE_2__["BatchRenderer"]);

_pixi_app__WEBPACK_IMPORTED_MODULE_0__["Application"].registerPlugin(_pixi_ticker__WEBPACK_IMPORTED_MODULE_3__["TickerPlugin"]); // Parse or setup some options.
// This should ideally be externalised and be modified by a window object.

var options = {
  selectorClassName: 'w1-pixel-stage'
}; // Stuff we want to do on load.

window.addEventListener('load', function (event) {
  var elements = document.getElementsByClassName(options.selectorClassName);
  Array.from(elements).forEach(function (element) {
    // Generate the PIXI app and add it to the DOMElement.
    var app = new _pixi_app__WEBPACK_IMPORTED_MODULE_0__["Application"]();
    element.appendChild(app.view); // Generate a pixi container to draw in.

    var container = new _pixi_display__WEBPACK_IMPORTED_MODULE_1__["Container"]();
    app.stage.addChild(container);
    var graphics = new Graphics();
    graphics.beginFill(0xFFFF00);
    graphics.drawRect(0, 0, 100, 100);
    container.addChild(graphics);
    console.log(element);
  });
});

/***/ })

})
//# sourceMappingURL=3ad1df0-index-wps-hmr.js.map