import React from "react"
import useAppSelector from "../../app/hooks/useAppSelector"
import { selectAuthModalType, setAuthModalType, TAuthModalType } from "../../store/auth/auth.slice"
import useAppDispatch from "../../app/hooks/useAppDispatch"
import AuthModal from "./AuthModal"

const Auth = () => {
	// const [type, setType] = React.useState<"login" | "registration" | false>("login")
	const type = useAppSelector(selectAuthModalType)
	const dispatch = useAppDispatch()
	const onClose = () => {
		dispatch(setAuthModalType({ type: false }))
	}

	const setType = (type:TAuthModalType) => {
		dispatch(setAuthModalType({ type }))
	}

	if (!type) return <></>

	return <AuthModal onClose={onClose} setType={setType} type={type} />
}

export default (Auth)
