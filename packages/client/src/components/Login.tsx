import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()

  return (
    <div>
      <h1>Welcome to Luma Clone</h1>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  )
}
