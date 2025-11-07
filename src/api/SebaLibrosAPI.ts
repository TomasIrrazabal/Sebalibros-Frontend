import { isAxiosError } from "axios"
import api from "../config/axios"
import type { User } from '../types/userTypes'

export async function getUser() {
    try {
        const { data } = await api.get<User>('/user')
        // El interceptor de axios.ts se encarga de enviar el token
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}