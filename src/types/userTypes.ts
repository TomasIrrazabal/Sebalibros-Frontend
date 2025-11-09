export enum Role {
    admin = 'admin',
    editor = 'editor'
}
export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    role: Role
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'role'> & {
    password: string,
    password_confirmation: string
}

export type UserWithoutPass = Omit<User, 'password'>

export type ProfileForm = Pick<User, 'name' | 'email'>
export type AdminProfileForm = Pick<User, 'id' | 'name' | 'email' | 'role'> & { resetPass: boolean }

export type UsersList = { users: User[] }