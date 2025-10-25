import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegister } from '../hooks/useAuth'
import '../styles.css'

export function Register() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const registerMutation = useRegister()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await registerMutation.mutateAsync({
        name,
        lastName,
        age: parseInt(age),
        email,
        password,
      })
      setSuccess('Registro bem-sucedido! Por favor, verifique seu e-mail para confirmar sua conta.')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err: any) {
      setError('Erro no registro: ' + (err.message || 'Erro desconhecido'))
    }
  }

  return (
    <div className="container register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div className="name-row">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={registerMutation.isPending}
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={registerMutation.isPending}
          />
        </div>
        <input
          type="number"
          placeholder="Idade"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          disabled={registerMutation.isPending}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={registerMutation.isPending}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={registerMutation.isPending}
        />
        <button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <div className="toggle">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  )
}
