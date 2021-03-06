import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { Button, Collapse, Grid, IconButton, Box } from '@material-ui/core';
import { HighlightOff, ExpandMore, SyncAlt } from '@material-ui/icons';

import { resetFilter } from '../../../actions/match';
import GetMatches from '../../common/matchGallery/GetMatches';
import Sort from './Sort';
import Row from './Row';

import { filterStyles } from '../../../styles/filterStyles';
import { btnStyles } from '../../../styles/btnStyles';
import { systemStyles } from '../../../styles/systemStyles';

const Filter = ({ setting }) => {
    const dispatch = useDispatch();
    const [filterIsOn, setFilter] = React.useState(1);
    const [reset, setReset] = React.useState(false);

    const handleClickReset = (e) => {
        dispatch(resetFilter());
        setFilter(1);
        setReset(!reset);
    };

    const classes = systemStyles();
    const classesCustom = btnStyles();
    const classesFilter = filterStyles();
    const [expanded, setExpanded] = React.useState(setting);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Grid container direction="row" justify="space-between" alignItems="flex-end" pb={4}>
                <Grid item xs={6} sm={3}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            className={classesFilter.filter}
                            startIcon={<SyncAlt className={classes.mr0} />}
                            disabled>
                            Filter&emsp;&emsp;
                        </Button>

                        {filterIsOn > 1 && (
                            <IconButton
                                onClick={() => {
                                    handleClickReset();
                                }}
                                size="small"
                                className={classes.padding}>
                                <HighlightOff />
                            </IconButton>
                        )}
                        <IconButton
                            className={clsx(classesFilter.expand, classes.padding, classes.m0, {
                                [classesFilter.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}>
                            <ExpandMore />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Sort
                        setFilter={setFilter}
                        filterIsOn={filterIsOn}
                        className={classesFilter.filter}
                    />
                </Grid>
            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Row row={1} />
                    <Row row={2} />
                    <Row row={3} />
                    <Grid item xs={12} container spacing={3} className={classesFilter.row}>
                        <Button
                            onClick={(e) => {
                                setFilter(filterIsOn + 1);
                            }}
                            className={classesCustom.mainButton}>
                            See results
                        </Button>
                        <Button
                            onClick={() => {
                                handleClickReset();
                            }}
                            className={`${classesCustom.mainButton} ${classesCustom.secondButton}`}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
            <GetMatches reset={reset} route="/api/match/filter" filterIsOn={filterIsOn} />
        </>
    );
};

export default Filter;
