import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Paper className="app-footer" elevation={3}>
            <div style={{ padding: '20px' }}>
                <Typography variant="h6" color="white" align="left">
                    Drivehub Co.,Ltd
                </Typography>
                <Typography variant="body2" color="white" align="left">
                    193-195 Lake Rajada Office Complex,Ratchadapisek road, Khlong Toei, Bangkok
                </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', padding: '10px' }}>
                <Typography variant="body2" color="white" align="center">
                    © Drivehub {new Date().getFullYear()}
                </Typography>
            </div>
        </Paper>
    );
}

export default Footer;
