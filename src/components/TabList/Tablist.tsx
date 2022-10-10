import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./tablist.scss";

export default function UnstyledTabs({
    tab1,
    tab2,
    tab1data,
    tab2data,
    tabValue,
    setTabValue,
    handleTabChange,
}: any) {
    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label="Chain Select Popup"
                    >
                        <Tab className="w-1/2 " label={tab1} value={'mainnet'} />
                        <Tab className="w-1/2 " label={tab2} value={'testnet'} />
                    </TabList>
                </Box>
                <TabPanel value={'mainnet'}>{tab1data}</TabPanel>
                <TabPanel value={'testnet'}>{tab2data}</TabPanel>
            </TabContext>
        </Box>
    );
}
