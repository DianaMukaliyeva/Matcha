import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { updateFilter } from '../../../actions/match';

const Tags = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);
    const [realTags, setRealTags] = useState([]);

    useEffect(() => {
        let isMounted = true;
        async function getTags() {
            const res = await axios.get('/api/profile/tags');
            isMounted && setRealTags(res.data.map((item) => item.tag));
        }
        getTags();
        return () => {
            isMounted = false;
        };
    }, [filter]);

    const handleInterestChange = (event, newValue) => {
        let selectedTags = [];
        if (newValue.length !== 0) {
            const temp = Object.entries(newValue);
            temp.forEach(([key, value]) => {
                selectedTags.push(value);
            });
        }
        dispatch(
            updateFilter({
                ...filter,
                tags: selectedTags,
            })
        );
    };
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="interest-standard"
            onChange={handleInterestChange}
            options={realTags}
            getOptionLabel={(option) => option}
            value={filter['tags']}
            renderInput={(params) => (
                <TextField {...params} variant="standard" label="Passionate about ..." />
            )}
        />
    );
};

export default Tags;
