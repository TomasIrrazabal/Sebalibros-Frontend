import { useForm } from 'react-hook-form';
import type { ClienteForm } from '../utils/types';
import MensajeError from '../components/MessageError';
import axios from 'axios';
import { useState } from 'react';
import api from '../config/axios';


export default function ContactView() {

    const [error, setError] = useState<string | null>(null);

    const valoresIniciales = {
        nombre: '',
        email: '',
        telefono: '',
        especialidad: '',
        mensaje: ''
    }

    const { register, reset, handleSubmit, formState: { errors } } = useForm<ClienteForm>({
        defaultValues: valoresIniciales
    })

    const handleForm = async (formData: ClienteForm) => {
        try {
            const { data } = await api.post('/contact', formData)
            if (data) {
                reset()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.error)
            } else {
                setError('Error desconocido')
            }
        }
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
        <div className='contenedor '>
            <h1 className='text-2xl text-black font-bold'>
                Contacto
            </h1>

            <form onSubmit={handleSubmit(handleForm)} className='bg-white px-5 py-20 rounded-2xl space-y-10 mt-10 shadow-b shadow-2xl'>
                <div className='grid grid-cols-1 space-y-3'>
                    <label className='text-xl text-slate-700'>Nombre *</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Tu Nombre'
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('name', {
                            required: 'El nombre es obligatorio.'
                        })}
                    />
                    {errors.name && <MensajeError>{errors.name.message}</MensajeError>}
                </div>

                <div className='grid grid-cols-1 space-y-3'>
                    <label className='text-xl text-slate-700'>Especialidad *</label>
                    <input
                        id='especiality'
                        type="text"
                        placeholder='Tu Especialidad'
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('especiality', {
                            required: 'La especialidad es obligatoria.'
                        })}
                    />
                    {errors.especiality && <MensajeError>{errors.especiality.message}</MensajeError>}
                </div>

                <div className='grid grid-cols-1 space-y-3'>
                    <label className='text-xl text-slate-700'>Email *</label>
                    <input
                        id='email'
                        type="text"
                        placeholder='Tu Número telefónico'
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('email', {
                            required: 'El e-mail es obligatorio.',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            }
                        })}
                    />
                    {errors.email && <MensajeError>{errors.email.message}</MensajeError>}
                </div>

                <div className='grid grid-cols-1 space-y-3'>
                    <label className='text-xl text-slate-700'>Número de telefono *</label>
                    <input
                        id='telefono'
                        type="text"
                        placeholder='Tu número telefónico'
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("phone", {
                            required: "El teléfono es obligatorio",
                            pattern: {
                                value: /^[0-9+\-\s]{7,15}$/,
                                message: "Formato inválido. Solo números, +, - y espacios"
                            }
                        })}
                    />
                    {errors.phone && <MensajeError>{errors.phone.message}</MensajeError>}
                </div>
                <div className='grid grid-cols-1 space-y-3'>
                    <label className='text-xl text-slate-700'>Mensaje *</label>
                    <input
                        id='message'
                        type="text"
                        placeholder='Tu Mensaje'
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {
                        ...register('message', {
                            required: 'El nombre es obligatorio.'
                        })}
                    />
                    {errors.message && <MensajeError>{errors.message.message}</MensajeError>}
                </div>

                <input
                    type="submit"
                    className="boton_principal p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Registrar mensaje'
                />
            </form>
        </div>
    )
}
