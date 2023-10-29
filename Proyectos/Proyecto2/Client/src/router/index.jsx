import { createBrowserRouter } from 'react-router-dom';
import Estatico from '../pages/estatico';
import TiempoReal from '../pages/tiemporeal';
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Estatico />
    },
    {
        path:"/estatico",
        element:<Estatico />
    },
    {
        path:"/tiemporeal",
        element:<TiempoReal />
    }
]);