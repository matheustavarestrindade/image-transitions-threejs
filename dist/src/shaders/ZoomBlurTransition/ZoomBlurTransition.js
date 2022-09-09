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
var ZoomBlurTransition = /** @class */ (function (_super) {
    __extends(ZoomBlurTransition, _super);
    function ZoomBlurTransition(textures_url) {
        return _super.call(this, textures_url) || this;
    }
    ZoomBlurTransition.prototype.onTextureLoaded = function () {
        this.finishLoading({ fragmentShader: loadFragmentShader(this.debugMode) });
    };
    return ZoomBlurTransition;
}(ImageTransitionShader));
export default ZoomBlurTransition;
//# sourceMappingURL=ZoomBlurTransition.js.map