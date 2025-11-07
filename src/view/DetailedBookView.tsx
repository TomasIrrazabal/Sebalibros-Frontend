import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { type Book } from '../types/bookTypes';
import axios from 'axios';
import { publicUrl } from '../utils';
import { getBookById } from '../services/LibroServices';

export default function DetailedBookView() {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState<string>('')

    const { id } = useParams();
    const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET ?? 'imagenes-libros'


    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            try {
                if (!id) {
                    throw new Error("No hay un identificador cargado.")
                }

                const data = await getBookById(id)

                if (!data) {
                    throw new Error("No se pudo obtener la informacion desde el servidor.")
                }


                if (!id) {
                    throw new Error('Error, no se encontro el libro')
                }
                const urlAux = publicUrl(BUCKET, data.image as string)
                setUrl(urlAux)
                setBook(data)

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

        fetchBooks()
    }, [])


    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 h-64">
                <p className="text-2xl font-semibold text-indigo-600 animate-pulse">Cargando...</p>
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
        <>
            <div className='flex flex-col justify-start contenedor'>

                <div className='mt-8 mb-6'>
                    <Link className="text-primary/80 hover:text-(--color-violeta-secundario) hover:underline " to="/catalogo">Catálogo</Link>
                    <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
                    <span className="text-gray-900">{book?.title}</span>

                </div>

                <main className='flex flex-col items-center text-start md:grid md:grid-cols-2 md:gap-x-4 mt-6
                    mb-12'>
                    <div className='flex justify-center w-full'>
                        {url && (
                            <img src={url} alt={`Titulo de: ${book?.title}`}
                                className='w-full max-w-100 h-auto  aspect-[1/1] rounded-2xl my-3' />

                        )}

                    </div>
                    <div className='my-4'>
                        <h1 className='font-bold text-3xl mb-1 text-black'>{book?.title}</h1>
                        <h2 className='text-sm text-(--color-violeta-principal) mb-4'>{book?.author}</h2>

                        <p className='text-black/70 mb-6'>{book?.description}</p>
                        <h2 className='font-bold text-2xl '>{`$${book?.price}.00`}</h2>

                    </div>
                </main >
            </div >
        </>
    )
}
