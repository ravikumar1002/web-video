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
  Button,
} from "@mui/material";
import { MenuLogo, BackArrow } from "../../assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigationLinks } from "./navigation-link";
import { DrawerHeader, AppBar, Drawer } from "./AsideBarStyle";
import { getAuth, signOut } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
interface ISideNavDrawerProps {
  children: React.ReactNode;
}

export const SideNavDrawer = (props: ISideNavDrawerProps) => {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const auth = getAuth();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeStyle = {
    color: "black",
    background: "#808085",
    textDecoration: "none",
    display: "block",
  };

  const inactiveStyle = {
    color: "black",
    textDecoration: "none",
    display: "block",
  };

  const getActiveStyle = ({ isActive }: { isActive: Boolean }) =>
    isActive ? activeStyle : inactiveStyle;

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
            <MenuIcon />
          </IconButton>
          <div
            style={{
              flexGrow: "1",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography variant="h6" noWrap component="span">
                Web Video
              </Typography>
            </Link>
          </div>

          {auth.currentUser?.providerData[0].uid && (
            <Button
              color="inherit"
              onClick={() => {
                signOut(auth)
                  .then(() => {})
                  .catch((error) => {});
              }}
            >
              Logout
            </Button>
          )}
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
                      "& .MuiListItemIcon-root": {
                        marginRight: "inherit",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {location.pathname.includes(item.path) ? (
                        <item.activeIcon />
                      ) : (
                        <item.icon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: open ? "1rem" : "0.7rem",
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
