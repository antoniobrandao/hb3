import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Line";
export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(instance, oldProps, newProps) {
    let { x1, y1, x2, y2, color, opacity, ...newPropsRest } = newProps;
    let { color: oldColor, opacity: oldOpacity, ...oldPropsRest } = oldProps;
    if (typeof oldProps !== "undefined") {
      instance.clear();
    }
    instance.lineStyle(2, color, opacity);
    instance.moveTo(x1, y1);
    instance.lineTo(x2, y2);
  },
};

export default CustomPIXIComponent(behavior, TYPE);
