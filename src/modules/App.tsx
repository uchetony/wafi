import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const LandingPage = React.lazy(() => import("./landing/LandingPage"));
const Home = React.lazy(() => import("./home/Home"));
const AccessPages = React.lazy(() => import("./access"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>...loading</div>}>
        <Switch>
          <ProtectedRoute path="/app" exact>
            <Home />
          </ProtectedRoute>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <AccessPages />
          <Route path="*">
            <div>404 billion</div>
          </Route>
        </Switch>
      </React.Suspense>
    </div>
  );
}

export default App;
