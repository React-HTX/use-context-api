import "@/styles/globals.css";
import { useState } from "react";

// Problem 2
// We need the Movie Provider to wrap the entire application.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
