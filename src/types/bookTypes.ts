
export type Book = {
    id: number
    title: string,
    description: string,
    price: number,
    author: string,
    image: string,
    dateUpload: Date,
    format: string,
    bookBinding: string,
    isbn: string,
    resume: string,
    pages: number,
    especiality: string,
    state: Status
}


export enum Status {
    active = "activo",
    inactive = "inactivo"
}

export type BookCatalog = { books: Book[] }
export type bookResponse = { book: Book }

export type SimpleBookCard = Pick<Book, 'id' | 'title' | 'description' | 'image' | 'state'>

export type CatalogBookCard = Pick<Book, 'id' | 'title' | 'author' | 'image' | 'resume' | 'especiality'>

export type BookFormCreate = Omit<Book, 'id'>;
export type BookFormEdit = Omit<Book, 'imagen' | 'dateUpload'>;


export type BookUpdate = {
    id: number
    title?: string,
    description?: string,
    price?: number,
    author?: string,
    image?: string,
    dateUpload?: Date,
    format?: string,
    bookBinding?: string,
    isbn?: string,
    resume?: string,
    pages?: number,
    especiality?: string,
    state?: Status
}

export type Client = {
    id: number,
    name: string,
    phone: string,
    email: string,
    especiality: string,
}

export type ClienteForm = Client & {
    message?: string
}
