import { useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { items } = useSelector((state) => state.cart)
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const cartCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  )

    const isAdmin = Boolean(localStorage.getItem('es_admin_token'))

    const handleLogout = () => {
    localStorage.removeItem('es_admin_token')
    if (location.pathname.startsWith('/admin')) {
      navigate('/login')
    }
    setOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[#090913]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-black text-2xl tracking-tight">
            EVENT<span className="text-[var(--accent)]">SPHERE</span>
          </div>
        </Link>
        <nav className="glass-strong hidden items-center gap-3 rounded-full px-4 py-2 text-sm backdrop-blur md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="rounded-full px-3 py-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Déconnexion
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              Login
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <span className="mr-2">🛒</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-black">
              {cartCount}
            </span>
          </Link>
          <button
            onClick={() => navigate('/events')}
            className="hidden md:inline-flex btn-primary text-sm"
          >
            Réserver
          </button>
          <button
            className="md:hidden rounded-full bg-white/10 p-2 text-white ring-1 ring-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-white"></span>
            <span className="mt-1 block h-0.5 w-5 bg-white"></span>
            <span className="mt-1 block h-0.5 w-5 bg-white"></span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-2 px-4 pb-4 md:hidden">
          <div className="glass-strong rounded-2xl p-3 text-sm">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 transition ${
                      isActive ? 'bg-white/10 text-white' : 'text-gray-200 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {isAdmin ? (
                <button
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-2 text-left text-gray-200 transition hover:bg-white/10 hover:text-white"
                >
                  Déconnexion
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 transition ${
                      isActive ? 'bg-white/10 text-white' : 'text-gray-200 hover:text-white'
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />
    </header>
  )
}

export default Navbar