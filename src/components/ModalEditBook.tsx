import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Status, type BookFormEdit } from '../utils/types';
import MensajeError from './MessageError';
import api from '../config/axios';
import { getBookById } from '../services/LibroServices';
import { getDifferences, publicUrl } from '../utils';


const initialValues: BookFormEdit = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    author: '',
    image: '', //?
    format: '', // ?
    bookBinding: '', // ?
    isbn: '',
    resume: '', // ?
    especiality: '', // ?
    state: Status.inactive,
    pages: 1
}

export default function ModalEditBook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<BookFormEdit>(initialValues)
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [urlImagen, setUrlImagen] = useState<string | null>(null)
    const [showUrlImagen, setShowUrlImagen] = useState(true);

    const { register, reset, handleSubmit, formState: { errors } } = useForm<BookFormEdit>({ defaultValues: initialValues })


    const inputFileRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const bucket = import.meta.env.VITE_SUPABASE_BUCKET ?? 'imagenes-libros'


    const { id } = useParams()

    useEffect(() => {

        const fetchLibros = async () => {
            setLoading(true)
            try {
                if (!id) {
                    throw new Error("No hay un identificador cargado.")
                }

                const data = await getBookById(id)

                if (!data) {
                    throw new Error("No se pudo obtener la informacion desde el servidor.")
                }

                const urlAux = publicUrl(bucket, data.image as string)
                setUrlImagen(urlAux)
                setBook(data)
                reset(data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data.error)
                } else {
                    setError('Error desconocido')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchLibros()

    }, [id, reset]);



    const handleForm = async (data: BookFormEdit) => {
        setLoading(true);
        setError(null);

        try {

            const updatedData = getDifferences(book, data);

            const hasFieldChanges = Object.keys(updatedData).length > 0;
            const hasNewImage = imageFile !== null;


            if (!hasFieldChanges && !hasNewImage) {
                window.alert("No se detectó ningún cambio en el formulario.");
                return;
            }


            const formData = new FormData();


            formData.append('id', String(book.id));


            for (const [key, value] of Object.entries(updatedData)) {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            }


            if (hasNewImage && imageFile) {
                formData.append('image', imageFile);
            }



            await api.patch('/admin/book', formData)


            if (hasNewImage) {

                await api.delete('/image', { data: { filePath: book.image } });
            }

            navigate('/admin');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.error || 'Error en la solicitud');
            } else {
                setError('An unknown error has occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setShowUrlImagen(false);
        } else {
            setImageFile(null);
            setShowUrlImagen(true);
        }
    };

    const estadoOptions = Object.values(Status);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 h-64">
                <p className="text-2xl font-semibold text-indigo-600 animate-pulse">Cargando libros...</p>
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
                        {`Modificar libro: ${book.title}`}
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
                            <label htmlFor="title" className='text-xl text-slate-700'>Título *</label>
                            <input
                                id="title"
                                type="text"
                                placeholder='Título del Libro'
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                // value={book.title}
                                {...register('title', { required: 'El título es obligatorio.' })}
                            />
                            {errors.title && <MensajeError>{errors.title.message}</MensajeError>}
                        </div>

                        {/* Autor */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="author" className='text-xl text-slate-700'>Autor *</label>
                            <input
                                id="author"
                                type="text"
                                placeholder='Nombre del Autor'
                                // value={book.author}
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('author', { required: 'El autor es obligatorio.' })}
                            />
                            {errors.author && <MensajeError>{errors.author.message}</MensajeError>}
                        </div>

                        {/* Precio */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="price" className='text-xl text-slate-700'>Precio *</label>
                            <input
                                id="price"
                                type="number"
                                step="1"
                                // value={book.price}
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
                                // value={book.isbn}
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
                            <label htmlFor="state" className='text-xl text-slate-700'>Estado</label>
                            <select
                                id="state"
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg"
                                // value={book.state}
                                {...register('state')}
                            >
                                {estadoOptions.map(state => (
                                    <option key={state} value={state}>{state.charAt(0).toUpperCase() + state.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        {/* Formato */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="format" className='text-xl text-slate-700'>Formato</label>
                            <input
                                id="format"
                                type="text"
                                // value={book.format}
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('format')}
                            />
                        </div>

                        {/* Encuadernacion */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="bookBinding" className='text-xl text-slate-700'>Encuadernación</label>
                            <input
                                id="bookBinding"
                                type="text"
                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('bookBinding')}
                            />
                        </div>

                        {/* Especialidad */}
                        <div className='grid grid-cols-1 space-y-3'>
                            <label htmlFor="especiality" className='text-xl text-slate-700'>Especialidad</label>
                            <input
                                id="especiality"
                                type="text"
                                placeholder="Separar por comas"
                                // value={book.especiality}

                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('especiality')}
                            />
                        </div>


                        {/* Campo de Carga de Imagen */}
                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 space-y-3">
                            <label htmlFor="imageFile" className='text-xl text-slate-700'>
                                Subir Imagen
                            </label>
                            <input
                                ref={inputFileRef}
                                id="imageFile"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-slate-500 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            {urlImagen && !imageFile && (
                                <img
                                    src={urlImagen} // <-- Previsualización
                                    alt="Vista previa"
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            )}
                            {imageFile && (
                                <>
                                    <div className="relative inline-block w-20 h-20">
                                        <img
                                            src={URL.createObjectURL(imageFile)}
                                            alt="Vista previa"
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFile(null)
                                                if (inputFileRef.current) {
                                                    inputFileRef.current.value = "";
                                                }
                                            }}
                                            className="
                                                absolute top-0 right-0 
                                                bg-red-500 text-white rounded-full 
                                                w-6 h-6 flex items-center justify-center 
                                                shadow hover:bg-red-700 transition-all
                                                text-xs font-bold
                                                "
                                            aria-label="Eliminar imagen"
                                            title="Eliminar imagen"
                                        >
                                            &#10005;
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Resumen */}
                        <div className='col-span-1 md:col-span-2 grid grid-cols-1 space-y-3'>
                            <label htmlFor="resume" className='text-xl text-slate-700'>Resumen</label>
                            <textarea
                                id="resume"
                                placeholder='Un breve resumen'
                                rows={2}
                                // value={book.resume}

                                className="bg-slate-100 border border-slate-500 p-3 rounded-lg placeholder-slate-400"
                                {...register('resume')}
                            />
                        </div>

                        {/* Descripción (Detalle) */}
                        <div className='col-span-1 md:col-span-2 grid grid-cols-1 space-y-3'>
                            <label htmlFor="description" className='text-xl text-slate-700'>Descripción</label>
                            <textarea
                                id="description"
                                placeholder='Una descripción completa del libro'
                                rows={3}
                                // value={book.description}

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
                            Modificar Libro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
