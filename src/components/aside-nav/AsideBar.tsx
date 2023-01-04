// import * as React from "react";
import { useState } from "react";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "./asidebar.css";
import { MenuLogo, BackArrow } from "../../assets";
import { Link, NavLink } from "react-router-dom";
import { navigationLinks } from "./navigation-link";
import { DrawerHeader, AppBar, Drawer } from "./AsideBarStyle";
interface ISideNavDrawerProps {
  children: React.ReactNode;
}

export const SideNavDrawer = (props: ISideNavDrawerProps) => {
  const { children } = props;
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeStyle = {
    color: "black",
    background: "blue",
    borderRadius: "5px",
    padding: "0.5rem 0rem",
    textDecoration: "none",
  };

  const deactiveStyle = {
    color: "black",
    padding: "0.5rem 0rem",
    textDecoration: "none",
  };

  const getActiveStyle = ({ isActive }: { isActive: Boolean }) =>
    isActive ? activeStyle : deactiveStyle;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <img src={MenuLogo} alt="Menu icon" style={{ height: "2rem" }} />
          </IconButton>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Web Video
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <img
              src={BackArrow}
              alt="Back Arrow logo"
              style={{ height: "2rem" }}
            />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationLinks.map((item) => {
            return (
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                <NavLink
                  style={getActiveStyle}
                  to={item.path}
                  title={item.title}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      flexDirection: open ? "initial" : "column",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={item.iconSvg}
                        alt="Google logo"
                        style={{ height: "1.5rem" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: open ? "1rem" : "0.8rem",
                          width: open ? "auto" : "4rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: open ? "clip" : "ellipsis",
                          textAlign: open ? "left" : "center",
                        },
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
