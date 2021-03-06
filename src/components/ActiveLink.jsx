import { Link, useMatch, useResolvedPath } from 'react-router-dom'

function ActiveLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })

  return (
    <Link
      className={`${match && 'bg-purple-100 text-purple-900'} `}
      to={to}
      {...props}
    >
      {children}
    </Link>
  )
}

export default ActiveLink
