import Home from "../pages/Home"
import FindPage from "../pages/FindPage";
import MatchesPage from "../pages/MatchesPage";
import { Navigate } from "react-router-dom";
import CompanyWorkshop from "../pages/CompanyWorkshop";

interface IRoute {
    path: string
    component: any
    permission?: string | false
    protected: boolean
}

const routes:IRoute[] = [
    { path: '/workshop', component: <CompanyWorkshop/>, protected: true, permission: false},
    { path: "/find", component: <FindPage/>, protected: true, permission: false },
    { path: "/matches", component: <MatchesPage/>, protected: true, permission: false },
    { path: "/", component: <Home/>, protected: false, permission: false },
    // { path: "/login", component: <LoginPage/>, protected: false, permission: false },
    // { path: "/protected", component: <Home/>, protected: true, permission: false },
    { path: "/*", component: <Navigate to='/' />, protected: false, permission: false },
]

export default routes
