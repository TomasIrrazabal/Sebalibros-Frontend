import { Link, Outlet } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Toaster } from 'sonner'

export default function AppLayout() {
    return (
        <>
            <div className='flex flex-col min-h-screen'>

                <header className='sticky top-0' >
                    <NavBar />
                </header>

                <div className='flex-grow'>
                    <Outlet />

                </div>



                <footer className=' bg-(--color-violeta-principal) py-2 text-white '>
                    <div className='md:grid md:grid-cols-2 mt-4'>
                        <ul className='flex justify-between flex-col items-center  '>
                            <Link to='/' className='text-center rounded-sm hover:bg-white hover:text-black hover:font-bold w-24'>
                                Inicio
                            </Link>
                            <Link to='/catalog' className='text-center rounded-sm hover:bg-white hover:text-black hover:font-bold w-24 '>
                                Catálogo
                            </Link>

                        </ul>
                        <div className='text-center mt-8  '>
                            <a className='items-center' href="https://www.instagram.com/seba.libros"><i className='fab fa-instagram'></i></a>
                        </div>
                    </div>
                    <h4 className='text-center text-base mt-2 '>Derechos reservados <i className='text-xl font-bold'>Sebastian Irrazabal</i></h4>
                </footer>
            </div>
            <Toaster position="top-right" />

        </>
    )
}
