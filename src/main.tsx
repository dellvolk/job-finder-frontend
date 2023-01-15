import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { BrowserRouter } from "react-router-dom"
import AuthProvider from "./app/auth/AuthProvider"
import "./styles/globals.scss"
import "./styles/bootstrap.scss"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import App from "./App"
import { ThemeProvider } from "@mui/material"
import theme from "./styles/theme"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
	<>
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<ThemeProvider theme={theme('dark')}>
						<App />
					</ThemeProvider>
				</AuthProvider>
			</BrowserRouter>
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
