import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MenuLogo, BackArrow } from "../../assets";
import { NavLink } from "react-router-dom";
import { navigationLinks } from "./navigation-link";
import { DrawerHeader, AppBar, Drawer } from "./AsideBarStyle";
interface ISideNavDrawerProps {
  children: React.ReactNode;
}

export const SideNavDrawer = (props: ISideNavDrawerProps) => {
  const theme = useTheme();
  const { children } = props;
  const [open, setOpen] = React.useState(false);

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

  const getActiveStyle = ({ isActive }) =>
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
          <Typography variant="h6" noWrap component="div">
            Web Video
          </Typography>
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
                      sx={{ opacity: open ? 1 : 0 }}
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