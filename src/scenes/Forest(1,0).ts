import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";
import { floor } from "../game/floor";
import { wall } from "../game/wall";
import { Player } from "../game/Player";
import { exit } from "../game/exit";
import { smallPlatform } from "../game/smallPlatform";
import { sign } from "../game/sign";


export class Forest10 extends TickerScene {


    constructor(position: string){

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
        const border = Sprite.from("forest(1,0)");
        const mask = new Graphics()
        mask.beginFill(0xeb4034, 0.3);
        mask.drawRect(0,0,border.width,border.height);
        mask.visible = true;
        super.addBorder(border, mask)

        //Add terrain        
        const floorTerrain = new floor(border.width);
        floorTerrain.y = border.height - 50;
        super.addTerrain(floorTerrain)

        const ceiling= new floor(border.width);
        super.addTerrain(ceiling)

        const floor1 = new floor(150);
        floor1.x = 1530
        floor1.y = 480;
        super.addTerrain(floor1)

        const platform1 = new smallPlatform()
        platform1.x = 650
        platform1.y = 650
        super.addTerrain(platform1)

        const platform2 = new smallPlatform()
        platform2.x = 1050
        platform2.y = 480
        super.addTerrain(platform2)

        const wallRight = new wall(border.height - 310);
        wallRight.x = border.width - 40
        super.addTerrain(wallRight) 

        const wallLeft = new wall(border.height - 310);
        super.addTerrain(wallLeft) 

        const wall1 = new wall(480);
        wall1.x = 1525
        wall1.y = 480
        super.addTerrain(wall1)

        const wall2 = new wall(480);
        wall2.x = 1675
        wall2.y = 480
        super.addTerrain(wall2)

        //add signs
        const jumpSign = new sign("Press X to jump")
        jumpSign.position.x = 550
        jumpSign.position.y = 1000
        super.addSign(jumpSign)

        //Add player and moves it to the right location
        const player = new Player()
        super.addPlayer(player)



        if (position == "left") {
            super.movePlayerTo(40, 870)
        }
        else if (position == "right") {   
                     
            super.movePlayerTo(border.width - 40, 870)
        }  

        //Add exits
        const exit1 = new exit(40, 260)
        exit1.visible = true;
        exit1.position.set(border.width, 690)
        super.addExit(exit1, "forest20", "left")

        const exit2 = new exit(40, 260)
        exit2.visible = true;
        exit2.position.set(-40, 690)
        super.addExit(exit2, "Start", "right")
        
    }
}