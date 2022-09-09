import { DebugGLSLCode } from "./debug/DigitsToConsoleDebug";

export const FromShaderToy = (content: string, debugMode: boolean) => `
    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D firstTexture;
    uniform sampler2D secondTexture;

    ${debugMode ? DebugGLSLCode : ""}

    ${content}

    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`;
