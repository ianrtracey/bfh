import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import fetch from 'isomorphic-unfetch';

if (!process.browser) {
  global.fetch = fetch;
}

injectGlobal`
  html {
    font-size: 16px;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    background: #060606 !important
  }
`;

// const apolloClient = new ApolloClient({
//   connectToDevTools: process.browser,
//   ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
//   link: new HttpLink({
//     uri: 'http://localhost:4000/graphql',
//     credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//   }),
//   cache: new InMemoryCache().restore(false || {}),
// });

const apolloClient = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
});

export default class MyCustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags }; // return styles collected
  }

  render() {
    return (
      <html>
        <Head>
          <title>Bands from Here</title>
          {this.props.styleTags}
        </Head>
        <body>
          <ApolloProvider client={apolloClient}>
            <div>
              <Main />
              <NextScript />
            </div>
          </ApolloProvider>
        </body>
      </html>
    );
  }
}
