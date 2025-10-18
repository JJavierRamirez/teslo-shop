import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/register.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';


type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters
    isAdmin: () => boolean;

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (fullname: string, email: string, password: string) => Promise<boolean>;
    checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    // Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];

        return roles.includes('admin');    
    },

    // Actions
    login: async (email: string, password: string) => {
        // console.log({email, password});

        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } 
        catch (error) {
            console.error(error)
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus:'not-authenticated' });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
    },

    register: async (fullName: string, email: string, password: string) => {

        try {
            const data = await registerAction(fullName, email, password);
            localStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } 
        catch (error) {
            console.error(error)
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus:'not-authenticated' });
            return false;
        }
    },

    checkAuthStatus: async() => {
        try {
            const { user, token } = await checkAuthAction();
            set({
                user,
                token,
                authStatus: 'authenticated'
            });
            return true;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            });
            return false;
        }
    }
}))
