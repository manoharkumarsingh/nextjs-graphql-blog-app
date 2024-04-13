import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../../gqloperations/queries";

const Profile = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "network-only",
  });

  if (typeof window != "undefined" && !localStorage.getItem("token")) {
    router.push("/login", { scroll: false });
    return <h1>Unauthorized</h1>;
  }

  return (
    <div className="flex justify-center items-center h-[95vh]">
      <Card sx={{ width: 400 }}>
        <CardMedia
          component="img"
          alt={data && data.user.firstName}
          height="200"
          image={`https://robohash.org/${
            data && data.user.firstName
          }.png?size=200x200`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            First Name : {data && data.user.firstName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Last Name: {data && data.user.lastName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Email : {data && data.user.email}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
