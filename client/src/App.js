import React, { useEffect } from "react";
import "./App.css";
import Layout from "components/Layout";
import Routes from "Routes";
import { useLocation } from "react-router";
import ReactGA from 'react-ga';

function App() {
  const location = useLocation()
  useEffect(() => { ReactGA.initialize('UA-154949513-1') }, [])
  useEffect(() => { ReactGA.pageview(location.pathname) }, [location])
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
