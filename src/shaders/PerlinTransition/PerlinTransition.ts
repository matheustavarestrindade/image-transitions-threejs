import ImageTransitionShader from "../ImageTransitionShader";
import ShaderTexture from "../ShaderTexture";
import { loadFragmentShader } from "./FragmentShader";

class PerlinTransition extends ImageTransitionShader {
    private options?: { scale: number; smoothness: number; seed: number };

    constructor(textures_url: ShaderTexture[], options?: { scale: number; smoothness: number; seed: number }) {
        super(textures_url);
        this.options = options;
    }
    protected onTextureLoaded(): void {
        this.finishLoading({
            fragmentShader: loadFragmentShader(this.debugMode),
            extra_uniforms: { scale: { value: this.options?.scale ?? 4 }, smoothness: { value: this.options?.smoothness ?? 0.1 }, seed: { value: this.options?.seed ?? -12.412 } },
        });
    }
}

export default PerlinTransition;
