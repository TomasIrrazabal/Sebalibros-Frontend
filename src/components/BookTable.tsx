import { useState, useEffect, useMemo } from 'react'
import type { BookCatalog, Book } from '../utils/types';
import { getCatalog } from '../services/LibroServices';
import { Link } from 'react-router-dom';
import { DialogConfirm } from './DialogConfirm';
import api from '../config/axios';


// Componente Badge (sin cambios)
const StatusBadge = ({ status }: { status: string }) => {
    const isActivo = status?.toLowerCase() === 'activo';
    const classes = isActivo
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800';

    return (
        <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}
        >
            {status}
        </span>
    );
}


export default function BookTable() {
    // ESTADO BASE DE DATOS (Lista inmutable que contiene todos los libros)
    const [books, setbooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showDialog, setShowDialog] = useState(false)
    const [selectedBook, setSelectedBook] = useState<Book['id'] | null>(null)
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCatalog()
    }, [])
    const fetchCatalog = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getCatalog();

            if (data && data.books) {
                setbooks(data.books);
            } else {
                setbooks((data as BookCatalog)?.books || []);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Error desconocido al cargar los libros')
            }
        } finally {
            setLoading(false)
        }
    }

    const filteredLibros = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        if (!term) {
            return books;
        }

        return books.filter(book => {
            // 1. Filtro por ID (convertido a string para la búsqueda)
            const idMatch = String(book.id).includes(term);

            // 2. Filtro por Título
            const tituloMatch = book.title.toLowerCase().includes(term);

            // 3. Filtro por Autor
            const autorMatch = book.author.toLowerCase().includes(term);

            return idMatch || tituloMatch || autorMatch;
        });

    }, [books, searchTerm]); // Se recalcula cuando la lista original o el término cambian

    const handleDialog = (id?: number) => {
        if (id) {
            setShowDialog(true)
            setSelectedBook(id)
        } else {
            setShowDialog(false)
            setSelectedBook(0)
        }
    }


    const handleDelete = async (id: number) => {
        try {
            const response = await api.delete(`/book/admin/book/${id}`)

            if (response.status === 204) {
                fetchCatalog()
                handleDialog()
            } else {
                // Manejo de error, por ejemplo:
                console.error('No se pudo borrar el registro', response);
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }


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
        <div className="p-2  bg-gray-50 min-h-screen">

            <div className="mb-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Gestión de Libros</h2>
                    <Link
                        to='/admin/crearlibro'
                        className="boton_principal"
                    >
                        + Nuevo Libro
                    </Link>
                </div>

                {/* Campo de búsqueda: Ahora busca en ID, Título y Autor */}
                <input
                    type="text"
                    placeholder={`Buscar entre ${books.length} libros (ID, Título o Autor)...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                />
            </div>

            {/* 2. TABLA / GRILLA RESPONSIVA */}
            <section className="mt-8 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow-2xl overflow-hidden border border-gray-200 sm:rounded-xl">
                            <table className="min-w-full divide-y divide-gray-200">

                                {/* <thead>: Ajustada para móvil */}
                                <thead className="bg-gray-100 hidden md:table-header-group">
                                    <tr>
                                        {/* ID: Visible en móvil y desktop */}
                                        <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                                        {/* ISBN: Visible en móvil y desktop (oculto en pantallas xs) */}
                                        <th className="px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:table-cell">ISBN</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Título</th>
                                        {/* Autor y Estado: Oculto en móvil, visible en sm+ */}
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Autor</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Estado</th>
                                        <th className="relative px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Iteramos sobre la lista FILTRADA: filteredLibros */}
                                    {filteredLibros.map((book) => (
                                        <tr
                                            key={book.id}
                                            className="block md:table-row hover:bg-indigo-50/50 transition duration-150 ease-in-out border-b md:border-none p-4 md:p-0"
                                        >
                                            {/* ID: VISIBLE EN MÓVIL Y DESKTOP */}
                                            <td className="block md:table-cell px-3 py-2 md:px-6 md:py-4 text-left text-xs font-bold text-gray-900">
                                                <span className="md:hidden text-xs text-gray-500 uppercase font-medium block">ID:</span>
                                                {book.id}
                                            </td>

                                            {/* ISBN: VISIBLE EN SM+ y ajustado para el layout móvil */}
                                            <td className="block sm:table-cell px-3 py-2 md:px-6 md:py-4 text-left text-xs text-gray-500">
                                                <span className="sm:hidden text-xs text-gray-500 uppercase font-medium block">ISBN:</span>
                                                {book.isbn}
                                            </td>

                                            {/* Título: Visible en móvil y desktop */}
                                            <td className="block md:table-cell px-2 py-2 md:px-6 md:py-4 text-left text-gray-900 font-bold md:font-semibold">
                                                <span className="md:hidden text-xs text-gray-500 uppercase font-medium block">Título:</span>
                                                {book.title}
                                            </td>

                                            {/* Autor: Oculto en móvil, visible en sm+ */}
                                            <td className=" sm:table-cell px-2 py-1 md:px-6 md:py-4 text-left text-sm text-gray-500">
                                                {book.author}
                                            </td>

                                            {/* Estado: Oculto en móvil, visible en sm+ */}
                                            <td className=" sm:table-cell px-2 py-1 md:px-6 md:py-4 text-left text-sm">
                                                <div className="md:inline-block">
                                                    <StatusBadge status={book.state} />
                                                </div>
                                            </td>

                                            {/* Acciones (Ajustado para mejor móvil) */}
                                            <td className="block md:table-cell px-2 pt-3 pb-2 md:px-6 md:py-4 text-center text-sm font-medium">
                                                <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
                                                    <Link
                                                        className="w-full md:w-auto text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out border border-indigo-200 py-1 px-3 rounded-md"
                                                        to={`/admin/editarlibro/${book.id}`}
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        className="w-full md:w-auto text-red-600 hover:text-red-900 font-medium transition duration-150 ease-in-out border border-red-200 py-1 px-3 rounded-md"
                                                        onClick={() => handleDialog(book.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Mensaje cuando no hay resultados de búsqueda */}
                                    {books.length > 0 && filteredLibros.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-lg">
                                                No se encontraron libros que coincidan con "{searchTerm}".
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {showDialog && selectedBook !== null && (
                <DialogConfirm
                    onCancel={() => handleDialog()}
                    onConfirm={() => handleDelete(selectedBook)}
                    message={`¿Seguro que deseas eliminar el libro con ID ${selectedBook}?`}
                />
            )}
        </div>
    )
}