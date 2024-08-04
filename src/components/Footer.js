import React, {Fragment} from "react";
import '../css/footer.css'
import facebook from '../icons/facebook.png'
import twitter from '../icons/twitter.png'
import instagram from '../icons/instagram.png'
import linkedin from '../icons/linkedin.png'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';



export default function Footer() {
    return (
      <Fragment>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MongoUI
          </Typography>
            {/* <div id="footer">
                <div id="iconContainer"><a href="http://facebook.com" ><img src={facebook} alt="Facebook Logo" width="50" height="50"/></a></div>
                <div id="iconContainer"><a href="http://twitter.com" ><img src={twitter} alt="Twitter Logo" width="50" height="50"/></a></div>
                <div id="iconContainer"><a href="http://instagram.com" ><img src={instagram} alt="Twitter Logo" width="50" height="50"/></a></div>
                <div id="iconContainer"><a href="http://linkedin.com" ><img src={linkedin} alt="Twitter Logo" width="50" height="50"/></a></div>
            </div> */}
        </AppBar>
      </Fragment>
    );
  }