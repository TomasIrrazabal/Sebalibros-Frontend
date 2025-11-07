import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import IndexView from './view/IndexView'
import CatalogView from './view/CatalogView'
import DetailedBookView from './view/DetailedBookView'
import BooksTable from './components/BookTable'
import AdminLayout from './layout/AdminLayout'
import ModalEditBook from './components/ModalEditBook'
import ModalCreateBook from './components/ModalCreateBook'
import AuthLayout from './layout/AuthLayout'
import LoginView from './view/LoginView'
import CreateUserCard from './components/CreateUserCard'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<IndexView />} />
                    <Route path='/catalog' element={<CatalogView />} />
                    <Route path='/catalog/:id' element={<DetailedBookView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/login' element={<LoginView />} />
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path='/admin' element={<BooksTable />} />
                    <Route path='/admin/editbook/:id' element={<ModalEditBook />} />
                    <Route path='/admin/createbook' element={<ModalCreateBook />} />
                    <Route path='/admin/createuser' element={<CreateUserCard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
