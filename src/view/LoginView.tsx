import { useForm } from 'react-hook-form'
import type { LoginForm } from '../types/userTypes'
import MessageError from '../components/MessageError'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '../config/axios'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

function LoginView() {
    const initialValues: LoginForm = {
        email: '',
        password: ''
    }
    const navigate = useNavigate()
    const { register, formState: { errors } } = useForm({ defaultValues: initialValues })


    const login = useMutation({
        mutationFn: (body: { email: string, password: string }) =>

            api.post('/login', body),
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        },
        onSuccess: () => navigate('/admin')
    })


    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl text-white  '>Iniciar Sesión</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = new FormData(e.currentTarget);
                    login.mutate({
                        email: String(form.get('email')).toLowerCase(),
                        password: String(form.get('password'))
                    })
                }}
                className='bg-white px-5 py-20 rounded-lg space-y-10 mt-10 text-start max-w-200 md:min-w-120'
            >
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
                    <label htmlFor="password" className="text-2xl text-slate-600">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-1 border-slate-300 p-3 rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <MessageError>{errors.password.message}</MessageError>
                    )}
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
                        value="Iniciar Sesión"
                    />

                </div>

            </form>
        </div>
    )
}

export default LoginView