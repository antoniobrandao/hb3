import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rect";
export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(instance, oldProps, newProps) {
    let {
      x,
      y,
      orientation,
      alpha,
      particleVerticalLineTexture,
      particleHorizontalLineTexture,
      particleDirectionX,
      particleDirectionY,
    } = newProps;

    if (typeof oldProps !== "undefined") {
      instance.clear();
    }

    
    const matrix = new PIXI.Matrix();
    if (orientation === 'vertical') {
      if (particleDirectionY > 0) {
        matrix.scale(1, -1)
      } else {
        matrix.scale(1, 1)
      }
      matrix.translate(x, y);
      instance.beginTextureFill({texture: particleVerticalLineTexture, matrix: matrix, alpha: alpha})
      .drawRect(x, y, 2, 53);
    } else {
      if (particleDirectionX > 0) {
        matrix.scale(1, 1)
      } else {
        matrix.scale(-1, 1)
      }
      matrix.translate(x, y);
      instance.beginTextureFill({texture: particleHorizontalLineTexture, matrix: matrix, alpha: alpha})
      .drawRect(x, y, 53, 2);
    }
    
    instance.endFill();
  },
};

export default CustomPIXIComponent(behavior, TYPE);

