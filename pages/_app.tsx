"use client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Navbar from "@/components/navbar";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  // headers: {
  //   authorization: (localStorage && localStorage.getItem("token")) || "",
  // },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
