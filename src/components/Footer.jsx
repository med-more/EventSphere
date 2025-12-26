const Footer = () => {
  return (
    <footer className="mt-12 border-t border-white/5 bg-black/30">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <div className="font-black text-2xl tracking-tight">
            EVENT<span className="text-[var(--accent)]">SPHERE</span>
          </div>
          <p className="text-sm text-gray-300">
            Plateforme événementielle moderne : découverte, tickets en ligne, emails
            automatisés et back-office sécurisé pour vos équipes.
          </p>
          <div className="flex gap-3 text-sm text-gray-300">
            <span className="tag">Musique</span>
            <span className="tag">Art</span>
            <span className="tag">Spectacle</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/events" className="hover:text-white">Événements</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/admin" className="hover:text-white">Admin</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <p className="text-sm text-gray-300">hello@eventsphere.com</p>
          <p className="text-sm text-gray-300">+212 6 12 34 56 78</p>
          <p className="text-sm text-gray-300">Glasgow · Marrakesh · Remote</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} EventSphere Studio. Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer