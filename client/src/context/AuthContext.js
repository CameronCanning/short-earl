import { createContext, useState } from 'react';

const AuthContext = createContext({
    authenticated: false
})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value = {{authenticated, setAuthenticated}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;