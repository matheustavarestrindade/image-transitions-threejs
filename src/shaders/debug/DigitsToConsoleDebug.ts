export const DebugGLSLCode = `

// PRINT TO SCREEN DEBUG

#ifndef DEBUG_ENABLED
#define DEBUG_ENABLED
#endif

float DigitBin(const in int x) {
    return x==0?480599.0:x==1?139810.0:x==2?476951.0:x==3?476999.0:x==4?350020.0:x==5?464711.0:x==6?464727.0:x==7?476228.0:x==8?481111.0:x==9?481095.0:0.0;
}

vec2 fontSize = vec2(4,5) * vec2(5,3);
vec2 grid(int x, int y) { return fontSize.xx * vec2(1,ceil(fontSize.y/fontSize.x)) * vec2(x,y) + vec2(2); }

float PrintValue(vec2 fragCoord, vec2 pixelCoord, vec2 fontSize, float value,
		float digits, float decimals) {
	vec2 charCoord = (fragCoord - pixelCoord) / fontSize;
	if(charCoord.y < 0.0 || charCoord.y >= 1.0) return 0.0;
	float bits = 0.0;
	float digitIndex1 = digits - floor(charCoord.x)+ 1.0;
	if(- digitIndex1 <= decimals) {
		float pow1 = pow(10.0, digitIndex1);
		float absValue = abs(value);
		float pivot = max(absValue, 1.5) * 10.0;
		if(pivot < pow1) {
			if(value < 0.0 && pivot >= pow1 * 0.1) bits = 1792.0;
		} else if(digitIndex1 == 0.0) {
			if(decimals > 0.0) bits = 2.0;
		} else {
			value = digitIndex1 < 0.0 ? fract(absValue) : absValue * 10.0;
			bits = DigitBin(int (mod(value / pow1, 10.0)));
		}
	}
	return floor(mod(bits / pow(2.0, floor(fract(charCoord.x) * 4.0) + floor(charCoord.y * 5.0) * 4.0), 2.0));
}

// PRINT TO SCREEN DEBUG
`;

export const createDebugGLSLCode = (GridX: number, GridY: number, variableName: string, extras?: { color: { r: number; g: number; b: number } }) =>
    `
	#ifdef DEBUG_ENABLED
	color = mix(color, vec3(${extras?.color.r ? extras.color.r.toFixed(1) : ".3"}, ${extras?.color.g ? extras.color.g.toFixed(1) : "1.0"}, ${
        extras?.color.b ? extras.color.b.toFixed(1) : ".3"
    }), PrintValue(fragCoord, grid(${GridX.toFixed(0)},${GridY.toFixed(0)}), fontSize, ${variableName}, 2.0, 5.0));
	#endif
	`;
