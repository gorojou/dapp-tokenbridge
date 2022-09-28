import React, { useEffect } from "react";
import "../styles/globals.css";
import { BlockchainContext } from "../components/BlockchainContext";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const app = () => {
      try {
        const script = document.createElement("script");
        script.src = "/particles/js/app.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      } catch (err) {
        console.log(err);
      }
    };
    return app();
  }, []);
  return (
    <>
      <Head>
        <title>Token Bridge</title>
        <meta name="description" content="Token Bridge" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </Head>
      <BlockchainContext>
        <Component {...pageProps} />
      </BlockchainContext>
    </>
  );
}

export default MyApp;
