import {  Graphics, Sprite } from "pixi.js";
import { terrain } from "./terrain";


export class smallPlatform extends terrain
{

    constructor()
    {
        super()
        const sprite = Sprite.from("smallPlatform")
        this.addChild(sprite)

        const hitbox = new Graphics();
        hitbox.beginFill(0xeb4034, 0.3);
        hitbox.drawRect(25,32,235,40);
        hitbox.visible = false;
        super.addHitbox(hitbox)
    }
}