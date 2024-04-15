import React, { useState, useEffect } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: "cache-and-network",
  });
  const [quotes, setQuotes] = useState(data && data.quotes ? data.quotes : []);

  useEffect(() => {
    if (data && data.quotes) {
      setQuotes(data.quotes);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data && data.quotes && e.target.value) {
      let list: any = [];
      data.quotes.forEach((quote: any) => {
        if (
          quote.by.firstName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          list.push(quote);
        }
      });
      setQuotes(list);
    } else {
      setQuotes(data && data.quotes ? data.quotes : []);
    }
    setSearchValue(e.target.value);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <div className="flex justify-center p-10">
        <div className="w-[50%]">
          <input
            id="name"
            name="title"
            type="text"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            onChange={(e) => {
              handleSearch(e);
            }}
            value={searchValue}
          />
        </div>
      </div>
      {quotes &&
        quotes.length &&
        quotes.map((quote: any) => {
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
