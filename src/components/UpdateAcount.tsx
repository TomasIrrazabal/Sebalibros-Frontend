
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ProfileForm, User } from '../types/userTypes'
import MessageError from './MessageError'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '../api/SebaLibrosAPI'
import { useEffect } from 'react'

function UpdateAcount() {
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!

    const initialValues: ProfileForm = {
        name: data.name,
        email: data.email
    }

    const { register, handleSubmit, formState: { errors }, } = useForm<ProfileForm>({
        defaultValues: initialValues
    })

    const navigate = useNavigate()


    const updateProfileMutation = useMutation({
        mutationFn: updateUser,
        onError: () => {
            toast.error('Error')
        }
    })
    useEffect(() => {
        if (updateProfileMutation.isSuccess) {
            navigate('/admin?code=user_updated', { replace: true });
            updateProfileMutation.reset();
        }
    }, [updateProfileMutation.isSuccess, navigate]);


    const handlerUpdateAcountForm = (formData: ProfileForm) => {
        formData.name = formData.name
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        formData.email = formData.email.toLocaleLowerCase().trim()
        updateProfileMutation.mutate(formData)
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


                <div className="flex justify-end items-end gap-4">

                    <Link
                        className="text-center text-slate-800 text- border rounded-lg py-2 px-4"
                        to="/admin"
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

export default UpdateAcount