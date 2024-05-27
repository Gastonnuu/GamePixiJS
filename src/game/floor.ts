import { Graphics } from "pixi.js";

import { terrain } from "./terrain";

export class floor extends terrain
{
    constructor(lenght: number)
    {
        super()
        const hitbox = new Graphics();
        hitbox.beginFill(0xeb4034, 0.3);
        hitbox.drawRect(0,0,lenght,40);
        hitbox.visible = false;
        super.addHitbox(hitbox)
    }
}