import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

export default function App() {
  const { session, loading, error } = useAuth()

  if (loading) return <div>Loading...</div>

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {session ? <Dashboard /> : <Login />}
    </>
  )
}
