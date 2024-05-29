import { Container, NineSlicePlane, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { Keyboard } from "../utils/Keyboard";
import { SceneAbstract } from "../utils/SceneAbstract";
import { sound } from "@pixi/sound";

export class MainMenu extends SceneAbstract{
    
    private menu: Container;
    public option: Container;

    public inMenu: boolean = true;
    public inOption: boolean = false;

    private volumePin: Sprite;
    private volume: number;

    constructor()
    {
        super()

        this.volume = 0.5;
        this.menu = new Container;
        this.option = new Container;

        const style = new TextStyle({
            fill: [
                "#8e5b3e",
                "#d9a066"
            ],
            fillGradientStops: [
                0.3
            ],
            fontFamily: "upheavtt",
            fontSize: 45,
            fontVariant: "small-caps",
            lineJoin: "bevel",
            stroke: "#000000",
            strokeThickness: 2
        });

        const TitleStyle = new TextStyle({
            fill: [
                "#8e5b3e",
                "#d9a066"
            ],
            fillGradientStops: [
                0.5
            ],
            fontFamily: "upheavtt",
            fontSize: 85,
            fontVariant: "small-caps",
            lineJoin: "bevel",
            strokeThickness: 4
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

        const textOption = new Text("OPTIONS", TitleStyle);
        textOption.anchor.set(0.5);
        textOption.position.set(-400, 200)
        optionBackGround.addChild(textOption)

        const textVolume = new Text("Volume:", style);
        textVolume.anchor.set(0.5);
        textVolume.position.set(-600, 350)
        optionBackGround.addChild(textVolume)

        const volumeBar = Sprite.from("volumeBar")
        volumeBar.scale.set(1.4)
        volumeBar.position.set(-610, 420)

        this.volumePin = Sprite.from("pin")
        this.volumePin.anchor.set(0.5)
        this.volumePin.scale.set(1.4)
        this.volumePin.position.set(-388.5, 427)
        
        const plus = Sprite.from("plus")
        plus.anchor.set(0.5)
        plus.scale.set(1.4)
        plus.position.set(-120, 428)
        plus.on("mousedown", this.onMouseDown)
        plus.on("mouseup", this.volumenUp, this)
        plus.interactive = true

        const minus = Sprite.from("minus")
        minus.anchor.set(0.5)
        minus.scale.set(1.4)
        minus.position.set(-660, 427)
        minus.on("mousedown", this.onMouseDown)
        minus.on("mouseup", this.volumenDown, this)
        minus.interactive = true

        const arrow = Sprite.from("backArrow");
        arrow.anchor.set(0.5);
        arrow.position.set(-650, 1000);
        arrow.on("mousedown",this.onMouseDown);
        arrow.on("mouseup", this.closeOption, this);
        arrow.interactive = true;

        
        optionBackGround.addChild(volumeBar)
        optionBackGround.addChild(this.volumePin)
        optionBackGround.addChild(plus)
        optionBackGround.addChild(minus)
        optionBackGround.addChild(arrow)

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

        sound.volumeAll = this.volume

        if (Keyboard.state.get("KeyX") && this.inOption)
            {
                new Tween(this.menu).to({x: 0}, 200).start();
                this.inOption = false;
                this.inMenu = true
            }

        if (Keyboard.state.get("KeyP") && !this.inOption && !this.inMenu)
            {
                new Tween(this.option).to({x: 0}, 200).start()
                this.inOption = false
                this.inMenu = true;
            }
    }

    private onMouseDown(): void {
        new Tween(this).to({scale: {x: 0.9, y: 0.9}}, 50).repeat(1).yoyo(true).start()
    }

    private volumenUp(): void {    
        if (this.inOption == true) {
            if (this.volume < 0.9) {
                this.volume += 0.1
                new Tween(this.volumePin).to({x: "+40.5"}, 50).start()
            }
        }          
    }

    private volumenDown(): void {      
        if (this.inOption == true) {
            if (this.volume > 0.1) {
                this.volume -= 0.1
                new Tween(this.volumePin).to({x: "-40.5"}, 50).start()
            }
        }
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

    private closeOption(): void {
        if (this.inOption == true) {
            new Tween(this.menu).to({x: 0}, 200).start();
            this.inOption = false;
            this.inMenu = true
        }
    }
}