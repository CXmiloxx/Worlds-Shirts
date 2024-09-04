import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const dataContext = createContext();

// eslint-disable-next-line react/prop-types
const DataProvider = ({ children }) => {

    const [productosCarrito, setProductosCarrito] = useState([]);
    const [cantidadElementosUnicos, setCantidadElementosUnicos] = useState(0);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const countItems = productosCarrito.length;
        setCantidadElementosUnicos(countItems);
    }, [productosCarrito]);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <dataContext.Provider value={{
            productosCarrito,
            setProductosCarrito,
            cantidadElementosUnicos,
            isAuthenticated,
            user,
            login,
            logout
        }}>
            {children}
        </dataContext.Provider>
    );
};

export default DataProvider;
