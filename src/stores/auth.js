import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth',{
    state: () =>({
        accessToken: null,
        refreshToken: null,
        user: null
    }),
    actions: { 
        setTokens({ accessToken, refreshToken}){
            this.accessToken = accessToken
            this.refreshToken = refreshToken;
        },
        clearTokens(){
            this.accessToken = null;
            this.refreshToken = null;
            this.user= null;
        },
        setUser(user){
            this.user = user
        }
    },
    persist: true, // Persist tokens across sessions 
})