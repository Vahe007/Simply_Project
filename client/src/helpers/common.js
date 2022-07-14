import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useLocation } from "react-router-dom";

export const baseUrl = `http://localhost:5000/api/v1/`;


export const LinkWithQuery = ({ children, to, ...props }) => {
  // const { search } = useLocation();
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export const fetchData = async ({ endpoint, method, body }) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
}


export const InputProps = (isVisible, changeVisibility) => {
  return {
    endAdornment: isVisible ? (
      <VisibilityIcon
        onClick={changeVisibility}
        sx={{ cursor: "pointer" }}
      />
    ) : (
      <VisibilityOffIcon
        onClick={changeVisibility}
        sx={{ cursor: "pointer" }}
      />
    ),
  }
}

export const debounce = (fn, delay = 400) => {
  let timeOut;
  return (args) => {
    const fnCall = () => {
      fn(args);
    };
    clearTimeout(timeOut);
    timeOut = setTimeout(fnCall, delay);
  };
};



