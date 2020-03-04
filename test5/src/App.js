import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Switch>
      <Suspense fallback={<div>Loading... </div>}>
        {routes.map(route => {
          let comp = React.lazy(() => import(`./pages/${route.component}`));

          if (route.isProtected)
            return (
              <Route
                exact
                key={route.path}
                path={route.path}
                title={route.title}
                render={(...props) => <ProtectedRoute comp={comp} {...props}/>}
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
      </Suspense>
    </Switch>
  );
}

export default App;
