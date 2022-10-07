export interface LoginModel{
    email: string,
    password: string
}

export interface RegisterModel{
    username: string,
    email: string,
    password: string
}

export interface AuthResponse{
    isUserAuthenticated: boolean,
    username: string,
    token: string
}

export interface RegisterResponse{
    username: string,
    email: string
}