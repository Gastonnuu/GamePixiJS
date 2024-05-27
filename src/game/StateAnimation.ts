import { AnimatedSprite } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";

export class StateAnimation extends PhysicsContainer
{    
    private states: Map<string, AnimatedSprite> = new Map();
    
    public addState (stateName: string, frames: string[], animationSpeed: number, loop: boolean = true) {
        
        const animation: AnimatedSprite = AnimatedSprite.fromFrames(frames)
        animation.animationSpeed = animationSpeed
        animation.loop = loop
        animation.visible = false;
        animation.position.set(-(animation.width / 2), -190)
        animation.play();
        this.states.set(stateName, animation)
        this.addChild(animation)         
    }

    public playState (stateName: string, restartAnim: boolean) {         
        for (const state of this.states.keys())
        {
            if (state == stateName)
            {
                const currentAnimation = this.states.get(state);
                if (currentAnimation != undefined)
                {
                    currentAnimation.visible = true;
                    if (restartAnim)
                    {
                        currentAnimation.gotoAndPlay(0);
                    }
                }
            }
            else
            {
                const currentAnimation = this.states.get(state);
                if (currentAnimation != undefined)
                {
                    currentAnimation.visible = false;
                }
            }
        }
    }
    
    public  animationUpdate(frames: number)
    {
        for (const state of this.states.values()) {
            state.update(frames);
        }
    }

    public isPlaying(stateName: string): boolean
    {
        const animation = this.states.get(stateName);
        if (animation != undefined)
        {
            return animation.playing
        }
        return false
    }
}