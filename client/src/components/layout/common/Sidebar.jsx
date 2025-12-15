import { Drawer } from '@mui/material'
import React from 'react'
import { List, ListItem, Box, Typography, ListItemButton } from '@mui/material';
import LogtoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

function Sidebar() {
    return (
        <Drawer container={window.document.body} variant="permanent" open={true} sx={{ width: 250, height: "100vh" }}>
            <List sx={{ width: 250, hiegth: "100vh" }}>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography varian="body2" fontWeight="700">Notionクローン開発</Typography>
                        <IconButton>
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
            </List>
        </Drawer>
    )
}

export default Sidebar
