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
import ApiDocs from './view/ApiDocs'
import UpdateAcount from './components/UpdateAcount'
import UsersTable from './components/UsersTable'
import ModalUpdateAcount from './components/ModalUpdateAcount'
import UpdatePassword from './components/UpdatePassword'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<AppLayout />}>
                    <Route index={true} element={<IndexView />} />
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

                    <Route path='/updateacount' element={<UpdateAcount />} />
                    <Route path='/updatepassword' element={<UpdatePassword />} />

                    <Route path='/admin/users' element={<UsersTable />} />
                    <Route path='/admin/edituser/:id' element={<ModalUpdateAcount />} />

                    <Route path='/docs' element={<ApiDocs />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
