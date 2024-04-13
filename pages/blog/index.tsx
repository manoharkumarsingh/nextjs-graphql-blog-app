import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { GET_ALL_QUOTES } from "../../gqloperations/queries";
import { useQuery } from "@apollo/client";

const Blog = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: "cache-and-network",
  });
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data &&
        data.quotes &&
        data.quotes.map((quote: any) => {
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={quote.by.firstName}
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
                        {quote.by.firstName}
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
  );
};

export default Blog;
