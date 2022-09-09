import { FromShaderToy } from "../FromShaderToy";

export const loadFragmentShader = (debugMode: boolean) =>
    FromShaderToy(
        `
    uniform ivec2 size; // = ivec2(10, 10)
    uniform float smoothness; // = 0.5

    float rand (vec2 co) {
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }        
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        vec2 uv = fragCoord/iResolution.xy;
        float r = rand(floor(vec2(size) * uv));
        float progress = sin(iTime * 0.5) * 0.5 + 0.5;
        float m = smoothstep(0.0, -smoothness, r - ( smoothstep(0.15, 0.9, progress) * (1.0 + smoothness)));
        fragColor =  mix(texture(firstTexture, uv), texture(secondTexture,uv), m);
    }

`,
        debugMode
    );
