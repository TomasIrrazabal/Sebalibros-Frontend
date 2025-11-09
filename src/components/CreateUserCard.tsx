import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Role, type RegisterForm } from '../types/userTypes'
import api from '../config/axios'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import MessageError from './MessageError'

function CreateUserCard() {
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        role: Role.editor,
        password: '',
        password_confirmation: ''
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: initialValues })

    const password = watch('password')
    const navigate = useNavigate()

    const handleRegister = async (formData: RegisterForm) => {
        try {
            await api.post(`/admin/createuser`, formData)
            navigate('/admin?code=user_created')

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        }
    }

    const roleOptions = Object.values(Role);


    return (
        <div className="p-2  bg-gray-50 min-h-screen flex flex-col items-center">

            <h1 className='text-3xl font-extrabold text-gray-900 '>Crear Usuario</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
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
                        to="/admin"
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
        </div>
    )
}




export default CreateUserCard