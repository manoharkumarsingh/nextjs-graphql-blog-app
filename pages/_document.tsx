import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "@/components/navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="font-mono text-sm">
        <Navbar></Navbar>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}