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
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
var ImageTransition = /** @class */ (function () {
    function ImageTransition(element, transition) {
        this.stoped = true;
        this.mounted = false;
        this.velocity = 1;
        this.canvas = element;
        this.transition = transition;
    }
    ImageTransition.prototype.mount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canvas)
                            throw new Error("Canvas not found");
                        this.mounted = true;
                        this.canvas.width = window.innerWidth;
                        this.canvas.height = window.innerHeight;
                        this.renderer = new WebGLRenderer({ canvas: this.canvas });
                        this.renderer.autoClearColor = false;
                        this.camera = new OrthographicCamera(-1, 1, 1, -1, -1, 1);
                        this.scene = new Scene();
                        return [4 /*yield*/, this.transition.load()];
                    case 1:
                        _a.sent();
                        this.scene.add(this.transition.getMesh());
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageTransition.prototype.setTransitionVelocity = function (velocity) {
        this.velocity = velocity;
    };
    ImageTransition.prototype.loop = function (time) {
        var _this = this;
        time *= 0.001 * this.velocity; // convert to seconds
        this.transition.updateResolution(this.canvas.width, this.canvas.height);
        this.transition.updateTime(time);
        this.renderer.render(this.scene, this.camera);
        if (this.stoped)
            return;
        requestAnimationFrame(function (time) { return _this.loop(time); });
    };
    ImageTransition.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.mounted) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mount()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.stoped)
                            return [2 /*return*/];
                        this.stoped = false;
                        requestAnimationFrame(function (time) { return _this.loop(time); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageTransition.prototype.stop = function () {
        this.stoped = true;
    };
    ImageTransition.prototype.dispose = function () {
        this.renderer.dispose();
        this.scene = null;
        this.camera = null;
    };
    return ImageTransition;
}());
export default ImageTransition;
//# sourceMappingURL=ImageTransition.js.map