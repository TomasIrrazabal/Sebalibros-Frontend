import type { SimpleBookCard } from "../types/bookTypes"

export default function BookCard({ title, description, image }: SimpleBookCard) {
    return (
        <div className="group">
            <div className="overflow-hidden rounded-xl flex justify-center">

                {image && (
                    <img
                        src={image}
                        alt={`Portada de ${image}`}
                        loading="lazy"
                        className="w-[90%] h-auto object-cover aspect-[3/4] group-hover:scale-103 transition-transform duration-300 rounded-2xl my-3"
                    />
                )}
            </div>
            <div className="mt-4 mx-2 text-start mb-2">
                <h3 className="text-lg font-bold text-[#191022] px-6 md:px-4">{title}</h3>
                <p className="mt-1 text-sm text-[#191022]/70 px-6 md:px-4">{description}</p>
            </div>

        </div>
    )
}
