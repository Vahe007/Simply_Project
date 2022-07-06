import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CircularProgress } from '@mui/material';


function Btn(props) {
  const { style, text, disabled = false, variant, onClick, isLoading } = props;
  if (isLoading) {
    return <CircularProgress color="#1976d2"/>
  }
  return (
    <div className="button">
      <ButtonGroup>
        <Button
          disabled={disabled}
          size="large"
          onClick={onClick}
          variant="contained"
          sx={{ ...style }}
        >
          {text}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Btn;
