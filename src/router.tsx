import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import IndexView from './view/IndexView'
import CatalogoView from './view/CatalogoView'
import LibroDetalleView from './view/DetailedBookView'
import ContactoView from './view/ContactView'
import TablaLibros from './components/BookTable'
import AdminLayout from './layout/AdminLayout'
import ModalEditarLibro from './components/ModalEditarLibro'
import ModalCrearLibro from './components/ModalCreateBook'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<IndexView />} />
                    <Route path='/catalogo' element={<CatalogoView />} />
                    <Route path='/catalogo/:id' element={<LibroDetalleView />} />
                    <Route path='/contacto' element={<ContactoView />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path='/admin' element={<TablaLibros />} />
                    <Route path='/admin/editarlibro/:id' element={<ModalEditarLibro />} />
                    <Route path='/admin/crearlibro' element={<ModalCrearLibro />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
