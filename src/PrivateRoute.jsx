/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { dataContext } from './components/context/DataContext';

function PrivateRoute({ element }) {
    const { isAuthenticated } = useContext(dataContext);

    return isAuthenticated ? element : <Navigate to="/Login" />;
}

export default PrivateRoute;

