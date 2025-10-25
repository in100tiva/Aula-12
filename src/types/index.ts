export interface User {
  id: string
  email?: string
  user_metadata?: {
    name?: string
    last_name?: string
    age?: number
    full_name?: string
  }
}

export interface UserProfile {
  id: string
  name: string
  last_name: string
  age: number
  created_at?: string
  updated_at?: string
}

export interface AuthResponse {
  success: boolean
  data?: any
  error?: string
}
