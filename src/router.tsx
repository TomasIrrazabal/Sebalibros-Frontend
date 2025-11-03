import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import IndexView from './view/IndexView'
import CatalogoView from './view/CatalogoView'
import DetailedBookView from './view/DetailedBookView'
import ContactView from './view/ContactView'
import BooksTable from './components/BookTable'
import AdminLayout from './layout/AdminLayout'
import ModalEditBook from './components/ModalEditBook'
import ModalCreateBook from './components/ModalCreateBook'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<IndexView />} />
                    <Route path='/catalogo' element={<CatalogoView />} />
                    <Route path='/catalogo/:id' element={<DetailedBookView />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path='/admin' element={<BooksTable />} />
                    <Route path='/admin/editarlibro/:id' element={<ModalEditBook />} />
                    <Route path='/admin/crearlibro' element={<ModalCreateBook />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
