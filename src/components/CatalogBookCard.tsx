import { Link } from 'react-router-dom'

import type { CatalogBookCard } from '../utils/types'


export default function CatalogBookCard(libro: CatalogBookCard) {

    return (

        <Link to={`/catalogo/${libro.id}`} key={libro.id} className='px-4 shadow-xl'>
            <div className='group relative overflow-hidden cursor-pointer'>

                <img
                    src={libro.image}
                    alt={libro.title}
                    loading='lazy'
                    className='w-full h-auto object-cover aspect-[3/4] group-hover:scale-103 transition-transform duration-300 rounded-2xl my-3 ' />
                <h3 className='font-bold text-l mb-1'>{libro.title}</h3>
                <h4 className='mb-1 text-black/70'>{libro.author}</h4>

            </div>

        </Link>

    )
}
