import { useState, useEffect } from 'react'
import CatalogBookCard from '../components/CatalogBookCard';
import { type BookCatalog, type Book, Status } from '../utils/types';
import { publicUrl } from '../utils';
import { getCatalog } from '../services/LibroServices';




export default function CatalogoView() {
    const [Books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchCatalogo = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await getCatalog();
                if (!data) {
                    throw new Error("No se pudo obtener la informacion desde el servidor.")
                }

                const catalog: BookCatalog = data

                setBooks(catalog.books)


            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Error desconocido')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCatalogo()
    }, [])



    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 h-64">
                <p className="text-2xl font-semibold text-indigo-600 animate-pulse">
                    Cargando libros...
                </p>
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
            <main className='contenedor'>
                <div className='flex flex-col items-center justify-start text-center mb-4 '>
                    <h1 className='font-bold text-6xl text-black mt-15 mb-4 '>Catálogo</h1>
                    <p className='text-2xl text-black'>Explora nuestra selección de libros</p>

                </div>

                <div className='grid md:grid-cols-3 gap-1 pb-8'>
                    {
                        Books.map((book) => {
                            const bucket = import.meta.env.VITE_SUPABASE_BUCKET ?? 'imagenes-libros'
                            const url = publicUrl(bucket, book.image as string)
                            if (book.state === Status.active)
                                return (
                                    <CatalogBookCard
                                        key={book.id}
                                        id={book.id}
                                        title={book.title}
                                        author={book.author}
                                        image={url}
                                        resume={book.resume}
                                        especiality={book.especiality}
                                    />
                                )
                        })
                    }
                </div>
            </main>
        </>
    )
}
