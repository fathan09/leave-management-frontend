import React from 'react';
import ReactDOM from 'react-dom/client';
import CreateLeave from './pages/CreateLeave';
import ManageLeave from './pages/ManageLeave';
import Login from './pages/Login';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/create-leave",
        element: <CreateLeave />
    },
    {
        path: "/manage-leave",
        element: <ManageLeave />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RouterProvider router={router} />
);


