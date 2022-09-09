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
var HexTransition = /** @class */ (function (_super) {
    __extends(HexTransition, _super);
    function HexTransition(textures_url) {
        return _super.call(this, textures_url) || this;
    }
    HexTransition.prototype.onTextureLoaded = function () {
        this.finishLoading({ fragmentShader: loadFragmentShader(this.debugMode) });
    };
    return HexTransition;
}(ImageTransitionShader));
export default HexTransition;
//# sourceMappingURL=HexTransition.js.map