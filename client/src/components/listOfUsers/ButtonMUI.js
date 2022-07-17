import { Button } from "@mui/material";

function ButtonMUI(props) {
  const { text, color, variant, onClick, ...otherProps } = props;
  const configButton = {
    color,
    variant,
    onClick,
    ...otherProps,
  };
  return <Button {...configButton}>{text}</Button>;
}

export default ButtonMUI;
