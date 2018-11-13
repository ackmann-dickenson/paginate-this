"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(asyncAction) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var timer = null;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);

    return function (dispatch) {
      return new Promise(function (resolve) {
        timer = setTimeout(function () {
          resolve(dispatch(asyncAction.apply(undefined, args)));
        }, ms);
      });
    };
  };
}