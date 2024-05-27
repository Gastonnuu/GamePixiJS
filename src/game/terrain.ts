import { Container, Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";

export class terrain extends Container implements IHitbox 
{
    private hitbox: Graphics;

    constructor() {
        super()
        this.hitbox = new Graphics()

    }

    public addHitbox(hitbox: Graphics): void {
        this.hitbox = hitbox
        this.addChild(this.hitbox)
    }

    public getHitbox():Rectangle {
        return this.hitbox.getBounds()
    }
}