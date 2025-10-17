import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';

type AuthStatus = 'authenticated' | 'non-authenticated' | 'checking';


type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    // Actions
    login: async (email: string, password: string) => {
        // console.log({email, password});

        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token });
            return true;
        } 
        catch (error) {
            console.error(error)
            localStorage.removeItem('token');
            set({ user: null, token: null });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    }
}))
