import { createGlobalStyle, ThemeProvider } from "styled-components";

import "../styles/globals.css";
import "nes.css/css/nes.min.css";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #209cee;
  }
`;

const theme = {};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head key="head-title">
        <title>Pokédex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
