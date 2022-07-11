import { Button } from "@mui/material";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import App from "../components/UsersPagination";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { classes } from "../styles/adminHomePageStyle.js";
import { useEffect } from "react";

function AdminHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("?page=1&limit=10&contains=&sortBy=");
  }, []);

  const options = [
    {
      name: "Users",
      path: "?page=1&limit=10&contains=&sortBy=",
    },

    {
      name: "Materials",
      path: "allmaterials",
    },

    {
      name: "Statuses",
      path: "allstatuses",
    },
  ];
  return (
    <>
      <div className={classes.header}>
        {options.map(({ name, path, variant }) => {
          const label = {
            className: classes.buttonHeader,
            key: uuid(),
            variant,
            onClick: () => {
              navigate(path);
            },
          };
          return <Button {...label}> {name} </Button>;
        })}
      </div>

      <Outlet />
    </>
  );
}

export default AdminHome;
