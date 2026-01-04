import React from 'react'
import { Box } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import IconButton from '@mui/material/IconButton'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextField from '@mui/material/TextField'
import memoApi from '../api/memoApi'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const Memo = () => {
    const { memoId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        const getMemo = async () => {
            try {
                const res = await memoApi.getOne(memoId);
                console.log(res);
                setTitle(res.title);
                setDescription(res.description);
            } catch (err) {
                alert(err);
            }
        };
        getMemo();

    }, [memoId]);
    let timer;
    const timeout = 500;
    const updateTitle = async (e) => {
        clearTimeout(timer);
        const newTitle = e.target.value;
        setTitle(newTitle);
        timer = setTimeout(async () => {
            try {
                await memoApi.update(memoId, { title: newTitle })

            } catch (err) {
                alert(err);
            }
        }, timeout);

    };
    const updateDescription = async (e) => {
        clearTimeout(timer);
        const newDescription = e.target.value;
        setDescription(newDescription);
        timer = setTimeout(async () => {
            try {
                await memoApi.update(memoId, { description: newDescription })

            } catch (err) {
                alert(err);
            }
        }, timeout);

    };
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", }}>
                <IconButton>
                    <StarBorderOutlinedIcon />
                </IconButton>
                <IconButton>
                    <DeleteOutlineOutlinedIcon variant="outlined" color="error" />
                </IconButton>
            </Box>
            <Box sx={{ padding: "10px 50px" }}>
                <TextField onChange={updateTitle} value={title} placeholder='無題' valiant="outlined" fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                        ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
                    }}
                />
                <TextField onChange={updateDescription} value={description} placeholder='追加' valiant="outlined" fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                        ".MuiOutlinedInput-root": { fontSize: "1rem" },
                    }}
                />
            </Box>
        </>
    )
}

export default Memo
