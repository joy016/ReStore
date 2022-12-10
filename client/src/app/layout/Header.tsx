import { AppBar, Toolbar, IconButton, Typography, Button, Switch } from "@mui/material";
interface Props{
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props){
    return(
        <AppBar position="static" sx={{mb: 4}}>
        <Toolbar>
          <Typography variant="h6">
            Yugee and Boki Store
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange}/>
        </Toolbar>
      </AppBar>
    )
}