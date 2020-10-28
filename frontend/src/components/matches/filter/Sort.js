import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { filterStyles } from "../../../styles/filterStyles";
import { updateFilter } from '../../../actions/match';

const Sort = ({ setFilter, filterIsOn }) => {
    const dispatch = useDispatch();
    const classesFilter = filterStyles();
    const { filter } = useSelector((state) => state.match);

    const sort = [

        { label: "Yongest First", db: "age_asc" },
        { label: "Oldest first", db: "age_desc" },
        { label: "Best rating", db: "fame_desc" },
        { label: "Lowest rating", db: "fame_asc" },
        { label: "Closest", db: "distance_asc" },
        { label: "Furtherst away", db: "distance_desc" },
        { label: "Most common interest", db: "commonTag_desc" },
        { label: "Least common interest", db: "commonTag_asc" },

    ];

    const handleSortChange = (event, newValue) => {
        let value = [];
        if (newValue !== null) {
            value[0] = newValue.db;
        }
        dispatch(updateFilter({
            ...filter,
            order: value,
        }));
        setFilter(filterIsOn + 1);
    };

    const findValue = () => {
        if (filter.order === '') {
            return '';
        } else {
            console.log('changed here');
            return sort.filter(element => {
                if (element.db === filter.order) return element.label;
                return false; // changed here;
            });
        }
    };

    return (
        <Autocomplete
            id="combo-sort"
            onChange={handleSortChange}
            options={sort}

            getOptionLabel={(option) => option.label}
            getOptionSelected={(option) => option}
            className={classesFilter.sort}
            renderInput={(params) => <TextField {...params} value={findValue} label="Sort" 
            />}

        />
    );
};

export default Sort;
