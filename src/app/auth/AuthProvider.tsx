import React from "react"
import { useRefreshMutation } from "../../store/auth/auth.api"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [refresh, { isSuccess, isError }] = useRefreshMutation()
	const [init, setInit] = React.useState(true)

	React.useEffect(() => {
		const refresh_token = localStorage.getItem("refresh")

		if (refresh_token) {
			refresh(refresh_token)
		} else {
			setInit(false)
		}
	}, [refresh])

	if (!isSuccess && !isError && init) {
		return <h1>Loading!</h1>
	}

	return <>{children}</>
}
