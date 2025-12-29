
export interface SuccessLoginResponse {
    message: string,
    user: userResponse,
    token: string
}

export interface FailLoginResponse {
    statusMsg: string,
    message: string
}
export interface userResponse {
    name: string,
    email: string,
    role: string

}