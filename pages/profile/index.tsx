import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../../gqloperations/queries";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Image from "next/image";

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
    <div className="flex justify-center ">
      <div className="bg-[white] p-10 w-[50%]">
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src={`https://robohash.org/${
                data && data.user.firstName
              }.png?size=200x200`}
              alt="logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>

          <Typography gutterBottom variant="h6" component="div">
            First Name : {data && data.user.firstName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Last Name: {data && data.user.lastName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Email : {data && data.user.email}
          </Typography>
        </div>
        <List sx={{ bgcolor: "background.paper" }}>
          {data &&
            data.user &&
            data.user.quotes &&
            data.user.quotes.length > 0 &&
            data.user.quotes.map((quote: any) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={data.user.firstName}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={quote.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {data.user.firstName}
                          </Typography>
                          {" — " + quote.desc}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
        </List>
      </div>
    </div>
  );
};

export default Profile;
