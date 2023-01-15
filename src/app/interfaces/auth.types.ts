export interface LoginRequest {
    password: string
    email: string
}

export interface LoginResponse {
    refresh: string
    access: string
}

export interface SignUpRequest {
	password: string
	email: string
	username: string
}

