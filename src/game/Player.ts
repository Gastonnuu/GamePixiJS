
import { Assets, Graphics, Rectangle, } from 'pixi.js';
import { Keyboard } from '../utils/Keyboard';
import { IHitbox } from '../utils/IHitbox';
import { StateAnimation } from './StateAnimation';

export class Player extends StateAnimation implements IHitbox
{    
    private static readonly GRAVITY = 3000;
    
    private static readonly SPEED = 750;
    
    private static readonly JUMP = -900;

    private static readonly KNOCBACK = 100000;
    
    public attackCooldwon = 0.5;
    public dashCooldown = 1;
    public damageCooldown = 1;
    public canMove = true;
    public canAttack = true;
    public inAir = true;
    public canTakeDamage = true;
    public canSit = false;
    public isSitting = false;
    public isAnimatingAttack = false;

    private health = 5;
    
    private animations = Assets.cache.get("warrior-animations").data.animations;
    
    private hitbox:Graphics;
    private feetHitbox:Graphics;
    private attackHitbox:Graphics;
    
    constructor() {
        super();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0400ff, 0.3);
        this.hitbox.drawRect(0,0,60,160)
        this.hitbox.position.set(-30,-80);
        this.hitbox.visible = false;

        this.feetHitbox = new Graphics();
        this.feetHitbox.beginFill(0x95db53, 0.3);
        this.feetHitbox.drawRect(0,0,60,20)
        this.feetHitbox.position.set(-30,80);
        this.feetHitbox.visible = false;

        this.attackHitbox = new Graphics();
        this.attackHitbox.beginFill(0xff0000, 0.3);
        this.attackHitbox.drawRect(0,0,125,160)
        this.attackHitbox.pivot.set(-30, 80)
        this.attackHitbox.visible = false;
        
        this.addState("attack", this.animations["warrior-Attack"], 0.5, false)
        this.addState("attackUp", this.animations["warrior-AttackUp"], 0.5, false)
        this.addState("jump", this.animations["warrior-Jump"], 0.5, false)
        this.addState("jumpAttack", this.animations["warrior-JumpAttack"], 0.5, false)
        this.addState("jumpAttackUp", this.animations["warrior-JumpAttackUp"], 0.5, false)
        this.addState("jumpAttackDown", this.animations["warrior-JumpAttackDown"], 0.5, false)
        this.addState("inAir", this.animations["warrior_InAir"], 1)
        this.addState("run", this.animations["warrior-Run"], 0.15)
        this.addState("idle", this.animations["warrior-Idle"], 0.05)
        this.addState("rest", this.animations["warrior-Rest"], 0.05)
        this.addState("sit", this.animations["warrior-Sit"], 0.05)
        this.addState("getUp", this.animations["warrior-GetUp"], 0.05)

        this.playState("idle", false)
        
