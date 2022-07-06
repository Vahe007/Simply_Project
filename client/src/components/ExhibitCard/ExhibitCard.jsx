import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ExibitCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Exibit"
          height="140"
          image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Dui-CG5_VcIxTHxks0tTiME_1rIvYeIfMA&usqp=CAU'}
          title={'Title'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {'Title'}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {'Material'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
