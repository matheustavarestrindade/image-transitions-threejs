import { Material, Mesh, OrthographicCamera, Scene, Texture, WebGLRenderer } from "three";
import ImageTransitionShader from "./shaders/ImageTransitionShader";

class ImageTransition {
    private canvas: HTMLCanvasElement;
    private camera: OrthographicCamera;
    private renderer: WebGLRenderer;
    private scene: Scene;
    private transition: ImageTransitionShader;
    private stoped = true;
    private mounted = false;
    private velocity = 1;

    constructor(element: HTMLCanvasElement, transition: ImageTransitionShader) {
        this.canvas = element;
        this.transition = transition;
    }

    async mount() {
        if (!this.canvas) throw new Error("Canvas not found");
        this.mounted = true;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderer = new WebGLRenderer({ canvas: this.canvas });
        this.renderer.autoClearColor = false;
        this.camera = new OrthographicCamera(-1, 1, 1, -1, -1, 1);
        this.scene = new Scene();
        await this.transition.load();
        this.scene.add(this.transition.getMesh());
    }

    public setTransitionVelocity(velocity: number) {
        this.velocity = velocity;
    }

    protected loop(time: number) {
        time *= 0.001 * this.velocity; // convert to seconds
        this.transition.updateResolution(this.canvas.width, this.canvas.height);
        this.transition.updateTime(time);
        this.renderer.render(this.scene, this.camera);
        if (this.stoped) return;
        requestAnimationFrame((time) => this.loop(time));
    }

    async start() {
        if (!this.mounted) await this.mount();
        if (!this.stoped) return;
        this.stoped = false;
        requestAnimationFrame((time) => this.loop(time));
    }

    stop() {
        this.stoped = true;
    }

    dispose() {
        this.renderer.dispose();
        this.scene = null;
        this.camera = null;
    }
}

export default ImageTransition;