        this.addChild(this.hitbox)
        this.addChild(this.feetHitbox)
        this.addChild(this.attackHitbox)
    }
    
    public override update(deltaMS: number)
    {

        super.update(deltaMS / 60);

        if (!this.inAir) {
            this.canSit = true
        }else {
            this.canSit = false
        }

        this.dashCooldown -= deltaMS / 60;
        this.attackCooldwon -= deltaMS / 60;
        this.damageCooldown -= deltaMS / 60;
        
        if (this.attackCooldwon < 0)
        {
            this.canAttack = true
        }

        if (this.damageCooldown < 0)
        {
            this.canTakeDamage = true
        }
        
        if (this.speed.x > 0 && !this.isAnimatingAttack)
        {
            this.scale.x = 1;
        }else if (this.speed.x && !this.isAnimatingAttack)
        {
            this.scale.x = -1
        }
        
        this.acceleration.y = Player.GRAVITY;

        this.checkAnimation()
        
        if (this.canMove) {
            if (this.inAir && !this.isAnimatingAttack && !this.isSitting)
            {
                if (Keyboard.state.get("KeyZ") && this.canAttack)
                {
                    this.canAttack = false;
                    this.attackCooldwon = 0.5
                    if (Keyboard.state.get("ArrowUp"))
                    {
                        this.playState("jumpAttackUp", true);
                        this.attackHitbox.angle = -90;
                        this.attackHitbox.position.y = -10
                    }
                    else if (Keyboard.state.get("ArrowDown"))
                    {
                        this.playState("jumpAttackDown", true);
                        this.attackHitbox.angle = 90;
                        this.attackHitbox.position.y = 0
                    }else
                    {
                        this.playState("jumpAttack", true);
                        this.attackHitbox.angle = 0;
                        this.attackHitbox.position.y = 0
                    }
                }
                else
                {
                    this.playState("inAir", true)
                }
            }
            else if (!this.isPlaying("jumpAttackDown") && !this.isAnimatingAttack && !this.inAir && !this.isSitting)
            {
                if (Keyboard.state.get("KeyZ") && this.canAttack)
                {
                    this.canAttack = false;
                    this.attackCooldwon = 0.5
                    if (Keyboard.state.get("ArrowUp"))
                    {
                        this.playState("attackUp", true);
                        this.attackHitbox.angle = -90;
                        this.attackHitbox.position.y = -10
                    }
                    else
                    {
                        this.playState("attack", true);
                        this.attackHitbox.angle = 0;
                        this.attackHitbox.position.y = 0
                    }
                }
                else
                {
                    
                    if (Keyboard.state.get("ArrowRight"))
                    {
                        this.playState("run", false)
                        
                    }else if (Keyboard.state.get("ArrowLeft") )
                    {
                        this.playState("run", false)
                    }else
                    {
                        this.playState("idle", false)
            
                    }
                }
            }else if(this.isSitting) {
                this.playState("rest", false)
            }
            
            if (Keyboard.state.get("ArrowRight") && !this.isSitting)
            {
                this.speed.x = Player.SPEED;
                
            }else if (Keyboard.state.get("ArrowLeft") && !this.isSitting)
            {
                this.speed.x = -Player.SPEED;
            }
            else
            {
                this.speed.x = 0
    
            }
        
            if (Keyboard.state.get("KeyX") && !this.inAir && !this.isSitting)
            {
                this.speed.y = Player.JUMP;
            }
    
            if (Keyboard.state.get("ArrowDown") && this.canSit && !this.isSitting)
            {
    
            }
        }else {
            this.speed.x = 0
        }
    }
    
    public getHitbox(): Rectangle 
    {
        return this.hitbox.getBounds();
    }

    public getFeetHitbox(): Rectangle
    {
        return this.feetHitbox.getBounds();
    }

    public getAttackHitbox(): Rectangle
    {
        return this.attackHitbox.getBounds();
    }
    
    public separate(overlap: Rectangle, platform: Rectangle) {

        if (overlap.width < overlap.height){
            if (this.hitbox.getBounds().right  > platform.right)
            {
                this.x += overlap.width;
            }
            else if(this.hitbox.getBounds().left < platform.left)
            {
                this.x += -overlap.width;
            }
        }
        else{

            if (this.hitbox.getBounds().top < platform.top)
            {
                this.y -= overlap.height;
                this.acceleration.y = 0
                this.speed.y = 0
            }
            else if(this.hitbox.getBounds().top > platform.top)
            {

                this.y += overlap.height;
                this.acceleration.y = 0
                this.speed.y = 0
            }
        }
    }

    public getHit(overlap: Rectangle, enemy: Rectangle) {
        if (overlap.width < overlap.height){
            if (this.hitbox.getBounds().right  > enemy.right)
            {
                this.acceleration.x = Player.KNOCBACK;
                this.speed.y = -250;
                this.canMove = false
                setTimeout(() => {this.acceleration.x = 0; this.canMove = true}, 100)
            }
            else if(this.hitbox.getBounds().left < enemy.left)
            {
                this.acceleration.x = -Player.KNOCBACK;
                this.speed.y = -250;
                this.canMove = false
                setTimeout(() => {this.acceleration.x = 0; this.canMove = true}, 100)
            }
        }
        else{

            if (this.hitbox.getBounds().top < enemy.top)
            {
                this.speed.y = -500;
                
            }
            else if(this.hitbox.getBounds().top > enemy.top)
            {

                this.speed.y = 500;
            }
        }
    }

    public attackDown(){
        this.speed.y = Player.JUMP;
    }

    public loseHealth(lose: number){
        this.health -= lose
    }

    public healLife(heal: number){
        this.health += heal
    }

    public checkAnimation(): void {

        if (this.isPlaying("jumpAttack") || this.isPlaying("jumpAttackUp") || this.isPlaying("jumpAttackDown") || this.isPlaying("attack") || this.isPlaying("attackUp")) {
            this.isAnimatingAttack = true;
        }else {
            this.isAnimatingAttack = false
        }
    }

    public changeCanMove(): void {
        this.canMove = !this.canMove
    }

    public getHealth(): number {
        return this.health
    }
}

