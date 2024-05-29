import { Container, Sprite, Texture } from "pixi.js";

export class Health extends Container {

    private healthBar: Container;
    private hearts: Sprite[];

    constructor() {

        super()

        this.healthBar = new Container();

        this.hearts = [];

        const heart = new Sprite(Texture.from("heart"));
        const heart2 = new Sprite(Texture.from("heart"));
        heart2.position.x = 64;
        const heart3 = new Sprite(Texture.from("heart"));
        heart3.position.x = 128;
        const heart4 = new Sprite(Texture.from("heart"));
        heart4.position.x = 192;
        const heart5 = new Sprite(Texture.from("heart"));
        heart5.position.x = 258;

        this.hearts.push(heart);
        this.hearts.push(heart2);
        this.hearts.push(heart3);
        this.hearts.push(heart4);
        this.hearts.push(heart5);

        for (let singleHeart of this.hearts)
        this.healthBar.addChild(singleHeart)

        this.healthBar.position.set(50, 25)

        this.addChild(this.healthBar)

    }

    public update(playerHealth: number) {
        this.updateHealth(playerHealth)
    }

    private updateHealth(health: number) {
        if (health > -1) {
            for (let i = 0; i < 5; i++) {
                this.hearts[i].alpha = 1
            }
    
            for (let i = health; i < 5; i++) {
                this.hearts[i].alpha = 0
            }
        }
    }
}