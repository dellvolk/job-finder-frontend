import Home from "../pages/Home"

interface IRoute {
    path: string
    component: any
    permission?: string | false
    protected: boolean
}

const routes:IRoute[] = [
    { path: "/", component: Home, protected: false, permission: false },
    // { path: "/login", component: <LoginPage/>, protected: false, permission: false },
    // { path: "/protected", component: <Home/>, protected: true, permission: false },
    // { path: "/*", component: '404 not found', protected: false, permission: false },
]

export default routes
