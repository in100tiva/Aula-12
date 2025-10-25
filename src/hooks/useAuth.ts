import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../services/supabase'
import type { AuthResponse } from '../types'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return { success: true, data, error: undefined } as AuthResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      name,
      lastName,
      age,
      email,
      password,
    }: {
      name: string
      lastName: string
      age: number
      email: string
      password: string
    }) => {
      // Criar usuário no auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            last_name: lastName,
            age: parseInt(age.toString()),
            full_name: `${name} ${lastName}`,
          },
        },
      })

      if (authError) throw authError

      // O perfil será criado automaticamente via trigger quando o usuário confirmar o email
      // Os dados do perfil estão salvos no user_metadata e serão transferidos para user_profiles
      // quando o email for confirmado através da trigger criada no banco de dados

      return { success: true, data: authData, error: undefined } as AuthResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true, error: undefined } as AuthResponse
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
