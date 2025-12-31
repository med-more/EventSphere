const EventCard = ({ event, onAddToCart }) => {
  return (
    <div className="group flex flex-col h-full bg-dark-grey border border-bright-orange/20 rounded-xl overflow-hidden hover:border-bright-orange transition-all duration-300">

            <div className="relative overflow-hidden aspect-video bg-dark-black">
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-bright-orange text-dark-black text-[10px] uppercase font-bold px-3 py-1 rounded-md">
                        {event.category}
                    </span>
                </div>
            </div>


            <div className="flex flex-col flex-grow p-4">
                <div className="flex-1 mb-4">
                    <h3 className="text-lg font-bold text-light-beige group-hover:text-bright-orange transition-colors line-clamp-1 mb-2">
                        {event.name}
                    </h3>
                    <p className="text-light-beige/60 text-sm line-clamp-2">
                        {event.description}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dark-grey">
                    <div>
                        <span className="text-2xl font-bold text-bright-orange">
                            {event.price} DH
                        </span>
                    </div>

                    <button
                        onClick={() => onAddToCart(event)}
                        className="bg-bright-orange hover:bg-bright-orange/90 text-dark-black font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                        title="Ajouter au panier"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm">Ajouter</span>
                    </button>
                </div>
            </div>
        </div>
  )
}

export default EventCard