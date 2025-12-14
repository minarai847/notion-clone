import React from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout() {
    return (
        <div>
            <div>AppLayout</div>
            <Outlet />
        </div>
    );
}

export default AppLayout;
