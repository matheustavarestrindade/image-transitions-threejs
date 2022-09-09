var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ImageTransitionShader from "../ImageTransitionShader";
import { loadFragmentShader } from "./FragmentShader";
var PerlinTransition = /** @class */ (function (_super) {
    __extends(PerlinTransition, _super);
    function PerlinTransition(textures_url, options) {
        var _this = _super.call(this, textures_url) || this;
        _this.options = options;
        return _this;
    }
    PerlinTransition.prototype.onTextureLoaded = function () {
        var _a, _b, _c, _d, _e, _f;
        this.finishLoading({
            fragmentShader: loadFragmentShader(this.debugMode),
            extra_uniforms: { scale: { value: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.scale) !== null && _b !== void 0 ? _b : 4 }, smoothness: { value: (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.smoothness) !== null && _d !== void 0 ? _d : 0.1 }, seed: { value: (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.seed) !== null && _f !== void 0 ? _f : -12.412 } },
        });
    };
    return PerlinTransition;
}(ImageTransitionShader));
export default PerlinTransition;
//# sourceMappingURL=PerlinTransition.js.map