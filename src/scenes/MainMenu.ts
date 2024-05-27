import { Container, NineSlicePlane, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { Keyboard } from "../utils/Keyboard";
import { SceneAbstract } from "../utils/SceneAbstract";

export class MainMenu extends SceneAbstract{
    
    private menu: Container;
    public option: Container;

    public inMenu: boolean = true;
    public inOption: boolean = false;

    constructor()
    {
        super()

        this.menu = new Container;
        this.option = new Container;

        const style = new TextStyle({
            fontFamily: "upheavtt",
            fontSize: 75,
            fontVariant: "small-caps",
            lineJoin: "bevel",
            stroke: "#ffffff",
            strokeThickness: 3
        });

        const menuBackground = new Sprite(Texture.from("menu-PopUp"));
        menuBackground.anchor.x = 1;
        menuBackground.position.x = 1920;

        const optionBackGround = new Sprite(Texture.from("option-PopUp"));
        optionBackGround.anchor.x = 1;
        optionBackGround.position.x = 1920;

        const logo = new Sprite(Texture.from("title"));
        logo.anchor.set(0.5, 0.5);
        logo.position.set(1570, 250);
        logo.scale.set(2)
        logo.on("mousedown", this.onMouseDown)
        logo.interactive = true

        const button = new NineSlicePlane(Texture.from("button"), 35, 35, 35, 35);
        button.pivot.set(175, 35);
        button.width = 350;
        button.height = 70;
        button.position.set(1565, 535);
        button.on("mousedown", this.onMouseDown);
        button.on("mouseup", this.startGame, this);
        const text = new Text("Play", style)
        text.anchor.set(0.5)
        text.position.set(175, 28)
        button.addChild(text);
        button.interactive = true;
        
        const button2 = new NineSlicePlane(Texture.from("button"), 35, 35, 35, 35);
        button2.pivot.set(175, 35)
        button2.width = 350;
        button2.height = 70;
        button2.position.set(1565, 645)
        button2.on("mousedown", this.onMouseDown)
        button2.on("mouseup", this.openOptions, this)
        const text2 = new Text("Options", style)
        text2.anchor.set(0.5)
        text2.position.set(175, 28)
        button2.addChild(text2);
        button2.interactive = true

        const button3 = new NineSlicePlane(Texture.from("button"), 35, 35, 35, 35);
        button3.pivot.set(175, 35)
        button3.width = 350;
        button3.height = 70;
        button3.position.set(1565, 755)
        button3.on("mousedown", this.onMouseDown)
        button3.on("mouseup", this.openCredits, this)
        const tex3 = new Text("Credits", style)
        tex3.anchor.set(0.5)
        tex3.position.set(175, 28)
        button3.addChild(tex3);
        button3.interactive = true

        this.option.addChild(optionBackGround);
        this.menu.addChild(menuBackground);
        this.menu.addChild(logo);
        this.menu.addChild(button);
        this.menu.addChild(button2);
        this.menu.addChild(button3);
        this.option.addChild(this.menu);
        this.addChild(this.option)
    }



    public update(): void {
        if (Keyboard.state.get("KeyX") && this.inOption)
            {
                new Tween(this.menu).to({x: 0}, 200).start()
                this.inMenu = true
            }

        if (Keyboard.state.get("KeyP") && !this.inOption && !this.inMenu)
            {
                new Tween(this.option).to({x: 0}, 200).start()
                this.inMenu = true;
            }
    }

    private onMouseDown(): void {
        new Tween(this).to({scale: {x: 0.9, y: 0.9}}, 50).repeat(1).yoyo(true).start()
    }

    private startGame(): void {
        this.closeMenu();
        this.inMenu = false;
        this.inOption = false;
        
    }

    private openOptions(): void {
        new Tween(this.menu).to({x:650}, 200).start()
        this.inMenu = true;
        this.inOption = true;
    }

    private openCredits(): void {
        console.log("Credits")
    }

    public openMenu = (): void => {
        new Tween(this.option).to({x: 0}, 200).start();
    }

    public closeMenu(): void {
        new Tween(this.option).to({x: 765}, 200).start()
    }
}