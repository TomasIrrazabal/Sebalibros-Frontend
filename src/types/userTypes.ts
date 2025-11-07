export type User = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type RegisterForm = Pick<User, 'name' | 'email'> & {
    password: string,
    password_confirmation: string
}
