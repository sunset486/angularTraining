//#region LOGIN&REGISTER
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
//#endregion

//#region ROLES
export interface RoleModel{
    name: string
}

export interface RoleResponse{
    name: string
}
//#endregion

//#region ADD ROLES TO USER
export interface ModifyUserRoleModel{
    roleName: string,
    userName: string
}

export interface ModifyUserRoleResponse{
    roleName: string,
    userName: string
}
//#endregion