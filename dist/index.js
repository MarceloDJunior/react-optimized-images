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
var Picture = function (_a) {
    var src = _a.src, className = _a.className, props = __rest(_a, ["src", "className"]);
    var _b = React.useState(false), hasError = _b[0], setHasError = _b[1];
    var handleError = function () {
        if (!hasError) {
            setHasError(true);
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
    if (config.enabled) {
        return (React__default["default"].createElement("picture", { className: className },
            !hasError && renderSources(),
            React__default["default"].createElement("source", { srcSet: src, type: "image/".concat(extension) }),
            React__default["default"].createElement("img", __assign({ src: src, className: className }, props, { onError: handleError }))));
    }
    return React__default["default"].createElement("img", __assign({ src: src, className: className }, props));
};

exports.Picture = Picture;
//# sourceMappingURL=index.js.map
