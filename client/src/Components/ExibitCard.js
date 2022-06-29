import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// images
import Img1 from "../TestImages/img4.jpg";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ExibitCard({ props }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Exibit"
          height="140"
          image={props.images}
          title={props.itemName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.itemName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.material}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
