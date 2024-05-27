import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";
import { floor } from "../game/floor";
import { wall } from "../game/wall";
import { Player } from "../game/Player";
import { exit } from "../game/exit";
import { smallPlatform } from "../game/smallPlatform";
import { Enemy } from "../game/Enemy";


export class Forest30 extends TickerScene {


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
        const border = Sprite.from("forest(3,0)");
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

        const floor1 = new floor(1020);
        floor1.x = 710
        floor1.y = 810;
        super.addTerrain(floor1)

        const floor2 = new floor(1040);
        floor2.x = 710
        floor2.y = 375;
        super.addTerrain(floor2)

        const platform1 = new smallPlatform()
        platform1.x = 200
        platform1.y = 550
        super.addTerrain(platform1)

        const platform2 = new smallPlatform()
        platform2.x = 2000
        platform2.y = 550
        super.addTerrain(platform2)

        const wallRight = new wall(border.height - 310);
        wallRight.x = border.width - 40
        super.addTerrain(wallRight) 

        const wallLeft = new wall(border.height - 310);
        super.addTerrain(wallLeft) 

        const wall1 = new wall(140);
        wall1.x = 700
        wall1.y = 810
        super.addTerrain(wall1)

        const wall2 = new wall(140);
        wall2.x = 1730
        wall2.y = 810
        super.addTerrain(wall2)

        //Add enemies
        const enemy1 = new Enemy(3);
        enemy1.x = 400;
        enemy1.y = 200;
        super.addEnemy(enemy1)

        const enemy2 = new Enemy(3);
        enemy2.x = 1800;
        enemy2.y = 200;
        super.addEnemy(enemy2)

        const enemy6 = new Enemy(3);
        enemy6.x = 1250;
        enemy6.y = 250;
        super.addEnemy(enemy6)

        const enemy3 = new Enemy(1);
        enemy3.x = 800;
        enemy3.y = 750;
        super.addEnemy(enemy3)

        const enemy4 = new Enemy(1);
        enemy4.x = 1500;
        enemy4.y = 750;
        super.addEnemy(enemy4)

        const enemy5 = new Enemy(1);
        enemy5.x = 1250;
        enemy5.y = 250;
        super.addEnemy(enemy5)

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
        super.addExit(exit1, "forest40", "left")

        const exit2 = new exit(40, 260)
        exit2.visible = true;
        exit2.position.set(-40, 690)
        super.addExit(exit2, "forest20", "right")
        
    }
}