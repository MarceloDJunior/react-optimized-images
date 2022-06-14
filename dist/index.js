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

var useIntersectionObserver = function (_a) {
    var _b = _a.active, active = _b === void 0 ? true : _b, target = _a.target, onIntersect = _a.onIntersect, _c = _a.threshold, threshold = _c === void 0 ? 0.1 : _c, _d = _a.rootMargin, rootMargin = _d === void 0 ? 0 : _d;
    React.useEffect(function () {
        if (active) {
            setTimeout(function () {
                var observer = new IntersectionObserver(onIntersect, {
                    rootMargin: "".concat(rootMargin, "px"),
                    threshold: threshold,
                });
                var currentTarget = target.current;
                if (currentTarget) {
                    observer.observe(currentTarget);
                }
            }, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);
};

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

var css_248z$1 = ".preview-module_preview__NdipQ {\n  position: absolute;\n  max-width: 100%;\n  -webkit-filter: blur(30px);\n  filter: blur(20px);\n  opacity: 1;\n  pointer-events: none;\n}\n\n.preview-module_preview__NdipQ.preview-module_hidden__sZLBN {\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s;\n}\n";
var styles$1 = {"preview":"preview-module_preview__NdipQ","hidden":"preview-module_hidden__sZLBN"};
styleInject(css_248z$1);

var PreviewComponent = function (_a) {
    var src = _a.src, className = _a.className, hidden = _a.hidden, onPreviewLoad = _a.onPreviewLoad, props = __rest(_a, ["src", "className", "hidden", "onPreviewLoad"]);
    var _b = React.useState(false), hasLoaded = _b[0], setHasLoaded = _b[1];
    var previewRef = React.useRef(null);
    var handlePreviewLoad = React.useCallback(function () {
        if (!hasLoaded) {
            setHasLoaded(true);
        }
    }, [hasLoaded]);
    React.useEffect(function () {
        var _a;
        if ((_a = previewRef.current) === null || _a === void 0 ? void 0 : _a.complete) {
            handlePreviewLoad();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(function () {
        if (hasLoaded) {
            onPreviewLoad();
        }
    }, [hasLoaded, onPreviewLoad]);
    return (React__default["default"].createElement("img", __assign({ ref: previewRef, src: src, className: "".concat(className, " ").concat(styles$1.preview, " ").concat(hidden ? styles$1.hidden : ''), loading: "eager", onLoad: handlePreviewLoad }, props)));
};
var Preview = React__default["default"].memo(PreviewComponent);

var css_248z = ".picture-module_container__Ua9Az {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n";
var styles = {"container":"picture-module_container__Ua9Az"};
styleInject(css_248z);

var defaultLazy = config.lazy || false;
var Picture = function (_a) {
    var src = _a.src, className = _a.className, _b = _a.lazy, lazy = _b === void 0 ? defaultLazy : _b, props = __rest(_a, ["src", "className", "lazy"]);
    var _c = React.useState(false), hasError = _c[0], setHasError = _c[1];
    var _d = React.useState(false), hasLoadedPreview = _d[0], setHasLoadedPreview = _d[1];
    var _e = React.useState(lazy ? false : true), hasLoadedPicture = _e[0], setHasLoadedPicture = _e[1];
    var _f = React.useState(lazy ? false : true), isIntersecting = _f[0], setIsIntersecting = _f[1];
    var containerRef = React.useRef(null);
    var pictureRef = React.useRef(null);
    var handleError = React.useCallback(function () {
        if (!hasError) {
            setHasError(true);
        }
    }, [hasError]);
    var handlePreviewLoad = React.useCallback(function () {
        setHasLoadedPreview(true);
    }, []);
    var handlePictureLoad = React.useCallback(function () {
        if (!hasLoadedPicture) {
            setHasLoadedPicture(true);
            if (pictureRef.current) {
                pictureRef.current.style.maxHeight = '100%';
            }
        }
    }, [hasLoadedPicture]);
    var imageWithoutExtension = React.useMemo(function () { return getImageWithoutExtension(src); }, [src]);
    var extension = React.useMemo(function () { return getImageExtension(src); }, [src]);
    var renderSources = React.useCallback(function () {
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
    }, [extension, imageWithoutExtension, src]);
    React.useEffect(function () {
        var _a;
        if ((_a = pictureRef.current) === null || _a === void 0 ? void 0 : _a.complete) {
            handlePictureLoad();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useIntersectionObserver({
        active: hasLoadedPreview && lazy,
        target: containerRef,
        onIntersect: function (_a, observerElement) {
            var entry = _a[0];
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                if (containerRef.current) {
                    observerElement.unobserve(containerRef.current);
                }
            }
        },
    });
    var containerStyle = React.useMemo(function () {
        var _a, _b;
        var isNumber = function (value) { return /^\d+$/.test(value); };
        var width = props.width || ((_a = props.style) === null || _a === void 0 ? void 0 : _a.width);
        var height = props.height || ((_b = props.style) === null || _b === void 0 ? void 0 : _b.height);
        if (isNumber(width)) {
            width = "".concat(width, "px");
        }
        if (isNumber(height)) {
            height = "".concat(height, "px");
        }
        return __assign(__assign({}, props.style), { width: width ? "min(".concat(width, ", 100%)") : '100%', minHeight: height });
    }, [props.height, props.style, props.width]);
    if (config.enabled) {
        return (React__default["default"].createElement("div", { ref: containerRef, className: styles.container, style: containerStyle },
            lazy ? (React__default["default"].createElement(Preview, __assign({ src: "".concat(imageWithoutExtension, "@preview.jpg"), className: className, onPreviewLoad: handlePreviewLoad, hidden: hasLoadedPicture }, props))) : null,
            isIntersecting && (React__default["default"].createElement("picture", { className: className, style: {
                    visibility: hasLoadedPicture ? 'visible' : 'hidden',
                    height: hasLoadedPicture ? undefined : '0',
                } },
                !hasError && renderSources(),
                React__default["default"].createElement("source", { srcSet: src, type: "image/".concat(extension) }),
                React__default["default"].createElement("img", __assign({ ref: pictureRef, src: src, className: className }, props, { onLoad: handlePictureLoad, onError: handleError, style: __assign(__assign({}, props.style), { maxHeight: lazy ? '0 !important' : undefined }) }))))));
    }
    return React__default["default"].createElement("img", __assign({ src: src, className: className }, props));
};

exports.Picture = Picture;
//# sourceMappingURL=index.js.map
