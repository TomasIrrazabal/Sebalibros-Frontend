import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'sonner';


import api from '../config/axios';
import axios from 'axios';
import { publicUrl } from '../utils';
import { Status, type SimpleBookCard } from '../types/bookTypes';
import BookCard from '../components/BookCard';



export default function InicioView() {
    const [books, setBooks] = useState<SimpleBookCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);




    useEffect(() => {
        const fetchLibros = async () => {
            try {
                setLoading(true)
                const { data } = await api.get('/books')


                if (!data) {
                    throw new Error("No se pudo obtener la informacion desde el servidor.")
                }

                const auxBooks: SimpleBookCard[] = data.books

                setBooks(auxBooks)


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
            <>
                {toast.error(`Error de carga` + `\nerror`)}
            </>
            // <div className="p-8">
            //     <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            //         <p className="font-bold">Error de Carga</p>
            //         <p>{error}</p>
            //     </div>
            // </div>
        )
    }

    return (
        <div className='contenedor'>
            <main className='bg-gray-50 '>
                <div className='bg-[url("/hero.png")] min-h-[60vh] flex flex-col items-center justify-start text-center bg-cover bg-center bg-no-repeat'>
                    <h1 className='font-bold text-6xl text-white mt-15 '>Libros de Veterinaria</h1>
                    <p className='text-2xl text-white'>Encuentra los mejores libros para profesionales de la veterinaria</p>
                    <a href='#catalog' className='m-15 boton_principal'>Ver Libros</a>
                </div>

                <section className='flex flex-col items-center justify-center text-start border-b border-b-black/20 border-t-solid shadow-t-2xl shadow-t-black shadow-t-md contenedor  h-40'>
                    <div>
                        <h2 className='font-bold mt-4 text-2xl text-center'>Contactanos</h2>
                        <p className='mb-1 text-black/90 text-center'>Si buscas asesoría no dudes en contactarnos. Puedes enviar tu consulta a travez de
                            <Link to='#' className='font-bold underline text-(--color-violeta-secundario)' > What's App</Link> o llamarnos al <Link to='#' className='font-bold underline text-(--color-violeta-secundario)'>+1-2345-6789</Link>
                        </p>
                    </div>
                </section>

                <div className='flex flex-col items-center text-start' id='catalog'>
                    <h2 className='font-bold mt-4 text-2xl'>Nuestros Libros Más Populares</h2>
                    <p className='mb-1 text-black/70'>Explora nuestra colección repleta de textos esenciales</p>
                    <section >
                        <div className='md:grid md:grid-cols-3 mb-4 '>
                            {
                                books.map((libro) => {
                                    if (libro.state === Status.active) {
                                        const bucket = import.meta.env.VITE_SUPABASE_BUCKET ?? 'imagenes-libros'
                                        const url = publicUrl(bucket, libro.image as string)
                                        return (<BookCard
                                            key={libro.id}
                                            id={libro.id}
                                            title={libro.title}
                                            description={libro.description}
                                            image={url}
                                            state={libro.state}
                                        />
                                        )
                                    }
                                })
                            }
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
