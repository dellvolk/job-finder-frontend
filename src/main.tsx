import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {store} from "./store/store"
import {BrowserRouter} from "react-router-dom"
import AuthProvider from "./app/auth/AuthProvider"
import "./styles/globals.scss"
import "./styles/bootstrap.scss"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import App from "./App"
import {ThemeProvider} from "@mui/material"
import theme from "./styles/theme"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

const authProviderProps = {
    apiKey: "AIzaSyCHt6p0amRkYiFurabAyO0j8VZauYxQq3o",
    authDomain: "jobs-finder-4c4b4.firebaseapp.com",
    projectId: "jobs-finder-4c4b4",
    storageBucket: "jobs-finder-4c4b4.appspot.com",
    messagingSenderId: "211830484894",
    appId: "1:211830484894:web:dfe60e82e247e2b429f08f",
    measurementId: "G-GG28Z5VWQX"
};


root.render(
    <>
        <Provider store={store}>
            <AuthProvider {...authProviderProps}>
                <BrowserRouter>
                    <ThemeProvider theme={theme('dark')}>
                        <App/>
                    </ThemeProvider>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </>,
)


// root.render(
// 	<>
// 		<Provider store={store}>
// 			<BrowserRouter>
// 				<AuthProvider>
// 					{/*<StyledEngineProvider injectFirst>*/}
// 					{/*	<CssBaseline/>*/}
// 					<div className="bg-black min-h-screen">
// 						<button className="bg-blue-700 m-2">
// 							Contained
// 						</button>
// 						<h1 className="text-white">Hello world</h1>
// 					</div>
// 					{/*<App />*/}
// 					{/*</StyledEngineProvider>*/}
// 				</AuthProvider>
// 			</BrowserRouter>
// 		</Provider>
// 	</>,
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
