import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { type UserWithoutPass, type AdminProfileForm, Role } from '../types/userTypes'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getUserAdmin, patchAdminUser } from '../api/SebaLibrosAPI'
import MessageError from './MessageError'
import axios from 'axios'

function ModalUpdateAcount() {
    const [user, setUser] = useState<UserWithoutPass>()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initialValues = {
        name: '',
        email: '',
        role: Role.editor,
        resetPass: false
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AdminProfileForm>({
        defaultValues: initialValues
    })

    const navigate = useNavigate()
    const { id } = useParams()
    const roleOptions = Object.values(Role);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!id) {
                    throw new Error("No identifier loaded.")
                }
                const data: UserWithoutPass = await getUserAdmin(id)
                if (!data) {
                    throw new Error("Failed to retrieve information from the server.")
                }
                reset({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                })
                setUser(data)

            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.error)

                } else {
                    setError('Unknown error')
                }
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [id, reset])

    const updateProfileMutation = useMutation({
        mutationFn: patchAdminUser,
        onError: () => {
            toast.error('Error')
        }
    })
    useEffect(() => {
        if (updateProfileMutation.isSuccess) {
            navigate('/admin/users?code=user_updated', { replace: true });
            updateProfileMutation.reset();
        }
    }, [updateProfileMutation.isSuccess, navigate]);


    const handlerUpdateAcountForm = (formData: AdminProfileForm) => {
        formData.name = formData.name
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        formData.email = formData.email.toLocaleLowerCase().trim()
        updateProfileMutation.mutate(formData)
    }




    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 h-64">
                <p className="text-2xl font-semibold text-indigo-600 animate-pulse">Cargando Usuario...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-8">
                <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error de Carga</p>
                    <p>{error}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="p-2 bg-gray-50 min-h-screen flex flex-col items-center">
            <h1 className='text-3xl font-extrabold text-gray-900'>Modificar los datos de mi cuenta</h1>

            <form
                onSubmit={handleSubmit(handlerUpdateAcountForm)}
                className='bg-white px-5 py-20 rounded-lg space-y-10 mt-10 text-start max-w-200 md:min-w-180'
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name', {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    {errors.name && <MessageError>{errors.name.message}</MessageError>}
                </div>
                <div className="grid grid-cols-1 space-y-3 ">
                    <label htmlFor="email" className="text-2xl text-slate-600">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-1 border-slate-300 p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <MessageError>{errors.email.message}</MessageError>
                    )}
                </div>
                <div className='grid grid-cols-1 space-y-3'>
                    <label htmlFor="estado" className="text-2xl text-slate-600">Estado</label>
                    <select
                        id="estado"
                        className="bg-slate-100 border-1 border-slate-300 p-3 rounded-lg placeholder-slate-400"
                        {...register('role')}
                    >
                        {roleOptions.map(role => (
                            <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <input
                        id="resetPass"
                        type="checkbox"
                        className="w-5 h-5 accent-fuchsia-600 cursor-pointer"
                        {...register("resetPass")}
                    />
                    <label
                        htmlFor="resetPass"
                        className="text-lg text-slate-600 select-none cursor-pointer"
                    >
                        Confirmar si desea reiniciar la contraseña
                    </label>
                </div>


                <div className="flex justify-end items-end gap-4">

                    <Link
                        className="text-center text-slate-800 text- border rounded-lg py-2 px-4"
                        to="/admin/users"
                    >
                        Volver
                    </Link>

                    <input
                        type="submit"
                        className="boton_principal text-2xl"
                        value="Modificar"
                    />

                </div>

            </form>
        </div>
    )
}

export default ModalUpdateAcount