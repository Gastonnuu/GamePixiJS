import { Application, Text, TextStyle, Ticker } from "pixi.js";
import { Keyboard } from "./Keyboard";
import { SceneAbstract } from "./SceneAbstract";
import { Group } from "tweedle.js";
import { Start } from "../scenes/Start";
import { Forest10 } from "../scenes/Forest(1,0)";
import { MainMenu } from "../scenes/MainMenu";
import { Health } from '../ui/Health';
import { Forest20 } from "../scenes/Forest(2,0)";
import { Forest30 } from "../scenes/Forest(3,0)";
import { Forest40 } from "../scenes/Forest(4,0)";
import { Forest50 } from "../scenes/Forest(5,0)";
import { Forest60 } from "../scenes/Forest(6,0)";



export namespace SceneManager
{
    export const WIDTH = 1920;
    export const HEIGHT = 1080;

    let currentScene:SceneAbstract;

    let app: Application<HTMLCanvasElement>;

    let menu: MainMenu;

    let health: Health;
    let playerHealth: number

    let style = new TextStyle({
        fontFamily: "upheavtt",
        fontSize: 50,
        fontVariant: "small-caps",
        lineJoin: "bevel",
        stroke: "#ffffff",
        strokeThickness: 3
    });
    
    export function initialize()
    {
        if (app)
            {
                console.error("Dont call initialize twice.")
                return
            }

        app = new Application<HTMLCanvasElement>({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x000000,
            width: WIDTH,
            height: HEIGHT
        });

        menu = new MainMenu();
        health = new Health();
        app.stage.addChild(menu);
        app.stage.addChild(health);

        const instruction = new Text("Use Arrows keys to move", style);
        instruction.anchor.set(0, 0.5);
        instruction.position.set(50, 950);
        app.stage.addChild(instruction)

        const instructio2 = new Text("Press P to pause", style);
        instructio2.anchor.set(0, 0.5);
        instructio2.position.set(50, 1000);
        app.stage.addChild(instructio2)
        

        Keyboard.initialize();

        window.addEventListener("resize", ()=> {

            const scaleX = window.innerWidth / app.screen.width;
            const scaleY = window.innerHeight / app.screen.height;
            const scale = Math.min(scaleX, scaleY)
            
            const gameWidht = Math.round(app.screen.width * scale);
            const gameHeight = Math.round(app.screen.height * scale);
            
            const marginHorizontal = Math.floor((window.innerWidth - gameWidht) / 2);
            const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);
            
            app.view.style.width = gameWidht + "px";
            app.view.style.height = gameHeight + "px";
            
            app.view.style.marginLeft = marginHorizontal + "px";
            app.view.style.marginRight = marginHorizontal + "px";
            
            app.view.style.marginTop = marginVertical + "px";
            app.view.style.marginBottom = marginVertical + "px"	
        })
        window.dispatchEvent(new Event("resize"));

        Ticker.shared.add(update)

        
    }

    export function changeScene(newScene:SceneAbstract)
    {
        if (currentScene)
            {
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChildAt(currentScene, 0)  
    }

    function update(framePassed:number)
    {    
        menu.update();
        health.update(playerHealth);
        
        Group.shared.update();
        
        currentScene?.update(framePassed, Ticker.shared.deltaMS);
        
        
        
    }

    export function createScene(nameScene: string | undefined, side: string): SceneAbstract | void
    {
        switch (nameScene) {
            case "Start":
                return new Start(side)
            case "forest10":
                return new Forest10(side)
            case "forest20":
                return new Forest20(side)
            case "forest30":
                return new Forest30(side)
            case "forest40":
                return new Forest40(side)
            case "forest50":
                return new Forest50(side)
            case "forest60":
                return new Forest60(side)
        }
    }

    export function sceneInMenu(): boolean | void{
        if (menu.inMenu) {
            return true
        }else {
            return undefined
        }
    }

    export function updatePlayerHealth(health: number): void {
        playerHealth = health;
    }
}