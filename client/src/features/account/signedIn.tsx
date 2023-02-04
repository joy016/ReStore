import {
  ContentCut,
  ContentCopy,
  ContentPaste,
  Cloud,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../../app/redux/ConfigureStore";
import { signedOut } from "../../app/redux/slices/accountSlice";
import { useNavigate } from "react-router-dom";
import { clearBasket, setBasket } from "../../app/redux/slices/basketSlice";

export default function SignedIn() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signedOut());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="inherit"
        onClick={handleClick}
      >
        <Typography variant="h6">{user?.email}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <AccountCircleIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ShoppingCartIcon />
          My Order
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSignOut();
            dispatch(clearBasket());
          }}
        >
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
