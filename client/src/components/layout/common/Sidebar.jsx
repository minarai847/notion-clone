import { Drawer } from '@mui/material'
import React from 'react'
import { List, ListItem, Box, Typography, ListItemButton } from '@mui/material';
import LogtoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import assets from '../../../assets';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import memoApi from '../../../api/memoApi';
import { useEffect, useState } from 'react';
import { setMemo } from '../../../redux/featuers/memoSlice';


function Sidebar() {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const memos = useSelector((state) => state.memo.value);
    const { memoId } = useParams();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const getMemos = async () => {
            try {
                const res = await memoApi.getAll();
                dispatch(setMemo(res));
            } catch (err) {
                console.error("getMemos: エラー", err);
            }
        };
        getMemos();
    }, [dispatch]);

    useEffect(() => {
        const activeIndex = memos.findIndex((e) => e._id === memoId);
        setActiveIndex(activeIndex);

    }, [navigate]);
    return (
        <Drawer container={window.document.body} variant="permanent" open={true} sx={{ width: 250, height: "100vh" }}>
            <List sx={{ width: 250, hiegth: "100vh", backgroundColor: assets.colors.secondary }}>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography varian="body2" fontWeight="700">{user.username}</Typography>
                        <IconButton onClick={logout}>
                            <LogtoutOutlinedIcon />
                        </IconButton>
                    </Box>
                </ListItemButton>
                <Box sx={{ paddingTop: "10px" }}>

                </Box>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography varian="body2" fontWeight="700">お気に入り</Typography>

                    </Box>
                </ListItemButton>
                <Box sx={{ paddingTop: "10px" }}></Box>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography varian="body2" fontWeight="700">プライベート</Typography>
                        <IconButton>
                            <AddBoxOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItemButton>
                {memos.map((item, index) => (
                    <ListItemButton sx={{ pl: "20px" }} component={Link} to={`/memo/${item._id}`} key={item._id} selected={index === activeIndex}>
                        <Typography>{item.title}</Typography>
                    </ListItemButton>
                )
                )}
            </List>

        </Drawer >
    )
}

export default Sidebar
