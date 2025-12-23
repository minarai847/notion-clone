import React from 'react'
import { Box } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import IconButton from '@mui/material/IconButton'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextField from '@mui/material/TextField'
import memoApi from '../api/memoApi'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Memo = () => {
    const { memoId } = useParams();

    useEffect(() => {
        const getMemo = async () => {
            try {
                const res = await memoApi.getOne(memoId);
                console.log(res);
            } catch (err) {
                alert(err);
            }
        }

    }, [memoId]);
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
                <TextField placeholder='無題' valiant="outlined" fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                        ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
                    }}
                />
                <TextField placeholder='追加' valiant="outlined" fullWidth
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
