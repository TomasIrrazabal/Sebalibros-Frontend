import api from "../config/axios";
import type { BookCatalog, Book, bookResponse } from "../utils/types";
import axios from 'axios';



export async function getCatalog(): Promise<BookCatalog> {
    try {
        const { data } = await api.get<BookCatalog>("/books");

        if (!data) throw new Error("Respuesta vacía del servidor");
        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const msg = error.response?.data?.error || "Error de red o servidor";
            throw new Error(msg);
        } else {
            throw new Error("Error desconocido al obtener el catálogo");
        }
    }
};

export async function getBookById(id: string): Promise<Book> {
    try {
        const { data } = await api.get<bookResponse>(`/books/${id}`);
        if (!data) throw new Error("Respuesta vacía del servidor");
        return data.book;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const msg = error.response?.data?.error || "Error de red o servidor";
            throw new Error(msg);
        } else {
            throw new Error("Error desconocido al obtener el Libro");
        }
    }
};


