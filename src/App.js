import React from "react";

import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AWSAppSyncClient from "aws-appsync";
import CreateTodo from "./components/createTodo";
import ListTodos from "./components/listTodos";

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
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "1200px",
            flexDirection: "column"
          }}>
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <p
              style={{
                fontSize: 18
              }}>
              Todos
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <ListTodos />
          </div>
          <div style={{ flex: 1 }}>
            <CreateTodo />
          </div>
        </div>
      </Rehydrated>
    </ApolloProvider>
  );
}

export default withAuthenticator(App, true);
