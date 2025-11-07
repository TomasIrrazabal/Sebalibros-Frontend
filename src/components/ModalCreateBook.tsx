import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Status, type BookFormCreate } from '../types/bookTypes';
import MensajeError from './MessageError';
import api from '../config/axios';
import { toast } from 'sonner';


const initialValues: BookFormCreate = {
    title: '',
    description: '',
    price: 0,
    author: '',
    image: '', //?
    dateUpload: new Date(),
    format: '', // ?
    bookBinding: '', // ?
    isbn: '',
    resume: '', // ?
    especiality: '', // ?
    state: Status.inactive,
    pages: 1
}

export default function ModalCreateBook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const navigate = useNavigate()




    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<BookFormCreate>({ defaultValues: initialValues })


    const handleForm = async (data: BookFormCreate) => {

        setLoading(true)
        setError(null)


        try {
            const formData = new FormData()

            if (imageFile && data) {
                formData.append('image', imageFile);
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('price', String(data.price));
                formData.append('author', data.author);
                formData.append('format', String(data.format));
                formData.append('bookBinding', String(data.bookBinding));
                formData.append('isbn', data.isbn);
                formData.append('resume', String(data.resume));
                formData.append('especiality', String(data.especiality));
                formData.append('state', data.state);
                formData.append('pages', String(data.pages));
                formData.append('dateUpload', new Date().toISOString());

                await api.post('/admin/book', formData)

                navigate('/admin?code=book_created')

            } else {
                throw new Error('Debe seleccionar una imagen.');
            }


        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error)
            } else {
                setError('Error desconocido')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            clearErrors('image')
        } else {
            setImageFile(null);
        }
    };


    const estadoOptions = Object.values(Status);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 h-64">
                <p className="text-2xl font-semibold text-indigo-600 animate-pulse">loading libros...</p>
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
        <div
            className=" bg-gray-200 bg-opacity-75 flex items-start justify-center p-4"

        >
            <div
                className="bg-white rounded-xl shadow-2xl transition-all transform duration-300 my-8 w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-extrabold text-indigo-700">
                        Crear libro
                    </h3>
                    <Link to='/admin'
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </Link>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit(handleForm)} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                        {/* Título */}
                        <div className='col-span-1 md:col-span-2 grid grid-cols-1 space-y-3'>
                            <label htmlFor="titulo" className='text-xl text-slate-700'>Título *</label>
                            <input
                                id="titulo"
                                type="text"
                                placeholder='Título del Libro'
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"

                                {...register('title', { required: 'El título es obligatorio.' })}
                            />
                            {errors.title && <MensajeError>{errors.title.message}</MensajeError>}
                        </div>

                        {/* Autor */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="autor" className='text-xl text-slate-700'>Autor *</label>
                            <input
                                id="autor"
                                type="text"
                                placeholder='Nombre del Autor'
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('author', { required: 'El autor es obligatorio.' })}
                            />
                            {errors.author && <MensajeError>{errors.author.message}</MensajeError>}
                        </div>

                        {/* Precio */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="precio" className='text-xl text-slate-700'>Precio *</label>
                            <input
                                id="precio"
                                type="number"
                                step="1"

                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('price', {
                                    required: 'El precio es obligatorio.',
                                    min: { value: 1, message: 'El precio debe ser mayor a 1.' }
                                })}
                            />
                            {errors.price && <MensajeError>{errors.price.message}</MensajeError>}
                        </div>

                        {/* ISBN */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="isbn" className='text-xl text-slate-700'>ISBN *</label>
                            <input
                                id="isbn"
                                type="text"
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('isbn', { required: 'El isbn es obligatorio.' })}

                            />
                            {errors.isbn && <MensajeError>{errors.isbn.message}</MensajeError>}

                        </div>
                        {/* Paginas */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="price" className='text-xl text-slate-700'>Páginas </label>
                            <input
                                id="price"
                                type="number"
                                step="1"

                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('pages', {
                                    min: { value: 1, message: 'Las páginas deben ser mayor a 1.' }
                                })}
                            />
                            {errors.pages && <MensajeError>{errors.pages.message}</MensajeError>}
                        </div>

                        {/* Estado */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="estado" className='text-xl text-slate-700'>Estado</label>
                            <select
                                id="estado"
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg"
                                {...register('state')}
                            >
                                {estadoOptions.map(state => (
                                    <option key={state} value={state}>{state.charAt(0).toUpperCase() + state.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        {/* Formato */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="formato" className='text-xl text-slate-700'>Formato</label>
                            <input
                                id="formato"
                                type="text"
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('format')}
                            />
                        </div>

                        {/* Encuadernacion */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="encuadernacion" className='text-xl text-slate-700'>Encuadernación</label>
                            <input
                                id="encuadernacion"
                                type="text"
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('bookBinding')}
                            />
                        </div>

                        {/* Especialidad */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="especialidad" className='text-xl text-slate-700'>Especialidad</label>
                            <input
                                id="especialidad"
                                type="text"
                                placeholder="Separar por comas"
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('especiality')}
                            />
                        </div>


                        {/* Campo de Carga de Imagen */}
                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 space-y-3">
                            <label htmlFor="imagenFile" className='text-xl text-slate-700'>
                                Subir Imagen *
                            </label>
                            <input
                                id="imagenFile"
                                type="file"
                                accept="image/*"

                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-slate-500 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"

                                {...register('image', {
                                    validate: () => imageFile !== null || 'La imagen es obligatoria'
                                })}
                                onChange={handleImageChange}
                            />
                            {errors.image && <MensajeError>{errors.image.message}</MensajeError>}
                            {imageFile && (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Vista previa"
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            )}
                        </div>

                        {/* Resumen */}
                        <div className='col-span-1 md:col-span-2 grid grid-cols-1 space-y-3'>
                            <label htmlFor="resumen" className='text-xl text-slate-700'>Resumen</label>
                            <textarea
                                id="resumen"
                                placeholder='Un breve resumen'
                                rows={2}
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('resume')}
                            />
                        </div>

                        {/* Descripción (Detalle) */}
                        <div className='col-span-1 md:col-span-2 grid grid-cols-1 space-y-3'>
                            <label htmlFor="descripcion" className='text-xl text-slate-700'>Descripción</label>
                            <textarea
                                id="descripcion"
                                placeholder='Una descripción completa del libro'
                                rows={3}
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('description')}
                            />
                        </div>

                    </div>

                    {/* Footer / Botones */}
                    <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                        <Link
                            to='/admin'
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="boton_principal"
                        >
                            Crear Libro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
