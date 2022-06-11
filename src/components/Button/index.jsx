import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Btn(props) {
  const { style, text, disabled, variant, onClick } = props;
  return (
    <div className="button">
      <ButtonGroup>
        <Button size="large" onClick={onClick} variant="contained" sx={{...style}}>{text}</Button>
      </ButtonGroup>
    </div>
  );
}

export default Btn;
