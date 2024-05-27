import { Graphics } from "pixi.js";

import { terrain } from "./terrain";

export class wall extends terrain
{
    constructor(height: number)
    {
        super()
        const hitbox = new Graphics();
        hitbox.beginFill(0xeb4034, 0.3);
        hitbox.drawRect(0,0,40,height);
        hitbox.visible = false;
        super.addHitbox(hitbox)
    }
}