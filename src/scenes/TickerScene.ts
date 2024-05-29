import { Container, Graphics, Sprite, TilingSprite } from 'pixi.js';
import { Player } from "../game/Player";
import { checkCollision } from "../utils/IHitbox";
import { Keyboard } from "../utils/Keyboard";
import { Enemy } from "../game/Enemy";
import { SceneManager } from '../utils/SceneManager';
import { SceneAbstract } from "../utils/SceneAbstract";
import { terrain } from '../game/terrain';
import { exit } from '../game/exit';
import { sign } from '../game/sign';


export class TickerScene extends SceneAbstract{

    private player = new Player;

    private universe: Container;
    private world: Container;
    private background: Container;

    private exits: Map<exit, string[]>;

    private backgrounds: TilingSprite[];

    private terrain:terrain[];

    private enemies:Enemy[];

    private signs: sign[];

    constructor()
    {
        super();       
        
        
        this.universe = new Container();
        this.world = new Container();
        this.background = new Container();
        
        this.exits = new Map();
        
        this.universe.addChild(this.world)
        this.universe.addChild(this.background)
        
        this.terrain = [];
        
        this.enemies = [];
        
        this.backgrounds = [];
        
        this.signs = [];
        
        
        
        this.universe.addChild(this.world);
        
        this.addChild(this.universe);
    }
    
    public update(deltaFrame: number, _deltaMs: number): void {        
        
        if (!this.player.isDead) {
            SceneManager.updatePlayerHealth(this.player.getHealth())
            //Update the player, menu and enemies    
            if (!SceneManager.sceneInMenu()) {
                
                this.player.update(deltaFrame);
                for (let enemy of this.enemies){
                    enemy.update(deltaFrame)
            }
    
            //In case the player attacked check the collision between the hitbox of the attack and the enemies
            if (Keyboard.state.get("KeyZ") && (this.player.isPlaying("jumpAttack") || this.player.isPlaying("jumpAttackUp") || this.player.isPlaying("jumpAttackDown") || this.player.isPlaying("attack") || this.player.isPlaying("attackUp")))
                {
                    for (let enemy of this.enemies){
                        let attackContack = checkCollision(this.player.getAttackHitbox(), enemy.getHitbox())
                        if (attackContack != null && enemy.canTakeDamage)
                            {
                                enemy.takeDamageCooldown = 0.5;
                                enemy.getHit(attackContack, this.player.getAttackHitbox());
                                if (this.player.isPlaying("jumpAttackDown"))
                                {
                                    this.player.attackDown();
                                }
                            }
                    }
                }
            
            //Check the collision between the player hitbox and the terrain, enemies hitboxes
            
            for (let object of this.terrain){
                let playerHitbox = this.player.getHitbox();
                let objectHitbox = object.getHitbox();
                let overlap = checkCollision(playerHitbox, objectHitbox)
                if (overlap != null)
                    {
                        this.player.separate(overlap, objectHitbox);
                    }
                for (let enemy of this.enemies){
                    if (enemy.getHealth() == 0) {
                        this.enemies.splice(this.enemies.indexOf(enemy), 1)                   
                        enemy.destroy()
                    }
                    let enemyHitbox = enemy.getHitbox();
                    let enemyAttackHitbox = enemy.getAttackHitbox();
                    let enemyOverlap = checkCollision(enemyHitbox, objectHitbox);
                    if (enemyOverlap != null)
                        {
                            enemy.separate(enemyOverlap, objectHitbox);
                            enemy.move(objectHitbox)
                        }
                    let enemyContact = checkCollision(playerHitbox, enemyHitbox);
                    if (enemyContact != null && this.player.canTakeDamage){
                        this.player.getHit(enemyContact, enemyHitbox);
                        this.player.loseHealth(enemy.getDamage());
                        this.player.canTakeDamage = false;
                        this.player.damageCooldown = 1
                    }
                    let enemyAttack = checkCollision(playerHitbox, enemyAttackHitbox)
                    if (enemyAttack != null && enemy.canAttack){
                        enemy.attack();                   
                    }
                }
            }
    
            //Check if the player is in the ground or in the air
            for (let object of this.terrain){
                let inGround = checkCollision(this.player.getFeetHitbox(), object.getHitbox())
                if (inGround)
                {
                    this.player.inAir = false;
                    break
                }
                else{
                    this.player.inAir = true;
                }
            }
    
            //The camera follow the player when the menu is closed
            this.world.x = -this.player.x * this.worldTransform.a + SceneManager.WIDTH / 2;
            this.world.y = -this.player.y * this.worldTransform.d + SceneManager.HEIGHT / 2;
    
            //Move the background
            for (let background of this.backgrounds){
                background.tilePosition.x = this.world.x * 0.25
            }
    
            //Check the exits
            for (let exit of this.exits.keys()){        
                let leaving = checkCollision(exit.getHitbox(), this.player.getHitbox())
                if (leaving != null) {
                    let stringList = this.exits.get(exit)
                    if (stringList != undefined) {
                        let scene = SceneManager.createScene(stringList[0], stringList[1])
                        if (scene != null) {
                            SceneManager.changeScene(scene)
                        }
                    }    
                }
            }
    
            if (this.player.getHealth() == 0 && !this.player.isDead) {
                this.player.isDead = true;
                this.player.canMove = false;
                this.player.canTakeDamage = false;
                SceneManager.playerDied()
            }
    
            for (let sign of this.signs) {
                let reading = checkCollision(this.player.getHitbox(), sign.getHitbox())
                if (reading != null) {
                    sign.makeVisible()
                }
                else {
                    sign.makeVanish()
                }
            }
        }    
    }}

    public addTerrain(platform: terrain): void{      
        this.terrain.push(platform)
        this.world.addChild(platform)
    }

    public addEnemy(enemy: Enemy): void{
        this.enemies.push(enemy)
        this.world.addChild(enemy)
    }

    public addBackground(background: TilingSprite): void{
        this.backgrounds.push(background)
        this.background.addChildAt(background, 0)
    }
 
    public movePlayerTo(x: number, y:number): void{
        if (x > 1000) {
            this.player.scale.x = -1
        }
        this.player.position.set(x, y)
    }

    public addBorder(border: Sprite, mask:Graphics): void {
        this.world.addChild(border)
        this.world.addChild(mask)
        this.universe.mask = mask
    }

    public addExit(exit:exit, scene:string, side: string): void {
        this.world.addChild(exit)
        this.exits.set(exit, [scene, side])        
    }

    public playerCanMove(): void {
        this.player.canMove = true;
    }

    public playerCantMove(): void {
        this.player.canMove = false;
    }

    public addPlayer(name:Player): void {
        this.player = name
        this.world.addChild(this.player)
    }

    public addSign(sign: sign): void {
        this.world.addChild(sign)
        this.signs.push(sign)
        const popUp = sign.getPopUp()
        popUp.anchor.set(0.5)
        popUp.position.x = 960
        popUp.position.y = 300
        this.universe.addChild(popUp)

    }
}
