import React, { useState } from 'react';

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

var replaceExtension = function (fileName, targetExtension) {
    return fileName.substr(0, fileName.lastIndexOf('.')) + ".".concat(targetExtension);
};
var getImageExtension = function (fileName) {
    if (fileName.toLowerCase().endsWith('jpg') ||
        fileName.toLowerCase().endsWith('jpeg')) {
        return 'jpeg';
    }
    return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
};
var Picture = function (_a) {
    var src = _a.src, props = __rest(_a, ["src"]);
    var _b = useState(false), hasError = _b[0], setHasError = _b[1];
    var webpSrc = replaceExtension(src, 'webp');
    var handleError = function () {
        if (!hasError) {
            setHasError(true);
        }
    };
    return (React.createElement("picture", null,
        !hasError && React.createElement("source", { srcSet: webpSrc, type: "image/webp" }),
        React.createElement("source", { srcSet: src, type: "image/".concat(getImageExtension(src)) }),
        React.createElement("img", __assign({ src: src }, props, { onError: handleError }))));
};

export { Picture };
//# sourceMappingURL=index.js.map
