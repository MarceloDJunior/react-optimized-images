'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var config = require('react-optimized-images/config');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".picture-module_container__sJKJi {\n  position: relative;\n}\n\n.picture-module_preview__bZVBH {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  -webkit-filter: blur(30px);\n  filter: blur(20px);\n  opacity: 1;\n}\n\n.picture-module_preview__bZVBH.picture-module_hidden__EbOnd {\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s;\n}\n";
var styles = {"container":"picture-module_container__sJKJi","preview":"picture-module_preview__bZVBH","hidden":"picture-module_hidden__EbOnd"};
styleInject(css_248z);

var getImageWithoutExtension = function (fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.'));
};
var getImageType = function (fileName) {
    if (fileName.toLowerCase().endsWith('jpg') ||
        fileName.toLowerCase().endsWith('jpeg')) {
        return 'image/jpeg';
    }
    return "image/".concat(fileName
        .substring(fileName.lastIndexOf('.') + 1)
        .toLowerCase());
};
var getImageExtension = function (fileName) {
    return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
};
var Picture = function (_a) {
    var src = _a.src, className = _a.className, props = __rest(_a, ["src", "className"]);
    var _b = React.useState(false), hasError = _b[0], setHasError = _b[1];
    var _c = React.useState(false), hasLoaded = _c[0], setHasLoaded = _c[1];
    var pictureRef = React.useRef(null);
    var handleError = function () {
        if (!hasError) {
            setHasError(true);
        }
    };
    var handleLoad = function () {
        if (!hasLoaded) {
            setTimeout(function () {
                setHasLoaded(true);
                if (pictureRef.current) {
                    pictureRef.current.style.maxHeight = '100%';
                }
            }, 100);
        }
    };
    var imageWithoutExtension = getImageWithoutExtension(src);
    var extension = getImageExtension(src);
    var renderSources = function () {
        var webpImages = config.breakpoints.map(function (_a) {
            var maxWidth = _a.maxWidth, resizeTo = _a.resizeTo;
            return (React__default["default"].createElement("source", { key: "".concat(maxWidth).concat(resizeTo, "webp"), srcSet: "".concat(imageWithoutExtension, "@").concat(resizeTo / 100, "x.webp"), media: "(max-width: ".concat(maxWidth, "px)"), type: "image/webp" }));
        });
        webpImages.push(React__default["default"].createElement("source", { key: "".concat(imageWithoutExtension, "webp"), srcSet: "".concat(imageWithoutExtension, ".webp"), type: "image/webp" }));
        var regularImages = config.breakpoints.map(function (_a) {
            var maxWidth = _a.maxWidth, resizeTo = _a.resizeTo;
            return (React__default["default"].createElement("source", { key: "".concat(maxWidth).concat(resizeTo).concat(extension), srcSet: "".concat(imageWithoutExtension, "@").concat(resizeTo / 100, "x.").concat(extension), media: "(max-width: ".concat(maxWidth, "px)"), type: getImageType(src) }));
        });
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            webpImages,
            regularImages));
    };
    React.useEffect(function () {
        var _a;
        if ((_a = pictureRef.current) === null || _a === void 0 ? void 0 : _a.complete) {
            handleLoad();
        }
    }, []);
    if (config.enabled) {
        return (React__default["default"].createElement("div", { className: styles.container },
            React__default["default"].createElement("img", __assign({ src: "".concat(imageWithoutExtension, "@preview.jpg"), className: "".concat(className, " ").concat(styles.preview, " ").concat(hasLoaded ? styles.hidden : '') }, props, { style: {
                    width: props.width || '100%',
                    height: props.height || 'auto',
                } })),
            React__default["default"].createElement("picture", { className: className, style: {
                    visibility: hasLoaded ? 'visible' : 'hidden',
                    height: hasLoaded ? undefined : '0',
                } },
                !hasError && renderSources(),
                React__default["default"].createElement("source", { srcSet: src, type: "image/".concat(extension) }),
                React__default["default"].createElement("img", __assign({ ref: pictureRef, src: src, className: className }, props, { onLoad: handleLoad, onError: handleError, style: __assign(__assign({}, props.style), { maxHeight: '0 !important' }) })))));
    }
    return React__default["default"].createElement("img", __assign({ src: src, className: className }, props));
};

exports.Picture = Picture;
//# sourceMappingURL=index.js.map
