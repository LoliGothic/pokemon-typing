import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import happyicon from "../../public/images/happy.png";

export default function MediaCard() {
  return (
    <Card
      component="a"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CardMedia
        component="img"
        width="auto"
        height="600px"
        style={{ objectFit: "contain" }}
        image={happyicon}
        alt="user icon"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Username
        </Typography>
      </CardContent>
    </Card>
  );
}
