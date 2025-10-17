import { Link, Outlet } from 'react-router-dom'

export default function AppLayout() {
    return (
        <>
            <div className='flex flex-col min-h-screen'>

                <header>
                    <div className='bg-gray-50 md:flex md:justify-between mb-1 md:mb-0'>

                        <Link to='/' className=' flex items-center flex-col p-1 md:flex-row md:gap-2'>
                            <img
                                src="/SebaLibros Logotipo.png" alt="Logotipo SebaLibros"
                                className='max-w-2xs w-auto md:w-auto md:h-12 md:gap'
                            />
                            <span className='text-4xl font-bold text-(--color-violeta-principal) md:text-xl'>Seba Libros</span>
                        </Link>
                        <ul className='flex justify-between flex-col items-center md:flex-row *:mx-0.5'>

                            <Link to='/' className='text-center rounded-sm w-24 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white hover:font-bold'>
                                Inicio
                            </Link>

                            <Link to='/catalogo' className='text-center rounded-sm w-24 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white hover:font-bold'>
                                Catálogo
                            </Link>

                            <Link to='/contacto' className='text-center rounded-sm w-24 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white hover:font-bold'>
                                Contacto
                            </Link>

                            <Link to='/admin' className='text-center rounded-sm w-10 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white '>
                                <i className="fa-solid fa-user hover:text-white"></i>
                            </Link>
                        </ul>
                    </div>
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
                            <Link to='/catalogo' className='text-center rounded-sm hover:bg-white hover:text-black hover:font-bold w-24 '>
                                Catálogo
                            </Link>
                            <Link to='/contacto' className='text-center rounded-sm hover:bg-white  hover:text-black hover:font-bold w-24'>
                                Contacto
                            </Link>
                        </ul>
                        <div className='text-center mt-8  '>
                            <a className='items-center' href="https://www.instagram.com/seba.libros"><i className='fab fa-instagram'></i></a>
                        </div>
                    </div>
                    <h4 className='text-center text-base mt-2 '>Derechos reservados <i className='text-xl font-bold'>Sebastian Irrazabal</i></h4>
                </footer>
            </div>

        </>
    )
}
