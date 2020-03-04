import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <Switch>
        {routes.map(route => {
          let comp = React.lazy(() => import(`./pages/${route.component}`));

          if (route.isProtected)
            return (
              <Route
                exact
                key={route.path}
                path={route.path}
                title={route.title}
                render={(...props) => <ProtectedRoute comp={comp} {...props} />}
              />
            );

          return (
            <Route
              exact
              key={route.path}
              path={route.path}
              title={route.title}
              component={comp}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

export default App;
