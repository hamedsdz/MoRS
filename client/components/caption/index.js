// components
import { Tooltip, Typography } from "antd";
import Translate from "components/translate";

const { Title, Text, Paragraph } = Typography;

export default function Caption({
  title = false,
  text = false,
  level = 1,
  bold = false,
  paragraph = false,
  doTranslate = true,
  children,
  mandatory = false,
  ...props
}) {
  if (title)
    return (
      <Title level={level} {...props}>
        {mandatory ? <span className="text-red-400 ml-0.5">*</span> : null}
        {doTranslate ? <Translate id={children} /> : children}
      </Title>
    );
  if (text)
    return (
      <Text strong={bold} {...props}>
        {mandatory ? <span className="text-red-400 ml-0.5">*</span> : null}
        {doTranslate ? <Translate id={children} /> : children}
      </Text>
    );
  if (paragraph)
    return (
      <Paragraph strong={bold} {...props}>
        {mandatory ? <span className="text-red-400 ml-0.5">*</span> : null}
        {doTranslate ? <Translate id={children} /> : children}
      </Paragraph>
    );

  return null;
}
