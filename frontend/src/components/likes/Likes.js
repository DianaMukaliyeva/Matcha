import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Match from '../common/matchGallery/GetMatches'
import Typography from '@material-ui/core/Typography';


const Likes = ({ match, history }) => {
    const { page } = match.params; 

    // console.log("PAGE", page, "history", history);
    const tabNameToIndex = {
        0: "likesyou",
        1: "connected",
        2: "temp"
    }

    const indexToTabName = {
        likesyou: 0,
        connected: 1,
        temp: 2
    }

    const [selectedTab, setValue] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        history.push(`/likes/${tabNameToIndex[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Typography variant="h6">Likes</Typography>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange} >
                    <Tab label="Likes you"  />
                    <Tab label="Connected"  />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <Match route="/match/likedme" filterIsOn={0}/>}
            {selectedTab === 1 && <Match route="/match/connected" filterIsOn={0}/>}
        </div>
    );
};

export default Likes;
