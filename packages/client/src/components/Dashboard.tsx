import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { session, signOut } = useAuth()

  return (
    <div>
      <p>Signed in as {session?.user.email}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
