import { createDebugGLSLCode } from "../debug/DigitsToConsoleDebug";
import { FromShaderToy } from "../FromShaderToy";

export const loadFragmentShader = (debugMode: boolean) =>
    FromShaderToy(
        `

    float Hash( vec2 p)
    {
        vec3 p2 = vec3(p.xy,1.0);
        return fract(sin(dot(p2,vec3(37.1,61.7, 12.4)))*3758.5453123);
    }

    float noise(in vec2 p)
    {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f *= f * (3.0-2.0*f);

        return mix(mix(Hash(i + vec2(0.,0.)), Hash(i + vec2(1.,0.)),f.x),
            mix(Hash(i + vec2(0.,1.)), Hash(i + vec2(1.,1.)),f.x),
            f.y);
    }

    float fbm(vec2 p) {
        float v = 0.0;
        v += noise(p*1.)*.5;
        v += noise(p*2.)*.25;
        v += noise(p*4.)*.125;
        return v;
    }
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {   

        vec2 uv = fragCoord.xy / iResolution.xy;
        
        vec3 src = texture(firstTexture, uv).rgb;
        vec3 tgt = texture(secondTexture, uv).rgb;
        
        vec3 color = src;

        uv.x -= 1.5;
        
        float ctime = smoothstep(0.1, 0.9, sin(iTime * 0.5) * 0.5 + 0.5) * 2.75;
        
        // burn
        float d = uv.x + uv.y * 0.5 + 0.5 * fbm(uv * 15.1) + ctime * 1.3;
        if (d >0.35) color = clamp(color-(d-0.35)*10.,0.0,1.0);
        if (d >0.47) {
            if (d < 0.5 ) 
                color += (d-0.4) * 33.0 * 0.5 * (0.0 + noise(100. * uv + vec2(-ctime * 2.,0.))) *vec3(1.5,0.5,0.0);
            else 
                color += tgt; 
        }

        ${createDebugGLSLCode(0, 0, "ctime")}
        
        fragColor = vec4(color, 1.0);
    }
    `,
        debugMode
    );
