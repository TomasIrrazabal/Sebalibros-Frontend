import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { logout } from '../api/SebaLibrosAPI'

type Menu = {
  label: string;
  items?: { label: string; to: string }[];
  to?: string; // por si también querés que el padre sea clickeable
};





export function NavBar() {

  const [open, setOpen] = useState<string | null>(null)
  const [alignRight, setAlignRight] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const dropdownRefs = useRef<Record<string, HTMLUListElement | null>>({})
  const navigate = useNavigate()

  const MenusIndex: Menu[] = [
    {
      label: 'Inicio',
      to: '/'
    },
    {
      label: 'Catálogo',
      to: '/catalog'
    }
  ]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null)
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(null)
    }
    function onResize() {
      if (!open) return
      const id = `menu-${open.replace(/\s+/g, '-')}`
      const el = dropdownRefs.current[id]
      if (el) {
        const rect = el.getBoundingClientRect()
        setAlignRight(rect.right > window.innerWidth)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <div className='bg-gray-50 md:flex md:justify-between mb-1 md:mb-0 '>

      <Link to='/' className=' flex items-center flex-col p-1 md:flex-row md:gap-2'>
        <img
          src="/SebaLibros Logotipo.png" alt="Logotipo SebaLibros"
          className='max-w-2xs w-auto md:w-auto md:h-12 md:gap'
        />
        <span className='text-4xl font-bold text-(--color-violeta-principal) md:text-xl'>Seba Libros</span>
      </Link>
      <ul className='flex justify-between flex-col items-center md:flex-row *:mx-0.5'>

        {/* Menús */}
        {MenusIndex.map((menu) => {
          const isOpen = open === menu.label
          const menuId = `menu-${menu.label.replace(/\s+/g, '-')}`
          return (
            <li key={menu.label} className="relative" role="none">
              {/* Botón/Link padre */}
              {menu.items ? (
                <button
                  type='button'
                  className='text-center rounded-sm w-auto min-w-15 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white '
                  aria-haspopup='menu'
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  onClick={(e) => {
                    const next = isOpen ? null : menu.label
                    setOpen(next)
                    const triggerRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                    const minWidth = 192 // Tailwind min-w-48
                    setAlignRight(triggerRect.left + minWidth > window.innerWidth)
                  }}
                  onKeyDown={(e) => { if (e.key === 'Escape') setOpen(null) }}
                >
                  {menu.label}
                </button>
              ) : menu.to ? (
                <Link
                  to={menu.to}
                  className='text-center rounded-sm w-auto min-w-15 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white '
                  onClick={() => setOpen(null)}
                >
                  {menu.label}
                </Link>
              ) : (
                <span className='text-center rounded-sm w-auto min-w-15 md:p-2'>{menu.label}</span>
              )}

              {/* Dropdown por click */}
              {menu.items && (
                <ul
                  id={menuId}
                  ref={(el) => { dropdownRefs.current[menuId] = el }}
                  role="menu"
                  className={`absolute ${alignRight ? 'right-0' : 'left-0'} mt-1 ${isOpen ? 'block' : 'hidden'} min-w-48 rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg z-50 p-1 space-y-1`}
                >
                  {menu.items.map((item) => (
                    <li key={item.to} role="none">
                      <Link
                        to={item.to}
                        role="menuitem"
                        className='block w-full whitespace-nowrap rounded-sm px-4 py-2 text-left hover:bg-(--color-violeta-principal) hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-violeta-principal)'
                        tabIndex={0}
                        onClick={async (e) => {
                          if (item.to.endsWith('/cerrarsesion')) {
                            e.preventDefault()
                            try {
                              await logout()
                            } finally {
                              setOpen(null)
                              navigate('/')
                            }
                          } else {
                            setOpen(null)
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
        <Link to='/login' className='text-center rounded-sm w-10 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white '>
          <i className="fa-solid fa-user hover:text-white"></i>
        </Link>
      </ul>

    </div>
  )
}






export function NavBarAdmin() {
  const [open, setOpen] = useState<string | null>(null)
  const [alignRight, setAlignRight] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const dropdownRefs = useRef<Record<string, HTMLUListElement | null>>({})
  const navigate = useNavigate()

  const MenusAdmin: Menu[] = [
    {
      label: 'Inicio',
      to: '/'
    },
    {
      label: 'Catálogo',
      to: '/catalog'
    },
    {
      label: 'Libros',
      to: '/admin'
    },
    {
      label: 'Usuarios',
      items: [
        { label: 'Crear Usuario', to: '/admin/createuser' },
        { label: 'Cerrar Sesion', to: '/admin/cerrarsesion' }
      ]
    },

  ]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null)
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(null)
    }
    function onResize() {
      if (!open) return
      const id = `menu-${open.replace(/\s+/g, '-')}`
      const el = dropdownRefs.current[id]
      if (el) {
        const rect = el.getBoundingClientRect()
        setAlignRight(rect.right > window.innerWidth)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
      window.removeEventListener('resize', onResize)
    }
  }, [open])
  return (
    <div ref={navRef} className='bg-gray-50 md:flex md:justify-between mb-1 md:mb-0 pr-4 md:pr-8'>

      <Link to='/' className=' flex items-center flex-col p-1 md:flex-row md:gap-2'>
        <img
          src="/SebaLibros Logotipo.png" alt="Logotipo SebaLibros"
          className='max-w-2xs w-auto md:w-auto md:h-12 md:gap'
        />
        <span className='text-4xl font-bold text-(--color-violeta-principal) md:text-xl'>Seba Libros <h2>Administración</h2></span>
      </Link>


      <ul className='flex justify-between flex-col items-center md:flex-row *:mx-0.5'>

        {/* <Link to='/' className='text-center rounded-sm w-24 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white hover:font-bold'>
          Inicio
        </Link>

        <Link to='/catalog' className='text-center rounded-sm w-24 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white hover:font-bold'>
          Catálogo
        </Link>

        <Link to='/admin/createuser' className='text-center rounded-sm w-24 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white hover:font-bold'>
          Crear Usuario
        </Link>

        <Link to='/admin' className='text-center rounded-sm w-10 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white '>
          <i className="fa-solid fa-user hover:text-white"></i>
        </Link> */}

        {/* Menús */}
        {MenusAdmin.map((menu) => {
          const isOpen = open === menu.label
          const menuId = `menu-${menu.label.replace(/\s+/g, '-')}`
          return (
            <li key={menu.label} className="relative" role="none">
              {/* Botón/Link padre */}
              {menu.items ? (
                <button
                  type='button'
                  className='text-center rounded-sm w-auto min-w-15 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white '
                  aria-haspopup='menu'
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  onClick={(e) => {
                    const next = isOpen ? null : menu.label
                    setOpen(next)
                    const triggerRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                    const minWidth = 192 // Tailwind min-w-48
                    setAlignRight(triggerRect.left + minWidth > window.innerWidth)
                  }}
                  onKeyDown={(e) => { if (e.key === 'Escape') setOpen(null) }}
                >
                  {menu.label}
                </button>
              ) : menu.to ? (
                <Link
                  to={menu.to}
                  className='text-center rounded-sm w-auto min-w-15 md:p-2 hover:bg-(--color-violeta-principal) hover:text-white hover:border-white '
                  onClick={() => setOpen(null)}
                >
                  {menu.label}
                </Link>
              ) : (
                <span className='text-center rounded-sm w-auto min-w-15 md:p-2'>{menu.label}</span>
              )}

              {/* Dropdown por click */}
              {menu.items && (
                <ul
                  id={menuId}
                  ref={(el) => { dropdownRefs.current[menuId] = el }}
                  role="menu"
                  className={`absolute ${alignRight ? 'right-0' : 'left-0'} mt-1 ${isOpen ? 'block' : 'hidden'} min-w-48 rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg z-50 p-1 space-y-1`}
                >
                  {menu.items.map((item) => (
                    <li key={item.to} role="none">
                      <Link
                        to={item.to}
                        role="menuitem"
                        className='block w-full whitespace-nowrap rounded-sm px-4 py-2 text-left hover:bg-(--color-violeta-principal) hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-violeta-principal)'
                        tabIndex={0}
                        onClick={async (e) => {
                          if (item.to.endsWith('/cerrarsesion')) {
                            e.preventDefault()
                            try {
                              await logout()
                            } finally {
                              setOpen(null)
                              navigate('/')
                            }
                          } else {
                            setOpen(null)
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>

    </div>
  )
}
