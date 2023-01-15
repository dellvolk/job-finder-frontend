import * as React from "react";
import useAppSelector from "./app/hooks/useAppSelector";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import useAuth from "./app/hooks/useAuth";
import theme from "./styles/theme";
import { ThemeProvider } from "@mui/material";

// const token = useAppSelector(state => state.auth.token)

export default function App() {
  const data = useAppSelector(state => state.auth);
  console.log(data);
  const auth = useAuth();
  console.log({ auth });
  return (
    <>
      {/*<ThemeProvider theme={theme("light")}>*/}
        <Auth />
      {/*</ThemeProvider>*/}
      {/*<ThemeProvider theme={theme('dark')}>*/}
      <Layout>
        <Home />
        {/*<Routes>*/}
        {/*	<Route path="/*" element={<><Home/></>}/>*/}
        {/*</Routes>*/}
      </Layout>
      {/*</ThemeProvider>*/}
    </>
  );
}
