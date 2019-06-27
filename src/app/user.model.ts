export interface IUser {
    userName?: string;
    department?: string;
}

export interface Token {
    id_token: string;
}

export interface IUserInfo extends IUser {
    password?: string;
    email?: string;
}

export class User implements IUserInfo {
    userName?: string;
    password?: string;
    email?: string;
    department?: string;
    constructor(user: IUser) {
        Object.assign(this, user);
    }
}

export class CUser implements IUser {
    userName?: string;
    department?: string;
    constructor(user: IUserInfo) {
        Object.assign(this, user);
    }
}

