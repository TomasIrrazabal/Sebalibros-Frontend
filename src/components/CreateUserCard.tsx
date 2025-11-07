import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import type { RegisterForm } from '../types/userTypes'
import api from '../config/axios'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import MessageError from './MessageError'

function CreateUserCard() {
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: initialValues })

    const password = watch('password')

    const handleRegister = async (formData: RegisterForm) => {
        try {

            console.log(formData)
            const { data } = await api.post(`/admin/createuser`, formData)
            toast.success(data)

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        }
    }

    return (
        <>

            <h1 className='text-4xl text-black  '>Crear Usuario</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className='bg-white px-5 py-20 rounded-lg space-y-10 mt-10 text-start'
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
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El password debe tener mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && <MessageError>{errors.password.message}</MessageError>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "Repetir password es obligatorio",
                            validate: (value) => value === password || 'Los password no son iguales'
                        })}
                    />
                    {errors.password_confirmation && <MessageError>{errors.password_confirmation.message}</MessageError>}
                </div>









                <div className="flex justify-end items-end gap-4">

                    <Link
                        className="text-center text-slate-800 text- border rounded-lg py-2 px-4"
                        to="/"
                    >
                        Volver
                    </Link>

                    <input
                        type="submit"
                        className="boton_principal text-2xl"
                        value="Crear Usuario"
                    />

                </div>

            </form>
        </>
    )
}




export default CreateUserCard