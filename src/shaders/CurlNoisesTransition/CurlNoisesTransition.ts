import ImageTransitionShader from "../ImageTransitionShader";
import ShaderTexture from "../ShaderTexture";
import { loadFragmentShader } from "./FragmentShader";

class CurlNoisesTransition extends ImageTransitionShader {
    constructor(textures_url: ShaderTexture[]) {
        super(textures_url);
    }
    protected onTextureLoaded(): void {
        this.finishLoading({ fragmentShader: loadFragmentShader(this.debugMode) });
    }
}

export default CurlNoisesTransition;
