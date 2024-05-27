import { Container, Graphics, Rectangle, Sprite, Text, TextStyle } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";
import { Tween } from "tweedle.js";

export class sign extends Container implements IHitbox
{

    private sign: Sprite
    private popUp: Text;
    private hitbox: Graphics;
    private isVisible = false

    constructor(text: string) {

        super()

        this.hitbox = new Graphics()
        this.pivot.y = 194
        this.hitbox.beginFill(0x0400ff, 0.3);
        this.hitbox.drawRect(-150,-50,300,194)
        this.hitbox.visible = false
        this.addChild(this.hitbox)

        this.sign = Sprite.from("sign")
        this.sign.position.x = -this.sign.width / 2
        this.addChild(this.sign)

        const style = new TextStyle({
            fontFamily: "upheavtt",
            fontSize: 80,
            fontVariant: "small-caps",
            lineJoin: "bevel",
            stroke: "#ffffff",
            strokeThickness: 3
        });

        this.popUp = new Text(text, style);
        this.popUp.alpha = 0;

    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();;
    }

    public makeVisible(): void {
        if (this.isVisible == false) {
            new Tween(this.popUp).to({alpha: 1}, 100).start()
            this.isVisible = true
        }
    }

    public makeVanish(): void {
        new Tween(this.popUp).to({alpha: 0}, 100).start()
        this.isVisible = false
    }

    public getPopUp(): Text {
        return this.popUp
    }
    
}