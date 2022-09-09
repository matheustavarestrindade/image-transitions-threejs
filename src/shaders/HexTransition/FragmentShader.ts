import { createDebugGLSLCode } from "../debug/DigitsToConsoleDebug";
import { FromShaderToy } from "../FromShaderToy";

export const loadFragmentShader = (debugMode: boolean) =>
    FromShaderToy(
        `
    #define HEXTILE_SIZE 0.125
    #define RANDOMNESS   0.75
    #define PERIOD       8.0

    float hash(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898,58.233))) * 13758.5453);
    }

    float tanh_approx(float x) {
        float x2 = x*x;
        return clamp(x*(27.0 + x2)/(27.0+9.0*x2), -1.0, 1.0);
    }

    vec3 hsv2rgb(vec3 c) {
        const vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    float hex(vec2 p, float r) {
        p.xy = p.yx;
        const vec3 k = vec3(-sqrt(3.0/4.0),1.0/2.0,1.0/sqrt(3.0));
        p = abs(p);
        p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
        p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
        return length(p)*sign(p.y);
    }

    vec2 hextile(inout vec2 p) {
        const vec2 sz       = vec2(1.0, sqrt(3.0));
        const vec2 hsz      = 0.5*sz;

        vec2 p1 = mod(p, sz)-hsz;
        vec2 p2 = mod(p - hsz, sz)-hsz;
        vec2 p3 = dot(p1, p1) < dot(p2, p2) ? p1 : p2;
        vec2 n = ((p3 - p + hsz)/sz);
        p = p3;

        n -= vec2(0.5);
        return round(n*2.0)/2.0;
    }

    float pmin(float a, float b, float k) {
        float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
        return mix( b, a, h ) - k*h*(1.0-h);
    }

    float pmax(float a, float b, float k) {
        return -pmin(-a, -b, k);
    }

    vec3 hexTransition(vec2 p, float aa, vec3 from, vec3 to, float m) {
        m = clamp(m, 0.0, 1.0);
        const float hz = HEXTILE_SIZE;
        const float rz = RANDOMNESS;
        vec2 hp = p;
        hp /= hz;
        vec2 hn = hextile(hp)*hz*-vec2(-1.0, sqrt(3.0));
        float r = hash(hn+123.4);
        
        const float off = 3.0;
        float fi = smoothstep(0.0, 0.1, m);
        float fo = smoothstep(0.9, 1.0, m);

        float sz = 0.45*(0.5+0.5*tanh_approx(((rz*r+hn.x + hn.y-off+m*off*2.0))*2.0));
        float hd = (hex(hp, sz)-0.1*sz)*hz;
        
        float mm = smoothstep(-aa, aa, -hd);
        mm = mix(0.0, mm, fi);
        mm = mix(mm, 1.0, fo);
        
        vec3 col = mix(from, to, mm);
        vec2 ahn = abs(hn);
        return col;
    }


    vec3 postProcess(vec3 col, vec2 q) {
        col=pow(clamp(col,0.0,1.0),vec3(0.75)); 
        col=col*0.6+0.4*col*col*(3.0-2.0*col);  // contrast
        col=mix(col, vec3(dot(col, vec3(0.33))), -0.4);  // satuation
        col*=0.5+0.5*pow(19.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.7);  // vigneting
        return col;
    }


    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord/iResolution.xy;
        vec2 p = -1. + 2. * uv;
        p.x *= iResolution.x/iResolution.y;
        float aa = 2.0/iResolution.y;

        float transition = smoothstep(0.1, 0.9, sin(iTime * .5) * 0.5 + 0.5);
        
        vec4 from = texture(firstTexture, uv);
        vec4 to = texture(secondTexture, uv);

        vec3 color = hexTransition(p, aa, from.rgb, to.rgb, transition);
        
        color = postProcess(color,uv);
        ${createDebugGLSLCode(0, 0, "transition")}
        fragColor = vec4(color, 1.0);
    }


    `,
        debugMode
    );
