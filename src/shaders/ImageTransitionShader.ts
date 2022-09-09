import { Texture, TextureLoader, LoadingManager, Mesh, ShaderMaterial, PlaneGeometry, Vector3 } from "three";
import ShaderTexture from "./ShaderTexture";

class ImageTransitionShader {
    protected fragmentShader?: string;
    protected vertexShader?: string;
    protected loadedTextures?: ({ texture: Texture } & ShaderTexture)[];
    protected loadingManager = new LoadingManager();
    protected loader = new TextureLoader(this.loadingManager);
    protected progress: number = 0;
    protected finalMesh?: Mesh;
    protected textures_url: ShaderTexture[];
    protected finishLoadingCallback = (progress: number) => {};
    protected debugMode: boolean = false;
    protected hasChangedFrame: boolean = false;
    protected textureIndex: number = 0;
    protected firstTexture: Texture;
    protected secondTexture: Texture;

    constructor(textures_url: ShaderTexture[]) {
        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            this.progress = itemsLoaded / itemsTotal;
            this.finishLoadingCallback(this.progress);
        };
        this.loadingManager.onLoad = () => {
            this.progress = 1;
        };
        this.loadingManager.onError = (url) => {
            console.log("ImageTransitionShader: There was an error loading " + url);
        };
        this.textures_url = textures_url;
    }

    public async load(callback?: (progress: number) => void): Promise<void> {
        this.finishLoadingCallback = callback ? callback : () => {};
        await this.loadTextures(this.textures_url);
    }

    private async loadTextures(textures_url: ShaderTexture[]) {
        this.loadedTextures = [];
        const loading: Promise<Texture>[] = [];
        for (let i = 0; i < textures_url.length; i++) {
            let texture = this.loader.loadAsync(textures_url[i].texture_url);
            loading.push(texture);
            Object.keys(textures_url[i]).forEach((prop) => {
                // @ts-ignore
                if (prop !== "texture_url" && textures_url[i][prop] !== undefined) {
                    // @ts-ignore
                    texture[prop] = textures_url[i][prop];
                }
            });
        }
        const textures = await Promise.all(loading);
        textures.forEach((texture, i) => {
            this.loadedTextures.push({ texture: texture, ...textures_url[i] });
        });
        this.onTextureLoaded();
    }

    getLoadingState() {
        return this.progress;
    }

    updateTime(time: number) {
        if (this.finalMesh) {
            (this.finalMesh.material as ShaderMaterial).uniforms.iTime.value = time;
        }

        const shaderProgress = Math.sin(time * 0.5) * 0.5 + 0.5;
        if (shaderProgress < 0.99 && shaderProgress > 0.2) {
            this.hasChangedFrame = false;
            return;
        }
        if (this.hasChangedFrame) return;

        const ltx = this.loadedTextures;
        if (ltx.length - 1 > this.textureIndex) {
            this.textureIndex++;
        } else {
            this.textureIndex = 0;
        }
        const texture = ltx[this.textureIndex].texture;

        if (shaderProgress > 0.99) {
            this.hasChangedFrame = true;
            (this.finalMesh.material as ShaderMaterial).uniforms.firstTexture.value = texture;
        } else if (shaderProgress < 0.2) {
            this.hasChangedFrame = true;
            (this.finalMesh.material as ShaderMaterial).uniforms.secondTexture.value = texture;
        }
    }

    updateResolution(width: number, height: number) {
        if (this.finalMesh) {
            (this.finalMesh.material as ShaderMaterial).uniforms.iResolution.value.set(width, height, 1);
        }
    }

    protected onTextureLoaded() {}

    protected finishLoading({ extra_uniforms, fragmentShader }: { extra_uniforms?: any; fragmentShader?: string }) {
        this.fragmentShader = fragmentShader;
        this.firstTexture = this.loadedTextures[0].texture;
        this.secondTexture = this.loadedTextures[1].texture;
        this.hasChangedFrame = false;
        this.textureIndex = 1;

        const plane = new PlaneGeometry(2, 2);

        const uniforms = {
            ...extra_uniforms,
            iTime: { value: 0 },
            iResolution: { value: new Vector3() },
            firstTexture: { value: this.firstTexture },
            secondTexture: { value: this.secondTexture },
        };

        const material = new ShaderMaterial({
            fragmentShader: this.fragmentShader,
            uniforms,
        });

        this.finalMesh = new Mesh(plane, material);
    }

    setVertexShader(vertexShader: string) {
        this.vertexShader = vertexShader;
    }

    getMesh(): Mesh {
        if (this.finalMesh) {
            return this.finalMesh;
        }
        throw new Error("Mesh is not fully loaded");
    }
}

export default ImageTransitionShader;
