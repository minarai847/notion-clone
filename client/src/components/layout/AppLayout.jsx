import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import authUtils from '../../utils/authUtils';
import notionLogo from "../../assets/images/notion-logo.png"
import Sidebar from './common/Sidebar';
import { setUser } from "../../redux/featuers/userSlice";
import { useDispatch } from "react-redux";

const AppLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const cheakAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                navigate("/login");
            } else {
                dispatch(setUser(user));
            }
        };
        cheakAuth();
    }, [navigate]);
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>

                    <Outlet />
                </Box>
            </Box>

        </div>
    )
};

export default AppLayout;
