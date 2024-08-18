import React, {Fragment} from "react";
import '../css/footer.css'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';



export default function Footer() {
    return (
      <Fragment>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DatabaseUI
          </Typography>
        </AppBar>
      </Fragment>
    );
  }