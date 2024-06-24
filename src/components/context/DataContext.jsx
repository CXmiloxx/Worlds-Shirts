import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const dataContext = createContext();

// eslint-disable-next-line react/prop-types
const DataProvider = ({ children }) => {
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [cantidadElementosUnicos, setCantidadElementosUnicos] = useState(0);

    useEffect(() => {
        const countItems = productosCarrito.length;
        setCantidadElementosUnicos(countItems);
    }, [productosCarrito]);

    return (
        <dataContext.Provider value={{ productosCarrito, setProductosCarrito, cantidadElementosUnicos }}>
            {children}
        </dataContext.Provider>
    );
};

export default DataProvider;
