import Image from "next/image";
// components
import { Input } from "antd";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import Caption from "components/caption";
import Translate, { translateText } from "components/translate";

function InputType({ type, validateEmail, error, className, direction, ...props }) {
  if (type === "search")
    return (
      <Input.Search
        className={`${className || ``} ${error ? `border border-red-500` : ``}`}
        {...props}
      />
    );
  else if (type === "password")
    return (
      <Input.Password
        className={`${className || ``} ${error ? `border border-red-500` : ``}`}
        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
        {...props}
      />
    );
  else if (type === "textarea")
    return (
      <Input.TextArea
        className={`${className || ``} ${error ? `border border-red-500` : ``}`}
        {...props}
      />
    );
  else
    return (
      <Input className={`${className || ``} ${error ? `border border-red-500` : ``}`} {...props} />
    );
}

function HintMessage({ hint, error, errorMessage, nonFloatingError }) {
  if (error && errorMessage)
    return (
      <Caption
        text
        className={`text-red-500 ${!nonFloatingError ? "absolute right-0 -bottom-7" : ""}`}
        doTranslate={false}
      >
        <FaInfoCircle />
        <Translate id={errorMessage} />
      </Caption>
    );
  else if (hint)
    return (
      <Caption text className="text-neutral-neu8 absolute right-0 bottom-18-">
        {hint}
      </Caption>
    );
  else return null;
}

export default function CustomInput({
  label,
  hint,
  type,
  error,
  errorMessage,
  placeholder,
  additionalLabel = null,
  labelClassName = "",
  className,
  validFormat = "",
  mb = "mb-6",
  additional = null,
  nonFloatingError = false,
  doTranslate = true,
  parentClassName = "",
  mandatory = false,
  ...props
}) {
  return (
    <div className={`${mb} ${parentClassName} relative w-full`}>
      {label && (
        <Caption
          text
          bold
          className={`${labelClassName} ${additionalLabel ? "inline-block" : ""}`}
          doTranslate={doTranslate}
          mandatory={mandatory}
        >
          {label}
        </Caption>
      )}
      {additionalLabel}
      <InputType
        type={type}
        error={error}
        placeholder={translateText(placeholder)}
        className={`rounded-lg  ${label ? "mt-2.5" : ""} ${className}`}
        {...props}
      />
      <HintMessage hint={hint} error={error} errorMessage={errorMessage} nonFloatingError />
      {additional}
    </div>
  );
}
