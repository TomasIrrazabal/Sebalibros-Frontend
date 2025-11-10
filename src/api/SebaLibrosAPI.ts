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
    const { data } = await api.patch<{ user: User }>("/user", formData, { withCredentials: true });
    return data;
}

export const changePassword = (payload: { currentPassword: string, newPassword: string }) => {
    return api.patch('/password', payload, { withCredentials: true });
};

// obtener todos los usuarios, req admin
export async function getAllUsers(): Promise<UsersList> {
    try {
        const { data } = await api.get<UsersList>('/allusers', { withCredentials: true })
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
        const { data } = await api.get<{ user: UserWithoutPass }>(`/admin/user/${id}`, { withCredentials: true });
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
        await api.patch("/admin/user/", formData, { withCredentials: true });
        return true;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } {
            throw new Error("Unknown error fetching users");
        }
    }
}

export async function deleteAdminUser(id: number) {
    const response = await api.delete(`/admin/user/${id}`)
    return response
}