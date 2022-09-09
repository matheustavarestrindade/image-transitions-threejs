import { Vector2 } from "three";
import ImageTransitionShader from "../ImageTransitionShader";
import ShaderTexture from "../ShaderTexture";
import { loadFragmentShader } from "./FragmentShader";

class PixelsTransition extends ImageTransitionShader {
    private options?: { size: { x: number; y: number }; smoothness: number } = { size: { x: 10, y: 10 }, smoothness: 0.1 };

    constructor(textures_url: ShaderTexture[], options?: { size: { x: number; y: number }; smoothness: number }) {
        super(textures_url);
        if (options) this.options = options;
    }

    protected onTextureLoaded(): void {
        this.finishLoading({
            fragmentShader: loadFragmentShader(this.debugMode),
            extra_uniforms: { size: { value: new Vector2(this.options.size.x, this.options.size.y) }, smoothness: { value: this.options.smoothness } },
        });
    }
}

export default PixelsTransition;
