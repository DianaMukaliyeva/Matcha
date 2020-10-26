import React, { useState, useEffect } from "react";
import axios from "axios";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { settingStyles } from "../../../styles/settingStyles";

const Tags = ({ updateFilter, filter }) => {
    const classesSetting = settingStyles();
    const [realTags, setRealTags] = useState([]);
    useEffect(() => {
        let isMounted = true;
        async function getTags() {
            const res = await axios.get("/profile/tags");
            isMounted && setRealTags(res.data);
        }
        getTags();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleInterestChange = (event, newValue) => {
        let selectedTags = [];
        if (newValue.length !== 0) {
            const temp = Object.entries(newValue);
            temp.forEach(([key, value]) => {
                selectedTags.push(value.tag);
            });
        }
        updateFilter({
            ...filter,
            tags: selectedTags,
        });
    };
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="interest-standard"
            onChange={handleInterestChange}
            options={realTags}
            getOptionLabel={(option) => option.tag}
            defaultValue={[]}
            renderInput={(params) => (
                <TextField
                    className={classesSetting.tags}
                    {...params}
                    variant="standard"
                    label="Passionate about ..."
                />
            )}
        />
    );
};

export default Tags;
