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
    minWidth:"100%"
  },
});

export default function ExibitCard({ref}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} ref={ref}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Exibit"
          height="140"
          image={'https://cdn.w600.comps.canstockphoto.com/no-image-available-stock-illustrations_csp38533655.jpg'}
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
