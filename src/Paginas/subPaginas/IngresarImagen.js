import React, { useState}  from 'react'
import { Grid,Paper, Button} from '@mui/material/';
import Alertas from '../../Alertas/Alertas';


const IngresarImagen = () => {

    const handleFileChange = async (e)=> {
        const csvFilePath=e.target.files;
        const csv = require('csvtojson')
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            console.log(jsonObj);
        })
        console.log("csv",csv)

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload =  (result) => {
            const data = (result.target.result)
            
            console.log("data",data)
            
        }
        reader.onerror = () => {
            console.log("No Coresponde", reader.error)
        }
    }

    const paperStyle={padding :30,width:500}
    const [setOpenDialog] = useState(false)

    const handleDialog = () => {
        setOpenDialog(prev => !prev)
    }

    return(
        <>
        <Grid rowSpacing={4.5} columnSpacing={2.75}>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
                <Grid item xs={12}></Grid>
                    <Grid xs={0}></Grid>
                      <Grid item >
                            </Grid>
        <Grid item >
            <Paper elevation={20} style={paperStyle}>
                <Grid>
                    <Grid align='center'>
                        <h2>Ingresar Logo</h2>
                    </Grid>
               <Grid rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
                        <Grid item xs={12}></Grid>
                            <Grid xs={0}></Grid>
                            <Grid item xs={6} >
                            <Button 
                                variant="outlined"  
                                sx={{ m: 1 }} 
                                color="primary"
                                component="label">Insertar Logo de Empresa (png)<input type="file" hidden onClick={handleFileChange}/>
                            </Button>
                        </Grid>
                    <Grid item xs={6} >
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <p> </p>
        <Button 
                variant="outlined"  
                sx={{ m: 1 }} 
                color="primary"
                component="label">Insertar Logo de Empresa (png)<input type="file" hidden onClick={handleFileChange}/></Button>
        <p> </p>
    </Paper>
        </Grid>
        </Grid>
        </Grid>
        </>
    )
}

export default IngresarImagen;