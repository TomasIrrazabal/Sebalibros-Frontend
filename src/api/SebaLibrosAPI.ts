import { isAxiosError } from "axios"
import api from "../config/axios"
import { type UserWithoutPass, type AdminProfileForm, type ProfileForm, type User, type UsersList } from '../types/userTypes'

// obtiene el usuario autenticado
export async function getUser() {
    try {
        const { data } = await api.get<{ user: User }>('/user')
        // El interceptor de axios.ts se encarga de enviar el token
        return data.user
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function logout() {
    try {
        await api.get('/logout')
        return true
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}


// para modificar la cuenta propia
export async function updateUser(formData: ProfileForm) {
    const { data } = await api.patch<{ user: User }>("/user", formData);
    return data;
}

// obtener todos los usuarios, req admin
export async function getAllUsers(): Promise<UsersList> {
    try {
        const { data } = await api.get<UsersList>('/allusers')
        if (!data) throw new Error("Empty Server Response");

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } {
            throw new Error("Unknown error fetching users");
        }
    }
}

export async function getUserAdmin(id: string): Promise<UserWithoutPass> {
    try {
        const { data } = await api.get<{ user: UserWithoutPass }>(`/admin/user/${id}`);
        if (!data) throw new Error("Empty Server Response");

        return data.user
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } {
            throw new Error("Unknown error fetching users");
        }
    }
}
// modificar un usuario, req admin
export async function patchAdminUser(formData: AdminProfileForm) {
    try {
        await api.patch("/admin/user/", formData);
        return true;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } {
            throw new Error("Unknown error fetching users");
        }
    }
}