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
import { Vector2 } from "three";
import ImageTransitionShader from "../ImageTransitionShader";
import { loadFragmentShader } from "./FragmentShader";
var PixelsTransition = /** @class */ (function (_super) {
    __extends(PixelsTransition, _super);
    function PixelsTransition(textures_url, options) {
        var _this = _super.call(this, textures_url) || this;
        _this.options = { size: { x: 10, y: 10 }, smoothness: 0.1 };
        if (options)
            _this.options = options;
        return _this;
    }
    PixelsTransition.prototype.onTextureLoaded = function () {
        this.finishLoading({
            fragmentShader: loadFragmentShader(this.debugMode),
            extra_uniforms: { size: { value: new Vector2(this.options.size.x, this.options.size.y) }, smoothness: { value: this.options.smoothness } },
        });
    };
    return PixelsTransition;
}(ImageTransitionShader));
export default PixelsTransition;
//# sourceMappingURL=PixelsTransition.js.map