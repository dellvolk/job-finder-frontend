import * as React from "react";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import {Route, Routes,} from "react-router-dom";
import RequireAuth from "./app/auth/RequireAuth";
import routes from "./routes/routes";

// const token = useAppSelector(state => state.auth.token)

export default function App() {
    // const data = useAppSelector(state => state.auth);
    // console.log(data);
    // const auth = useAuth();
    // console.log({auth});
    return (
        <>
            {/*<ThemeProvider theme={theme("light")}>*/}
            <Auth/>
            {/*</ThemeProvider>*/}
            {/*<ThemeProvider theme={theme('dark')}>*/}
            <Layout>
                <Routes>
                    {routes.map(({path, component, protected: shouldAuth}) =>
                        <Route
                            key={path}
                            path={path}
                            element={shouldAuth ? <RequireAuth>{component}</RequireAuth> : component}
                        />)}
                </Routes>
            </Layout>
            {/*</ThemeProvider>*/}
        </>
    );
}
