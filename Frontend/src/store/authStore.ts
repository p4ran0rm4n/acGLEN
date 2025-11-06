import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validar variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  console.error('Verifique se o arquivo Frontend/.env contém:');
  console.error('  VITE_SUPABASE_URL=...');
  console.error('  VITE_SUPABASE_ANON_KEY=...');
  console.error('Valores atuais:');
  console.error('  VITE_SUPABASE_URL:', supabaseUrl || 'NÃO DEFINIDO');
  console.error('  VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'DEFINIDO' : 'NÃO DEFINIDO');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    cpf: string,
    phone: string,
    address: string,
    city?: string,
    state?: string,
    zip_code?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { user, session } = response.data;
      
      set({
        user,
        token: session.access_token,
        loading: false,
      });

      // Salvar token no localStorage
      localStorage.setItem('token', session.access_token);
      localStorage.setItem('refresh_token', session.refresh_token);
    } catch (error: any) {
      set({ loading: false });
      throw new Error(error.response?.data?.error || 'Erro ao fazer login');
    }
  },

  register: async (
    email: string,
    password: string,
    name: string,
    cpf: string,
    phone: string,
    address: string,
    city?: string,
    state?: string,
    zip_code?: string
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
        cpf,
        phone,
        address,
        city,
        state,
        zip_code,
      });

      // Após registro, fazer login automaticamente
      await useAuthStore.getState().login(email, password);
    } catch (error: any) {
      set({ loading: false });
      throw new Error(error.response?.data?.error || 'Erro ao registrar');
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(
          `${API_URL}/auth/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      set({ user: null, token: null });
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ loading: false });
        return;
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        user: response.data.user,
        token,
        loading: false,
      });
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      set({ user: null, token: null, loading: false });
    }
  },
}));

// Verificar autenticação ao carregar
useAuthStore.getState().checkAuth();

