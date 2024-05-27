import { Container, Graphics, Rectangle } from 'pixi.js';
import { IHitbox } from '../utils/IHitbox';
export class exit extends Container implements IHitbox
{
    private hitbox: Graphics;

    constructor(width: number, height: number){
        super()
        this.hitbox = new Graphics()
        this.hitbox.beginFill(0x00ee00, 0.3);
        this.hitbox.drawRect(0,0,width,height);
        this.hitbox.visible = true;
        this.addChild(this.hitbox)
    }

    public getHitbox():Rectangle {
        return this.hitbox.getBounds()
    }
}