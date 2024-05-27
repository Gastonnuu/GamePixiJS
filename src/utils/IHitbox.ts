import { Rectangle } from "pixi.js";

export interface IHitbox {
    getHitbox(): Rectangle;
    
}

export function checkCollision(objA: Rectangle, objB: Rectangle): Rectangle | null
{
    const rightmostLeft = objA.left < objB.left ? objB.left : objA.left;
    const leftmostRight = objA.right > objB.right ? objB.right : objA.right; 

    const bottommostTop = objA.top < objB.top ? objB.top : objA.top;
    const topmostBottom = objA.bottom > objB.bottom ? objB.bottom : objA.bottom; 

    const makesSenseHorizontal = rightmostLeft < leftmostRight;
    const makesSenseVertical = bottommostTop < topmostBottom;
    
    if (makesSenseHorizontal && makesSenseVertical)
    {
        const rectangle = new Rectangle();
        rectangle.x = rightmostLeft;
        rectangle.y = bottommostTop;
        rectangle.width = leftmostRight - rightmostLeft;
        rectangle.height = topmostBottom - bottommostTop;
        return rectangle
    }
    else{
        return null
    }
}