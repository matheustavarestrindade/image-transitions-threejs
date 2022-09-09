import { createDebugGLSLCode } from "../debug/DigitsToConsoleDebug";
import { FromShaderToy } from "../FromShaderToy";

export const loadFragmentShader = (debugMode: boolean) =>
    FromShaderToy(
        `
    #ifdef GL_ES
        precision mediump float;
    #endif

    uniform float scale; // = 4.0
    uniform float smoothness; // = 0.01

    uniform float seed; // = 12.9898

    float random(vec2 co) {
        highp float a = seed;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt= dot(co.xy ,vec2(a,b));
        highp float sn= mod(dt,3.14);
        return fract(sin(sn) * c);
    }

    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation

        // Cubic Hermine Curve.  Same as SmoothStep()
        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);

        // Mix 4 coorners porcentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        vec2 uv = fragCoord/iResolution.xy;
        vec4 from = texture(firstTexture, uv);
        vec4 to = texture(secondTexture, uv);
        float n = noise(uv * scale);
        
        float progress = smoothstep(0.1, 0.9, sin(iTime * 0.5) * 0.5 + 0.5);

        float p = mix(-smoothness, 1.0 + smoothness, progress);
        float lower = p - smoothness;
        float higher = p + smoothness;
        
        float q = smoothstep(lower, higher, n);
        vec3 color = mix(to, from, q).rgb;
        ${createDebugGLSLCode(0, 0, "progress")}
        fragColor.rgb = color.rgb;
    }

    `,
        debugMode
    );
