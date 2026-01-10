import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvents, getCategories } from '../api/axios';
import StatsCounter from '../components/StatsCounter';
import Testimonials from '../components/Testimonials';

const categoryIcons = {
    "Musique": (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
    ),
    "Art": (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    ),
    "Spectacle": (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    "Football": (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};
const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, categoriesRes] = await Promise.all([
                    getEvents(),
                    getCategories()
                ]);
                setFeaturedEvents(eventsRes.data.slice(0, 3));
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

  return (
    <div className="min-h-screen">

            <section className="relative py-32 px-4 overflow-hidden min-h-[600px] flex items-center">

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
                

                <div className="absolute inset-0 bg-dark-black/60 z-[1]"></div>
                

                <div className="absolute inset-0 opacity-20 z-[1]">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-bright-orange rounded-full filter blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-bright-orange rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-block mb-6">
                        <span className="bg-bright-orange/20 text-bright-orange px-4 py-2 rounded-full text-sm font-semibold border border-bright-orange/30">
                            🎫 Plateforme de Réservation d'Événements
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up text-light-beige leading-tight">
                        Bienvenue sur <span className="text-bright-orange">EventSphere</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-light-beige/80 mb-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Découvrez les événements les plus extraordinaires et réservez vos tickets en quelques clics
                    </p>
                    <p className="text-lg text-light-beige/60 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        Des concerts aux spectacles, des expositions aux matchs de football - trouvez votre prochain événement inoubliable
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Link
                            to="/events"
                            className="btn-primary text-lg px-8 py-4"
                        >
                            Explorer les événements
                        </Link>
                        <Link
                            to="/contact"
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </section>



            <StatsCounter />


            <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-4">
                        Pourquoi choisir <span className="text-bright-orange">EventSphere</span> ?
                    </h2>
                    <p className="text-light-beige/70 text-lg max-w-2xl mx-auto">
                        La plateforme de référence pour tous vos événements
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-8 hover:border-bright-orange transition-all">
                        <div className="w-16 h-16 bg-bright-orange/20 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-light-beige mb-3">Réservation Sécurisée</h3>
                        <p className="text-light-beige/70">
                            Paiement sécurisé et confirmation instantanée de vos billets
                        </p>
                    </div>
                    <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-8 hover:border-bright-orange transition-all">
                        <div className="w-16 h-16 bg-bright-orange/20 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-light-beige mb-3">Réservation Rapide</h3>
                        <p className="text-light-beige/70">
                            Réservez vos billets en quelques clics, sans complications
                        </p>
                    </div>
                    <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-8 hover:border-bright-orange transition-all">
                        <div className="w-16 h-16 bg-bright-orange/20 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-light-beige mb-3">Événements Variés</h3>
                        <p className="text-light-beige/70">
                            Large sélection d'événements : musique, art, spectacles, sport
                        </p>
                    </div>
                </div>
            </section>


            <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-4">
                        Événements <span className="text-bright-orange">à venir</span>
                    </h2>
                    <p className="text-light-beige/70 text-lg max-w-2xl mx-auto">
                        Découvrez notre sélection d'événements exceptionnels qui vous attendent
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className="group flex flex-col h-full bg-dark-grey border border-bright-orange/20 rounded-xl overflow-hidden hover:border-bright-orange hover:scale-105 transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
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
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-light-beige mb-2 group-hover:text-bright-orange transition-colors">{event.name}</h3>
                                <p className="text-light-beige/60 text-sm mb-4 flex-1">{event.description.substring(0, 100)}...</p>
                                <div className="flex justify-between items-center pt-4 border-t border-dark-grey">
                                    <div>
                                        <span className="text-2xl font-bold text-bright-orange">{event.price} DH</span>
                                        <span className="text-light-beige/50 text-sm ml-2">par billet</span>
                                    </div>
                                    <Link
                                        to="/events"
                                        className="text-bright-orange hover:text-bright-orange/80 text-sm font-semibold flex items-center gap-1"
                                    >
                                        Voir plus
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link
                        to="/events"
                        className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
                    >
                        Voir tous les événements
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>


            <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-4">
                        Comment <span className="text-bright-orange">ça marche</span> ?
                    </h2>
                    <p className="text-light-beige/70 text-lg max-w-2xl mx-auto">
                        Réservez vos billets en 3 étapes simples
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-bright-orange rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-dark-black">
                            1
                        </div>
                        <h3 className="text-xl font-bold text-light-beige mb-3">Parcourez les événements</h3>
                        <p className="text-light-beige/70">
                            Explorez notre catalogue d'événements et trouvez celui qui vous intéresse
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-bright-orange rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-dark-black">
                            2
                        </div>
                        <h3 className="text-xl font-bold text-light-beige mb-3">Ajoutez au panier</h3>
                        <p className="text-light-beige/70">
                            Sélectionnez le nombre de billets souhaités et ajoutez-les à votre panier
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-bright-orange rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-dark-black">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-light-beige mb-3">Finalisez la commande</h3>
                        <p className="text-light-beige/70">
                            Remplissez vos informations et confirmez votre réservation
                        </p>
                    </div>
                </div>
            </section>


            <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-4">
                        Explorez nos <span className="text-bright-orange">catégories</span>
                    </h2>
                    <p className="text-light-beige/70 text-lg max-w-2xl mx-auto">
                        Trouvez l'événement parfait selon vos préférences
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={category.id}
                            to={`/events?category=${category.name}`}
                            className="group flex flex-col items-center justify-center p-6 bg-dark-grey border border-bright-orange/20 rounded-xl hover:border-bright-orange hover:scale-110 transform transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="mb-4 text-bright-orange group-hover:scale-125 transition-transform duration-300">
                                {categoryIcons[category.name] || (
                                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-light-beige group-hover:text-bright-orange transition-colors">
                                {category.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </section>


            <Testimonials />


            <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block mb-4">
                            <span className="bg-bright-orange/20 text-bright-orange px-4 py-2 rounded-full text-sm font-semibold border border-bright-orange/30">
                                À propos de nous
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-6">
                            Votre partenaire de confiance pour <span className="text-bright-orange">tous vos événements</span>
                        </h2>
                        <p className="text-light-beige/70 text-lg mb-6">
                            EventSphere est la plateforme de référence pour découvrir et réserver des événements exceptionnels. 
                            Nous connectons les passionnés avec les meilleurs événements dans leur région.
                        </p>
                        <p className="text-light-beige/60 mb-8">
                            Depuis notre création, nous avons aidé des milliers de personnes à vivre des expériences inoubliables. 
                            Notre mission est de rendre l'accès aux événements culturels, sportifs et artistiques plus simple et accessible.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="text-3xl font-bold text-bright-orange mb-2">100%</div>
                                <div className="text-light-beige/70 text-sm">Satisfaction client</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-bright-orange mb-2">24/7</div>
                                <div className="text-light-beige/70 text-sm">Support disponible</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6">
                                <div className="w-12 h-12 bg-bright-orange/20 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-light-beige mb-2">Équipe dédiée</h3>
                                <p className="text-light-beige/60 text-sm">Une équipe passionnée à votre service</p>
                            </div>
                            <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6">
                                <div className="w-12 h-12 bg-bright-orange/20 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-light-beige mb-2">Sécurité garantie</h3>
                                <p className="text-light-beige/60 text-sm">Paiements sécurisés et données protégées</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6">
                                <div className="w-12 h-12 bg-bright-orange/20 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-light-beige mb-2">Rapidité</h3>
                                <p className="text-light-beige/60 text-sm">Réservation en quelques secondes</p>
                            </div>
                            <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6">
                                <div className="w-12 h-12 bg-bright-orange/20 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-light-beige mb-2">Passion</h3>
                                <p className="text-light-beige/60 text-sm">Pour les événements et la culture</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="max-w-4xl mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-4">
                        Questions <span className="text-bright-orange">fréquentes</span>
                    </h2>
                    <p className="text-light-beige/70 text-lg">
                        Tout ce que vous devez savoir sur EventSphere
                    </p>
                </div>
                <div className="space-y-4">
                    {[
                        {
                            question: "Comment réserver un billet ?",
                            answer: "C'est très simple ! Parcourez nos événements, sélectionnez celui qui vous intéresse, ajoutez les billets à votre panier et finalisez votre commande en quelques clics."
                        },
                        {
                            question: "Les paiements sont-ils sécurisés ?",
                            answer: "Absolument ! Nous utilisons des systèmes de paiement sécurisés et cryptés pour protéger toutes vos informations financières."
                        },
                        {
                            question: "Puis-je annuler ma réservation ?",
                            answer: "Les conditions d'annulation varient selon l'événement. Consultez les détails de chaque événement pour connaître la politique d'annulation spécifique."
                        },
                        {
                            question: "Comment recevrai-je mes billets ?",
                            answer: "Vous recevrez une confirmation par email avec vos billets électroniques immédiatement après votre achat. Vous pouvez également les retrouver dans votre compte."
                        },
                        {
                            question: "Y a-t-il des frais supplémentaires ?",
                            answer: "Tous les frais sont inclus dans le prix affiché. Il n'y a pas de frais cachés ou de surprises à la caisse."
                        }
                    ].map((faq, index) => (
                        <div key={index} className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6 hover:border-bright-orange transition-all">
                            <h3 className="text-lg font-bold text-light-beige mb-3 flex items-center gap-3">
                                <span className="w-8 h-8 bg-bright-orange rounded-lg flex items-center justify-center text-dark-black font-bold text-sm">
                                    {index + 1}
                                </span>
                                {faq.question}
                            </h3>
                            <p className="text-light-beige/70 ml-11">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="max-w-4xl mx-auto px-4 py-20 relative z-10">
                <div className="bg-dark-grey border border-bright-orange/20 rounded-2xl p-12 text-center">
                    <div className="w-20 h-20 bg-bright-orange rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-dark-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-light-beige mb-4">
                        Restez <span className="text-bright-orange">informé</span>
                    </h2>
                    <p className="text-light-beige/70 text-lg mb-8 max-w-2xl mx-auto">
                        Recevez les dernières actualités sur nos événements et offres exclusives directement dans votre boîte mail
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            className="flex-1 input-field"
                        />
                        <button type="submit" className="btn-primary whitespace-nowrap">
                            S'abonner
                        </button>
                    </form>
                    <p className="text-light-beige/50 text-xs mt-4">
                        Nous respectons votre vie privée. Désabonnez-vous à tout moment.
                    </p>
                </div>
            </section>


            <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-4">
                        Nos <span className="text-bright-orange">partenaires</span>
                    </h2>
                    <p className="text-light-beige/70 text-lg">
                        Des organisations de confiance qui nous font confiance
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            name: "TechEvents",
                            logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop&crop=center"
                        },
                        {
                            name: "CultureHub",
                            logo: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop&crop=center"
                        },
                        {
                            name: "SportLive",
                            logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&crop=center"
                        },
                        {
                            name: "ArtSpace",
                            logo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop&crop=center"
                        }
                    ].map((partner, index) => (
                        <div 
                            key={index} 
                            className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6 flex flex-col items-center justify-center hover:border-bright-orange hover:scale-105 transition-all group"
                        >
                            <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 bg-dark-black flex items-center justify-center">
                                <img 
                                    src={partner.logo} 
                                    alt={partner.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="text-light-beige/70 font-semibold text-sm text-center">
                                {partner.name}
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="bg-gradient-to-r from-bright-orange/20 to-bright-orange/10 border border-bright-orange/30 rounded-2xl p-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-light-beige mb-6">
                        Prêt à vivre des <span className="text-bright-orange">expériences inoubliables</span> ?
                    </h2>
                    <p className="text-light-beige/80 text-xl mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers de personnes qui font confiance à EventSphere pour leurs réservations d'événements
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/events"
                            className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                        >
                            Découvrir les événements
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link
                            to="/contact"
                            className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                        >
                            Nous contacter
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default Home