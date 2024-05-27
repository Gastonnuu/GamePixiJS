import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { floor } from "../game/floor";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";
import { wall } from "../game/wall";
import { exit } from "../game/exit";
import { Player } from "../game/Player";

export class Start extends TickerScene {

    constructor(position: string)
    {
        super()

        //Add background
        const background1 = new TilingSprite(Texture.from("forestBackground1"), SceneManager.WIDTH, SceneManager.HEIGHT)
        const background2 = new TilingSprite(Texture.from("forestBackground2"), SceneManager.WIDTH, SceneManager.HEIGHT)
        const background3 = new TilingSprite(Texture.from("forestBackground3"), SceneManager.WIDTH, SceneManager.HEIGHT)
        const background4 = new TilingSprite(Texture.from("forestBackground4"), SceneManager.WIDTH, SceneManager.HEIGHT)
        const background5 = new TilingSprite(Texture.from("forestBackground5"), SceneManager.WIDTH, SceneManager.HEIGHT)
        const background6 = new TilingSprite(Texture.from("forestBackground6"), SceneManager.WIDTH, SceneManager.HEIGHT)
        super.addBackground(background1)
        super.addBackground(background2)
        super.addBackground(background3)
        super.addBackground(background4)
        super.addBackground(background5)
        super.addBackground(background6)

        //Add border of the map
        const border = Sprite.from("forest(0,0)");
        const mask = new Graphics()
        mask.beginFill(0xeb4034, 0.3);
        mask.drawRect(0,0,border.width,border.height);
        mask.visible = true;
        super.addBorder(border, mask)

        //Add terrain        
        const floorTerrain = new floor(border.width);
        floorTerrain.y = border.height - 50;
        super.addTerrain(floorTerrain)

        const wallRight = new wall(border.height - 310);
        wallRight.x = border.width - 40
        super.addTerrain(wallRight) 

        const wallLeft = new wall(border.height);
        super.addTerrain(wallLeft) 

            
        //Add player and moves it to the right location
        const player = new Player()
        super.addPlayer(player)

        if (position == "spawn") {
            super.movePlayerTo(1000, 600)
        }
        else if (position == "left") {
            super.movePlayerTo(40, 600)
        }
        else if (position == "right") {
            super.movePlayerTo(1880, 600)
        }  

        //Add exits
        const exit1 = new exit(40, 260)
        exit1.visible = true;
        exit1.position.set(1920, 410)
        super.addExit(exit1, "forest10", "left")

    }
}