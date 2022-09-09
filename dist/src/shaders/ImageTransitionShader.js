var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { TextureLoader, LoadingManager, Mesh, ShaderMaterial, PlaneGeometry, Vector3 } from "three";
var ImageTransitionShader = /** @class */ (function () {
    function ImageTransitionShader(textures_url) {
        var _this = this;
        this.loadingManager = new LoadingManager();
        this.loader = new TextureLoader(this.loadingManager);
        this.progress = 0;
        this.finishLoadingCallback = function (progress) { };
        this.debugMode = false;
        this.hasChangedFrame = false;
        this.textureIndex = 0;
        this.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
            _this.progress = itemsLoaded / itemsTotal;
            _this.finishLoadingCallback(_this.progress);
        };
        this.loadingManager.onLoad = function () {
            _this.progress = 1;
        };
        this.loadingManager.onError = function (url) {
            console.log("ImageTransitionShader: There was an error loading " + url);
        };
        this.textures_url = textures_url;
    }
    ImageTransitionShader.prototype.load = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.finishLoadingCallback = callback ? callback : function () { };
                        return [4 /*yield*/, this.loadTextures(this.textures_url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageTransitionShader.prototype.loadTextures = function (textures_url) {
        return __awaiter(this, void 0, void 0, function () {
            var loading, _loop_1, this_1, i, textures;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadedTextures = [];
                        loading = [];
                        _loop_1 = function (i) {
                            var texture = this_1.loader.loadAsync(textures_url[i].texture_url);
                            loading.push(texture);
                            Object.keys(textures_url[i]).forEach(function (prop) {
                                // @ts-ignore
                                if (prop !== "texture_url" && textures_url[i][prop] !== undefined) {
                                    // @ts-ignore
                                    texture[prop] = textures_url[i][prop];
                                }
                            });
                        };
                        this_1 = this;
                        for (i = 0; i < textures_url.length; i++) {
                            _loop_1(i);
                        }
                        return [4 /*yield*/, Promise.all(loading)];
                    case 1:
                        textures = _a.sent();
                        textures.forEach(function (texture, i) {
                            _this.loadedTextures.push(__assign({ texture: texture }, textures_url[i]));
                        });
                        this.onTextureLoaded();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageTransitionShader.prototype.getLoadingState = function () {
        return this.progress;
    };
    ImageTransitionShader.prototype.updateTime = function (time) {
        if (this.finalMesh) {
            this.finalMesh.material.uniforms.iTime.value = time;
        }
        var shaderProgress = Math.sin(time * 0.5) * 0.5 + 0.5;
        if (shaderProgress < 0.99 && shaderProgress > 0.2) {
            this.hasChangedFrame = false;
            return;
        }
        if (this.hasChangedFrame)
            return;
        var ltx = this.loadedTextures;
        if (ltx.length - 1 > this.textureIndex) {
            this.textureIndex++;
        }
        else {
            this.textureIndex = 0;
        }
        var texture = ltx[this.textureIndex].texture;
        if (shaderProgress > 0.99) {
            this.hasChangedFrame = true;
            this.finalMesh.material.uniforms.firstTexture.value = texture;
        }
        else if (shaderProgress < 0.2) {
            this.hasChangedFrame = true;
            this.finalMesh.material.uniforms.secondTexture.value = texture;
        }
    };
    ImageTransitionShader.prototype.updateResolution = function (width, height) {
        if (this.finalMesh) {
            this.finalMesh.material.uniforms.iResolution.value.set(width, height, 1);
        }
    };
    ImageTransitionShader.prototype.onTextureLoaded = function () { };
    ImageTransitionShader.prototype.finishLoading = function (_a) {
        var extra_uniforms = _a.extra_uniforms, fragmentShader = _a.fragmentShader;
        this.fragmentShader = fragmentShader;
        this.firstTexture = this.loadedTextures[0].texture;
        this.secondTexture = this.loadedTextures[1].texture;
        this.hasChangedFrame = false;
        this.textureIndex = 1;
        var plane = new PlaneGeometry(2, 2);
        var uniforms = __assign(__assign({}, extra_uniforms), { iTime: { value: 0 }, iResolution: { value: new Vector3() }, firstTexture: { value: this.firstTexture }, secondTexture: { value: this.secondTexture } });
        var material = new ShaderMaterial({
            fragmentShader: this.fragmentShader,
            uniforms: uniforms,
        });
        this.finalMesh = new Mesh(plane, material);
    };
    ImageTransitionShader.prototype.setVertexShader = function (vertexShader) {
        this.vertexShader = vertexShader;
    };
    ImageTransitionShader.prototype.getMesh = function () {
        if (this.finalMesh) {
            return this.finalMesh;
        }
        throw new Error("Mesh is not fully loaded");
    };
    return ImageTransitionShader;
}());
export default ImageTransitionShader;
//# sourceMappingURL=ImageTransitionShader.js.map