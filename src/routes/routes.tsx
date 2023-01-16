import Home from "../pages/Home"
import FindPage from "../pages/FindPage";
import MatchesPage from "../pages/MatchesPage";
import { Navigate } from "react-router-dom";

interface IRoute {
    path: string
    component: any
    permission?: string | false
    protected: boolean
}

const routes:IRoute[] = [
    { path: "/find", component: <FindPage/>, protected: true, permission: false },
    { path: "/matches", component: <MatchesPage/>, protected: true, permission: false },
    { path: "/", component: <Home/>, protected: false, permission: false },
    // { path: "/login", component: <LoginPage/>, protected: false, permission: false },
    // { path: "/protected", component: <Home/>, protected: true, permission: false },
    { path: "/*", component: <Navigate to='/' />, protected: false, permission: false },
]

export default routes
