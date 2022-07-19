import React from 'react';
import Typography from '@mui/material/Typography';

function ExhibitRow({title,children}){
    return (
        <>
            {
            title && <Typography variant="h6" component="div" gutterBottom>
                        {title}
                    </Typography>
            }
            <Typography component="div" gutterBottom>
                {children}
            </Typography>
        </>
    )
}



export default ExhibitRow;