import { AvailableComponent } from "components/box/types";
import { CSSProperties } from "react";
import play from "@public/image/ico/playBasic.svg";
import start from "@public/image/ico/startBasic.svg";
import finish from "@public/image/ico/finishBasic.svg";
import equally from "@public/image/ico/equallyBasic.svg";
import comparison from "@public/image/ico/comparisonBasic.svg";
import { selectorComponentId, selectorCurrentComponent } from "redux/selectors";
import { useAppSelector } from "hooks/redux.hook";

const WrapperComponent = (
  PassedComponent: React.ComponentType<
    AvailableComponent & {
      nameHeader: string;
      style: CSSProperties;
      ico: string;
      notDrag: boolean | undefined;
      isChange: boolean;
    }
  >
) => {
  return (
    props: AvailableComponent & {
      isDragging: boolean;
      notDrag: boolean | undefined;
      //
    }
  ) => {
    const idCurrent =
      useAppSelector((state) => selectorCurrentComponent(state))?.id || -1;

    const isChange = idCurrent === props.id;

    let css: CSSProperties = {};

    if (props.id) {
      css.top = 0;
      css.left = 0;
      css.marginTop = !props.notDrag ? props.y - 50 : 0;
      css.marginLeft = !props.notDrag ? props.x - 310 : 0;
      css.opacity = props.isDragging ? 0 : 1;
      css.position = props.id && !props.notDrag ? "absolute" : undefined;
    }

    let nameHeader = "";
    let ico = "";
    switch (props.type) {
      case "start":
        nameHeader = "Старт";
        css.borderColor = "rgba(255, 153, 61, 0.60)";
        ico = start;

        break;
      case "finish":
        nameHeader = "Финиш";
        css.borderColor = "rgba(255, 0, 0, 0.60)";
        ico = finish;
        break;
      case "play":
        nameHeader = "Воспроизведение";
        css.borderColor = "rgba(77, 233, 63, 0.60)";
        ico = play;
        break;

      case "equally":
        nameHeader = "Присвоение";
        css.borderColor = "rgba(242, 246, 82, 0.6)";
        ico = equally;
        break;
      case "comparison":
        nameHeader = "Сравнение";
        css.borderColor = "rgba(57, 141, 218, 0.60)";
        ico = comparison;
        break;

      default:
        break;
    }

    return (
      <PassedComponent
        {...props}
        nameHeader={nameHeader}
        style={css}
        ico={ico}
        notDrag={props.notDrag}
        isChange={isChange}
      />
    );
  };
};

export { WrapperComponent };
