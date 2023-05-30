import React from "react";

import { Layout } from "antd";
import { ApolloProvider } from "@apollo/client";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { TopMenu } from "./components/layout/TopMenu";
import { PostList } from "./containers/posts/PostList";
import { Post } from "./containers/posts/Post";

import "./App.css";

import { createApolloClient } from "./client";

const history = createBrowserHistory();

function App() {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Router history={history}>
        <Layout className="layout">
          <TopMenu />
          <Layout className="main-content">
            <Switch>
              <Route path="/posts/:id">
                <Post />
              </Route>
              <Route path="/users/:id">
                <PostList isForUser />
              </Route>
              <Route path="*">
                <PostList />
              </Route>
            </Switch>
          </Layout>
        </Layout>
      </Router>
    </ApolloProvider>
  );
}

export default App;
