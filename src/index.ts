import ZoomBlurTransition from "./shaders/ZoomBlurTransition/ZoomBlurTransition";
import ImageTransition from "./ImageTransition";
import BurningTransition from "./shaders/BurningTransition/BurningTransition";
import CurlNoisesTransition from "./shaders/CurlNoisesTransition/CurlNoisesTransition";
import HexTransition from "./shaders/HexTransition/HexTransition";
import PerlinTransition from "./shaders/PerlinTransition/PerlinTransition";
import PixelsTransition from "./shaders/PixelsTransition/PixelsTransition";

async function main() {
    const canvas1: HTMLCanvasElement = document.querySelector("#canvas1");
    const canvas2: HTMLCanvasElement = document.querySelector("#canvas2");
    const canvas3: HTMLCanvasElement = document.querySelector("#canvas3");
    const canvas4: HTMLCanvasElement = document.querySelector("#canvas4");
    const canvas5: HTMLCanvasElement = document.querySelector("#canvas5");
    const canvas6: HTMLCanvasElement = document.querySelector("#canvas6");

    const zoomBlurTransition = new ImageTransition(
        canvas1,
        new ZoomBlurTransition([
            { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ])
    );
    await zoomBlurTransition.start();

    const burningTransition = new ImageTransition(
        canvas2,
        new BurningTransition([
            { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ])
    );
    await burningTransition.start();

    const curlNoisesTransition = new ImageTransition(
        canvas3,
        new CurlNoisesTransition([
            { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ])
    );
    await curlNoisesTransition.start();

    const hexTransition = new ImageTransition(
        canvas4,
        new HexTransition([
            { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ])
    );
    await hexTransition.start();

    const perlinTransition = new ImageTransition(
        canvas5,
        new PerlinTransition(
            [
                { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            ],
            { scale: 4, smoothness: 0.1, seed: -12.412 }
        )
    );
    await perlinTransition.start();

    const pixelsTransition = new ImageTransition(
        canvas6,
        new PixelsTransition(
            [
                { texture_url: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                { texture_url: "https://images.pexels.com/photos/216216/pexels-photo-216216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                { texture_url: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            ],
            { size: { x: 10, y: 10 }, smoothness: 0.1 }
        )
    );
    await pixelsTransition.start();
}

main();
