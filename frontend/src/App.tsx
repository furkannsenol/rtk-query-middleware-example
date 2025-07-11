import React, { Suspense } from "react";
import "./App.css";
import { authProtectedRoutes, publicRoutes } from "./routes/allRoutes";
import { Route, Routes } from "react-router-dom";
import AuthProtected from "./routes/AuthProtected";
import Layout from "./layouts";
import NonAuthLayout from "./layouts/NonLayout";
import LoadingSuspense from "./wrapper/LoadingSuspense";

function App() {
  return (
    <Suspense fallback={<LoadingSuspense />}>
      <React.Fragment>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              key={idx}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            />
          ))}
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              key={idx}
              element={
                <React.Fragment>
                  <AuthProtected>
                    <Layout>{route.component}</Layout>
                  </AuthProtected>
                </React.Fragment>
              }
            />
          ))}
        </Routes>
      </React.Fragment>
    </Suspense>
  );
}

export default App;
