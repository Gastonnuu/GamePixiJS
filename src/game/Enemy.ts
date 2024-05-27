import { Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";
import { StateAnimation } from "./StateAnimation";

export class Enemy extends StateAnimation implements IHitbox
{
    private enemyType: number;
    private hitbox: Graphics;
    private attackHitbox: Graphics
    private HEALTH: number;
    private DAMAGE: number
    private SPEED: number;
    private KNOCKBACK: number;

    public canTakeDamage = true;
    public takeDamageCooldown = 0.5;

    private direction = 1;
    private GRAVITY = 3000;

    public canAttack = true;
    public canMove = true;

    constructor(enemyType: number) {
        super()
        this.enemyType = enemyType;
        this.hitbox = new Graphics();
        this.attackHitbox = new Graphics();
        this.HEALTH = 0;
        this.DAMAGE = 0
        this.SPEED = 0
        this.KNOCKBACK = 0

        if (this.enemyType == 1){
            this.hitbox.beginFill(0xff0000, 0.5);
            this.hitbox.drawRect(0,0,100,80)
            this.hitbox.position.set(-50,-40);
            this.hitbox.visible = true;
            
            this.HEALTH = 2
            this.DAMAGE = 1;
            this.SPEED = 100;
            this.KNOCKBACK = 100000;
        }
        else if(this.enemyType == 2){
            this.hitbox.beginFill(0xff0000, 0.5);
            this.hitbox.drawRect(90,0,180,260)
            this.hitbox.position.set(-90,0);
            this.hitbox.visible = true;

            this.attackHitbox.beginFill(0xff0000, 0.5);
            this.attackHitbox.drawRect(90,0, 200,260);
            this.hitbox.position.set(-180, 0);
            this.attackHitbox.visible = true;

            this.HEALTH = 5
            this.DAMAGE = 3;
            this.SPEED = 50;
            this.KNOCKBACK = 9000;

        }
        else if(this.enemyType == 3){
            this.hitbox.beginFill(0xff0000, 0.5);
            this.hitbox.drawRect(50,0,100,100)
            this.hitbox.position.set(-90,0);
            this.hitbox.visible = true;

            this.HEALTH = 2
            this.DAMAGE = 1;
            this.SPEED = 125;
            this.KNOCKBACK = 100000;
            this.GRAVITY = 0;
            this.speed.y = -25;
        }


        this.addChild(this.hitbox)
        this.addChild(this.attackHitbox)
    }

    public override update(deltaMS: number)
    {    
        
        if (this.canTakeDamage == false) {
            this.takeDamageCooldown -= deltaMS / 60
        }

        if (this.takeDamageCooldown < 0) {
            this.canTakeDamage = true
        }

        super.update(deltaMS/60);
        
        this.acceleration.y = this.GRAVITY;
        
        this.speed.x = this.SPEED * this.direction

        if (this.speed.x > 0){
            this.scale.x = 1
        }
        else if(this.speed.x < 0){
            this.scale.x = -1
        }
    }
    
    public getHitbox(): Rectangle 
    {
        return this.hitbox.getBounds();
    }

    public getAttackHitbox(): Rectangle
    {
        return this.attackHitbox.getBounds();
    }

    public getDamage(): number
    {
        return this.DAMAGE;
    }

    
    public separate(overlap: Rectangle, platform: Rectangle) {
        

        if (overlap.width < overlap.height){
            if (this.hitbox.getBounds().right  > platform.right)
                {
                    this.x += overlap.width;

                    this.direction = -this.direction

                }
            else if(this.hitbox.getBounds().left < platform.left)
                {
                    this.x += -overlap.width;
                    
                    this.direction = -this.direction
                }
            }
            else{
                
                if (this.hitbox.getBounds().top < platform.top)
                    {
                        this.y -= overlap.height;
                        this.acceleration.y = 0
                        this.speed.y = 0

                        if (this.enemyType == 3){
                            this.speed.y = -25
                        }
                    }
                else if(this.hitbox.getBounds().top > platform.top)
                    {
                        
                        this.y += overlap.height;
                        this.acceleration.y = 0
                        this.speed.y = 0

                        if (this.enemyType == 3){
                            this.speed.y = 25
                        }
                    }
                }
    }

    public getHit(overlap: Rectangle, enemy: Rectangle) {
        this.HEALTH -= 1
        this.canTakeDamage = false
        if (overlap.width < overlap.height){
            if (this.hitbox.getBounds().right > enemy.right)
            {
                this.acceleration.x = this.KNOCKBACK;
                setTimeout(() => {this.acceleration.x = 0}, 100)
            }
            else if(this.hitbox.getBounds().left < enemy.left)
            {
                this.acceleration.x = -this.KNOCKBACK;
                setTimeout(() => {this.acceleration.x = 0}, 100)
            }
        }
        else{

            if (this.hitbox.getBounds().top < enemy.top)
            {
                this.speed.y = -300;
                if (this.enemyType == 3){
                    setTimeout(() => {this.speed.y = -25}, 100)
                }
                
            }
            else if(this.hitbox.getBounds().top > enemy.top)
            {

                this.speed.y = 300;
                if (this.enemyType == 3){
                    setTimeout(() => {this.speed.y = 25}, 100)
                }
            }
        }
    }

    public move(platform: Rectangle) {
        if (this.enemyType != 3)
        {
            if (this.hitbox.getBounds().right >= platform.right - 10 && this.canMove)
                {
                    this.direction = -1
                }
            else if (this.hitbox.getBounds().left <= platform.left + 10 && this.canMove)
                {
                    this.direction = 1
                }
        }
    }

    public attack(){
        this.speed.x = 0
        this.canAttack = false;
        let random = Math.random()
        setTimeout(() => {console.log("ATAQUE"), this.canAttack = true}, random * 2000)

    }

    public loseHealth(lose: number){
        this.HEALTH -= lose
    }

    public getHealth(): number | void{
        return this.HEALTH
    }

}