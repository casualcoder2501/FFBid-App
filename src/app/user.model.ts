export interface IUser {
    userName?: string;
    department?: string;
}
export interface ITile {
    title: string;
    image: string;
    // description: string;

}

// interface for consuming json web token from server
export interface Token {
    status?: string;
    id_token: string;
}

export interface IUserInfo extends IUser {
    password?: string;
    email?: string;
}

// class for consuming user input when creating a new user
export class User implements IUserInfo {
    userName?: string;
    password?: string;
    email?: string;
    department?: string;
    constructor(user: IUser) {
        Object.assign(this, user);
    }
}

// class that handles the user data retrieved from the stored json web token
export class CurrentUser implements IUser {
    userName?: string;
    department?: string;
    constructor(user: IUserInfo) {
        Object.assign(this, user);
    }
}

