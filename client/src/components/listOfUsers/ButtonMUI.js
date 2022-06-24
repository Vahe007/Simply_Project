import { Button } from "@mui/material"

function ButtonMUI(props) {
    const {text, color, variant, onClick } = props;
    return <Button 
                color={color} 
                variant={variant}
                onClick={onClick}
            >
                {text}

            </Button>
}   

export default ButtonMUI