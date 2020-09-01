import React from "react";
import "./App.css";
import Layout from "components/Layout";
import Routes from "Routes";

function App() {
  return (
    <div className="App">
      <Layout>
        <Layout.Header />
        <Layout.Content>
          <Routes />
        </Layout.Content>
        <Layout.Footer />
      </Layout>
    </div>
  );
}

export default App;
