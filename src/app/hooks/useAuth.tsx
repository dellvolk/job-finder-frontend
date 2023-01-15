import React from "react"
import useAppSelector from "./useAppSelector"

const useAuth = () => {
	const {token} = useAppSelector(state => state.auth)

	return React.useMemo(() => !!token, [token])
}

export default (useAuth)
