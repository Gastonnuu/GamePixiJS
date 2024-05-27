import { Assets } from "pixi.js";
import { assets } from "./utils/assets";
import { SceneManager } from "./utils/SceneManager";
import { Start } from "./scenes/Start";


Assets.load(assets).then(() => {
	
	const myScene = new Start("spawn");

	SceneManager.initialize();
	SceneManager.changeScene(myScene)
})