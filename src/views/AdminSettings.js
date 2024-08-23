import React, {useEffect, useState} from "react";
import '../css/homePage.css'
import AppLayout from "../AppLayout";
import { useSelector } from "react-redux";
import { getAdminSettings } from "../API/apiGet";
import { Box} from "@mui/material";
import { userDetailsReducer } from "../state/userDetailsReducer";
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from '@mui/material';
const {selectRoles}  = userDetailsReducer.getSelectors()

function AdminSettings(){
    const userRoles = useSelector(selectRoles);
    const [data, setData] = useState()

    useEffect(() => {
        const api = async () => {
            const response = await getAdminSettings();
            if(response.status === 200){
                setData(response.data)
            }
        }
            
        api()
    },[])

    const getDate = (val) => {
        const date = new Date(val); 
        return date.toLocaleString()
    }


    if(userRoles && data){
        return (
            <AppLayout>
                <Box>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">Account Created</TableCell>
                                <TableCell align="right">Last Logged In</TableCell>
                                <TableCell align="right">Roles</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.username}</TableCell>
                                <TableCell align="right">{getDate(row.accountCreated)}</TableCell>
                                <TableCell align="right">{getDate(row.lastLogin)}</TableCell>
                                <TableCell align="right">{row.roles.toString()}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </AppLayout>  
        )
    } else {
        return (
                <AppLayout>
                
                    <p>UNAUTHENTICATED</p>
                 
                </AppLayout>  
        )
    }
}

export default AdminSettings;