import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AWSAppSyncClient from "aws-appsync";

Amplify.configure(awsmobile);

const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  disableOffline: true,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF"
          }}>
          <p
            style={{
              fontSize: 18
            }}>
            Todos
          </p>
        </div>
      </Rehydrated>
    </ApolloProvider>
  );
}

export default withAuthenticator(App, true);
