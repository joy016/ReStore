import { Backdrop, Box, CircularProgress, Typography } from "@mui/material"

interface Props {
    message? : string;
}

export default function LoadingComponent({message = 'Loading pa gago...'} : Props){
    return(
        <Backdrop open={true} invisible ={true} 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={100} color="secondary" />
                <Typography variant='h4' sx={{justifyContent: 'center', position: 'fixed', top: '60%', color: 'Black'}}>{message}</Typography>
            </Box>    
        </Backdrop>
    )
}
