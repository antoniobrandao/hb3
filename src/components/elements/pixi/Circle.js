import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Circle";
export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(instance, oldProps, newProps) {
    let { fill, x, y, radius, strokeColor } = newProps;
    if (typeof oldProps !== "undefined") {
      instance.clear();
    }
    instance.beginFill(fill);
    instance.lineStyle(2, strokeColor, 1)
    instance.drawCircle(x, y, radius);
    instance.endFill();
  },
};

export default CustomPIXIComponent(behavior, TYPE);
