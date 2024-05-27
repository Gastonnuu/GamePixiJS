import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";
import { floor } from "../game/floor";
import { wall } from "../game/wall";
import { Player } from "../game/Player";
import { exit } from "../game/exit";
import { smallPlatform } from "../game/smallPlatform";
import { Enemy } from "../game/Enemy";


export class Forest40 extends TickerScene {


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
        const border = Sprite.from("forest(4,0)");
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

        const floor1 = new floor(420);
        floor1.x = 1500
        floor1.y = 630
        super.addTerrain(floor1)

        const platform1 = new smallPlatform()
        platform1.x = 450
        platform1.y = 2700
        super.addTerrain(platform1)

        const platform2 = new smallPlatform()
        platform2.x = 1200
        platform2.y = 2700
        super.addTerrain(platform2)

        const platform3 = new smallPlatform()
        platform3.x = 150
        platform3.y = 2440
        super.addTerrain(platform3)

        const platform4 = new smallPlatform()
        platform4.x = 825
        platform4.y = 2440
        super.addTerrain(platform4)

        const platform5 = new smallPlatform()
        platform5.x = 1500
        platform5.y = 2440
        super.addTerrain(platform5)

        const platform6 = new smallPlatform()
        platform6.x = 1200
        platform6.y = 2170
        super.addTerrain(platform6)

        const platform7 = new smallPlatform()
        platform7.x = 750
        platform7.y = 1950
        super.addTerrain(platform7)

        const platform8 = new smallPlatform()
        platform8.x = 150
        platform8.y = 1850
        super.addTerrain(platform8)

        const platform9 = new smallPlatform()
        platform9.x = 10
        platform9.y = 1600
        super.addTerrain(platform9)

        const platform10 = new smallPlatform()
        platform10.x = 550
        platform10.y = 1450
        super.addTerrain(platform10)

        const platform11 = new smallPlatform()
        platform11.x = 1270
        platform11.y = 1450
        super.addTerrain(platform11)

        const platform12 = new smallPlatform()
        platform12.x = 1650
        platform12.y = 1250
        super.addTerrain(platform12)

        const platform13 = new smallPlatform()
        platform13.x = 480
        platform13.y = 1000
        super.addTerrain(platform13)

        const platform14 = new smallPlatform()
        platform14.x = 1230
        platform14.y = 1000
        super.addTerrain(platform14)

        const platform15 = new smallPlatform()
        platform15.x = 180
        platform15.y = 810
        super.addTerrain(platform15)

        const platform16 = new smallPlatform()
        platform16.x = 920
        platform16.y = 810
        super.addTerrain(platform16)

        const platform17 = new smallPlatform()
        platform17.x = 520
        platform17.y = 600
        super.addTerrain(platform17)

        const wallRight = new wall(350);
        wallRight.x = border.width - 40
        super.addTerrain(wallRight) 

        const wallLeft = new wall(border.height - 310);
        super.addTerrain(wallLeft) 

        const wall1 = new wall(2330);
        wall1.x = border.width - 40
        wall1.y = 630
        super.addTerrain(wall1)


        //Add enemies
        const enemy1 = new Enemy(3);
        enemy1.x = 400;
        enemy1.y = 2000;
        super.addEnemy(enemy1)

        const enemy2 = new Enemy(3);
        enemy2.x = 800;
        enemy2.y = 2000;
        super.addEnemy(enemy2)

        const enemy3 = new Enemy(3);
        enemy3.x = 400;
        enemy3.y = 2500;
        super.addEnemy(enemy3)

        const enemy4 = new Enemy(3);
        enemy4.x = 800;
        enemy4.y = 2500;
        super.addEnemy(enemy4)

        const enemy5 = new Enemy(3);
        enemy5.x = 400;
        enemy5.y = 500;
        super.addEnemy(enemy5)

        const enemy6 = new Enemy(3);
        enemy6.x = 1200;
        enemy6.y = 500;
        super.addEnemy(enemy6)

        const enemy7 = new Enemy(1);
        enemy7.x = 400;
        enemy7.y = 500;
        super.addEnemy(enemy7)

        const enemy8 = new Enemy(1);
        enemy8.x = 1200;
        enemy8.y = 800;
        super.addEnemy(enemy8)

        const enemy9 = new Enemy(1);
        enemy9.x = 600;
        enemy9.y = 2700;
        super.addEnemy(enemy9)

        const enemy10 = new Enemy(1);
        enemy10.x = 1450;
        enemy10.y = 2100;
        super.addEnemy(enemy10)

        const enemy11 = new Enemy(1);
        enemy11.x = 150;
        enemy11.y = 1700;
        super.addEnemy(enemy11)


        //Add player and moves it to the right location
        const player = new Player()
        super.addPlayer(player)



        if (position == "left") {
            super.movePlayerTo(40, 2870)
        }
        else if (position == "right") {   
                     
            super.movePlayerTo(border.width - 40, 550)
        }  

        //Add exits
        const exit1 = new exit(40, 260)
        exit1.visible = true;
        exit1.position.set(border.width, 370)
        super.addExit(exit1, "forest50", "left")

        const exit2 = new exit(40, 260)
        exit2.visible = true;
        exit2.position.set(-40, 2690)
        super.addExit(exit2, "forest30", "right")
        
    }
}