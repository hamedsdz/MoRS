// components
import { Button } from "antd";
import Translate from "components/translate";

export default function CustomButton({
  doTranslate = true,
  children,
  icon = null,
  iconAlign = "right",
  size = "medium",
  className = "",
  ...props
}) {
  return (
    <Button
      className={`inline-flex ${
        iconAlign === "left" && "flex-row-reverse"
      } rounded-lg ${className}`}
      size={size}
      icon={
        icon !== null && (
          <span
            className={`material-icons-outlined ${iconAlign === "left" ? "mr-1" : "ml-1"} ${
              size === "small" && "text-base"
            }`}
          >
            {icon}
          </span>
        )
      }
      {...props}
    >
      {doTranslate ? <Translate id={children} /> : children}
    </Button>
  );
}
