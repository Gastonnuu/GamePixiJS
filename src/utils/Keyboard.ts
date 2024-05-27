import { utils } from "pixi.js";

export class Keyboard{

    public static readonly state: Map<string, boolean> =  new Map();

    public static readonly down : utils.EventEmitter = new utils.EventEmitter()

    public static readonly up : utils.EventEmitter = new utils.EventEmitter()

    private constructor(){}

    private static initialized: boolean = false
    
    public static initialize():void{

        if (Keyboard.initialized)
        {
            return;
        }
        Keyboard.initialized = true;
        window.addEventListener("keydown", Keyboard.onKeyDown);
        window.addEventListener("keyup", Keyboard.onKeyUp)
    }

    private static onKeyDown(e: KeyboardEvent)
    {
        Keyboard.state.set(e.code, true)
    }
    private static onKeyUp(e: KeyboardEvent)
    {
        Keyboard.state.set(e.code, false)
    }
}