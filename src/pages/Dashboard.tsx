import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { useLogout } from '../hooks/useAuth'
import '../styles.css'

export function Dashboard() {
  const { user } = useAuth()
  const { data: profile, isLoading } = useProfile(user?.id)
  const logoutMutation = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      navigate('/login')
    } catch (err: any) {
      alert('Erro ao fazer logout: ' + err.message)
    }
  }

  const getDisplayName = () => {
    if (profile) {
      return `${profile.name} ${profile.last_name}`.trim() || user?.email
    }
    const fullName = user?.user_metadata?.full_name
    if (fullName) return fullName
    const name = user?.user_metadata?.name
    const lastName = user?.user_metadata?.last_name
    return (name || lastName) ? `${name || ''} ${lastName || ''}`.trim() : user?.email
  }

  const getAge = () => {
    return profile?.age || user?.user_metadata?.age
  }

  if (isLoading) {
    return (
      <div className="container dashboard-container">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="container dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button 
          className="logout-btn" 
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
        </button>
      </div>
      
      <div id="welcome">
        <h3>Bem-vindo!</h3>
        <div id="userInfo">
          <p id="welcomeMessage">Olá, {getDisplayName()}!</p>
          {getAge() && <p id="userAge">Idade: {getAge()} anos</p>}
        </div>
      </div>
    </div>
  )
}
