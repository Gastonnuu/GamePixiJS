import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";
import { floor } from "../game/floor";
import { wall } from "../game/wall";
import { Player } from "../game/Player";
import { exit } from "../game/exit";
import { sign } from "../game/sign";


export class Forest60 extends TickerScene {


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
        const border = Sprite.from("forest(6,0)");
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

        const floor1 = new floor(800);
        floor1.x = 690
        floor1.y = 790;
        super.addTerrain(floor1)

        const floor2 = new floor(1000);
        floor2.x = 1470
        floor2.y = 660;
        super.addTerrain(floor2)

        const wallRight = new wall(border.height);
        wallRight.x = border.width - 40
        super.addTerrain(wallRight) 

        const wallLeft = new wall(border.height - 310);
        super.addTerrain(wallLeft) 

        const wall1 = new wall(180);
        wall1.x = 685
        wall1.y = 790
        super.addTerrain(wall1)

        const wall3 = new wall(200);
        wall3.x = 1460
        super.addTerrain(wall3)

        //add signs
        const doorSign = new sign("The door is closed")
        doorSign.position.x = 2250
        super.addSign(doorSign)



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
        exit1.position.set(-40, 690)
        super.addExit(exit1, "forest50", "right")
        
    }
}