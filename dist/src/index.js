var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import ZoomBlurTransition from "./shaders/ZoomBlurTransition/ZoomBlurTransition";
import ImageTransition from "./ImageTransition";
import BurningTransition from "./shaders/BurningTransition/BurningTransition";
import CurlNoisesTransition from "./shaders/CurlNoisesTransition/CurlNoisesTransition";
import HexTransition from "./shaders/HexTransition/HexTransition";
import PerlinTransition from "./shaders/PerlinTransition/PerlinTransition";
import PixelsTransition from "./shaders/PixelsTransition/PixelsTransition";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var canvas1, canvas2, canvas3, canvas4, canvas5, canvas6, zoomBlurTransition, burningTransition, curlNoisesTransition, hexTransition, perlinTransition, pixelsTransition;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas1 = document.querySelector("#canvas1");
                    canvas2 = document.querySelector("#canvas2");
                    canvas3 = document.querySelector("#canvas3");
                    canvas4 = document.querySelector("#canvas4");
                    canvas5 = document.querySelector("#canvas5");
                    canvas6 = document.querySelector("#canvas6");
                    zoomBlurTransition = new ImageTransition(canvas1, new ZoomBlurTransition([
                        { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    ]));
                    return [4 /*yield*/, zoomBlurTransition.start()];
                case 1:
                    _a.sent();
                    burningTransition = new ImageTransition(canvas2, new BurningTransition([
                        { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    ]));
                    return [4 /*yield*/, burningTransition.start()];
                case 2:
                    _a.sent();
                    curlNoisesTransition = new ImageTransition(canvas3, new CurlNoisesTransition([
                        { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    ]));
                    return [4 /*yield*/, curlNoisesTransition.start()];
                case 3:
                    _a.sent();
                    hexTransition = new ImageTransition(canvas4, new HexTransition([
                        { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    ]));
                    return [4 /*yield*/, hexTransition.start()];
                case 4:
                    _a.sent();
                    perlinTransition = new ImageTransition(canvas5, new PerlinTransition([
                        { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    ], { scale: 4, smoothness: 0.1, seed: -12.412 }));
                    return [4 /*yield*/, perlinTransition.start()];
                case 5:
                    _a.sent();
                    pixelsTransition = new ImageTransition(canvas6, new PixelsTransition([
                        { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                        { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    ], { size: { x: 10, y: 10 }, smoothness: 0.1 }));
                    return [4 /*yield*/, pixelsTransition.start()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
export { ImageTransition, ZoomBlurTransition, BurningTransition, CurlNoisesTransition, HexTransition, PerlinTransition, PixelsTransition };
//# sourceMappingURL=index.js.map