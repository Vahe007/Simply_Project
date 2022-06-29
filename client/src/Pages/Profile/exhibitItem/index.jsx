import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const ExhibitItem = ({exhibit}) => {
  const {exhibitName, description, contributors, id } = exhibit;
  return (
    
    <Card sx={{ width: 250, margin: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {description}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
              {contributors}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExhibitItem;
