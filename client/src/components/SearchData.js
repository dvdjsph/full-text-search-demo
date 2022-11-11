import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from "./SearchResults";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Search({filename}){

    const [patents, setPatents] = useState(null);
    const [terms, setTerms] = useState('');

    const handleSearch = (e) => {
        setTerms(e.target.value);
    };

    useEffect(() => {
        axios.get(`api/search/${terms}`).then(res => {
            setPatents(res.data);
        }).catch(e => {
            console.error(e);
        });
    }, [terms]);

    return (
        <div>
          <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
          <TextField id="outlined-search" label="search" placeholder="Search patents" value={terms} onChange={handleSearch}/>
            <div className="patent-search">
            {
                patents && <SearchResults patents={patents}/>
            }

            </div>
        </Box>
            </div>
    );
}
