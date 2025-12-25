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

  return (
    <div>Navbar</div>
  )
}

export default Navbar