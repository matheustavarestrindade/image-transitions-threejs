import { Mapping, Matrix3, PixelFormat, PixelFormatGPU, TextureDataType, TextureEncoding, TextureFilter, Vector2, Wrapping } from "three";

export default interface ShaderTexture {
    texture_url: string;
    /**
     * @default []
     */
    mipmaps?: any[]; // ImageData[] for 2D textures and CubeTexture[] for cube textures;
    /**
     * @default THREE.Texture.DEFAULT_MAPPING
     */
    mapping?: Mapping;
    /**
     * @default THREE.ClampToEdgeWrapping
     */
    wrapS?: Wrapping;
    /**
     * @default THREE.ClampToEdgeWrapping
     */
    wrapT?: Wrapping;
    /**
     * @default THREE.LinearFilter
     */
    magFilter?: TextureFilter;
    /**
     * @default THREE.LinearMipmapLinearFilter
     */
    minFilter?: TextureFilter;
    /**
     * @default 1
     */
    anisotropy?: number;
    /**
     * @default THREE.RGBAFormat
     */
    format?: PixelFormat;
    internalFormat?: PixelFormatGPU | null;
    /**
     * @default THREE.UnsignedByteType
     */
    type?: TextureDataType;
    /**
     * @default new THREE.Matrix3()
     */
    matrix?: Matrix3;
    /**
     * @default true
     */
    matrixAutoUpdate?: boolean;
    /**
     * @default new THREE.Vector2( 0, 0 )
     */
    offset?: Vector2;
    /**
     * @default new THREE.Vector2( 1, 1 )
     */
    repeat?: Vector2;
    /**
     * @default new THREE.Vector2( 0, 0 )
     */
    center?: Vector2;
    /**
     * @default 0
     */
    rotation?: number;
    /**
     * @default true
     */
    generateMipmaps?: boolean;
    /**
     * @default false
     */
    premultiplyAlpha?: boolean;
    /**
     * @default true
     */
    flipY?: boolean;
    /**
     * @default 4
     */
    unpackAlignment?: number;
    /**
     * @default THREE.LinearEncoding
     */
    encoding?: TextureEncoding;
    /**
     * @default false
     */
    isRenderTargetTexture?: boolean;
    /**
     * @default false
     */
    needsPMREMUpdate?: boolean;
    /**
     * An object that can be used to store custom data about the Material. It should not hold references to functions as these will not be cloned.
     * @default {}
     */
    userData?: any;
}
