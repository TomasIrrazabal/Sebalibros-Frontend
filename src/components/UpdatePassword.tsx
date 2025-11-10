import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { changePassword } from "../api/SebaLibrosAPI"
import { toast } from "sonner"
import axios from "axios"
import MessageError from "./MessageError"
import { Link, useNavigate } from "react-router-dom"

type FormValues = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};
function UpdatePassword() {
    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate()

    const updatePasswordMutation = useMutation({
        mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
            changePassword(payload),
        onSuccess: () => {
            navigate('/admin?code=password_updated', { replace: true });

            reset();
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Error updating password');
            }
        },

    })



    const onSubmit = (data: FormValues) => {

        updatePasswordMutation.mutate({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
    };
    const newPwd = watch('newPassword')


    return (
        <div className="p-2 bg-gray-50 min-h-screen flex flex-col items-center">
            <h1 className='text-3xl font-extrabold text-gray-900'>Cambiar Contraseña</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white px-5 py-20 rounded-lg space-y-10 mt-10 text-start max-w-200 md:min-w-180'
            >

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('currentPassword', {
                            required: "La contraseña actual es obligatoria",
                        })}
                    />
                    {errors.currentPassword && <MessageError>{errors.currentPassword.message}</MessageError>}
                </div>


                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('newPassword', {
                            required: "La nueva contrasña es obligatoria",
                            minLength: {
                                value: 8,
                                message: 'El password debe tener mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.newPassword && <MessageError>{errors.newPassword.message}</MessageError>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('confirmNewPassword', {
                            required: "Repetir password es obligatorio",
                            validate: (value) => value === newPwd || 'Los password no son iguales'
                        })}
                    />
                    {errors.confirmNewPassword && <MessageError>{errors.confirmNewPassword.message}</MessageError>}
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
            </form >
        </div>
    )
}

export default UpdatePassword


