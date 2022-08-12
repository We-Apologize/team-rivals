import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
  Divider,
  Container,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import router from "next/router";
import { useAuth } from "../../context/AuthProvider";
import NavbarStyles from "./Navbar.module.scss";
function Navbar() {
  const { auth, IsAdmin, logout, IsEditor } = useAuth();
  const user = auth.user;
  const id = auth.id;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    logout();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ProfileHandler = (e) => {
    if (id) router.push(`/user/${id}`);
  };
  return (
    <AppBar position='sticky' className={NavbarStyles.bg}>
      <Toolbar>
        <Image
          src='/favicon.ico'
          width={60}
          height={60}
          layout='intrinsic'></Image>
        <Link href='/'>
          <Typography variant='h6' component='div' flexGrow='1'>
            TeamRivals
          </Typography>
        </Link>
        <Stack direction='row'>
          {IsAdmin && (
            <Button className={NavbarStyles.navItem}>
              <Link underline='none' href='/admintools'>
                Admin
              </Link>
            </Button>
          )}
          {IsEditor && (
            <Button className={NavbarStyles.navItem}>
              <Link underline='none' href='/editorspanel'>
                Editor
              </Link>
            </Button>
          )}
          <Button className={NavbarStyles.navItem}>
            <Link underline='none' href='/news'>
              news
            </Link>
          </Button>
          <Button className={NavbarStyles.navItem}>
            <Link underline='none' href='/player'>
              Player
            </Link>
          </Button>
          <Button className={NavbarStyles.navItem}>
            <Link
              underline='none'
              className={NavbarStyles.otherItems}
              href='/fixture'>
              Fixture
            </Link>
          </Button>
          <Button className={NavbarStyles.navItem}>
            <Link
              underline='none'
              className={NavbarStyles.otherItems}
              href='/result'>
              Result
            </Link>
          </Button>
          <Button className={NavbarStyles.navItem}>
            <Link
              underline='none'
              className={NavbarStyles.otherItems}
              href='/shop'>
              Shop
            </Link>
          </Button>

          {!user && (
            <>
              <Button className={NavbarStyles.navItem}>
                <Link
                  underline='none'
                  className={NavbarStyles.register}
                  href='/login'>
                  Login
                </Link>
              </Button>
              <Button className={NavbarStyles.navItem}>
                <Link
                  underline='none'
                  className={NavbarStyles.register}
                  href='/register'>
                  Register
                </Link>
              </Button>
            </>
          )}
          {user && (
            <Container className={NavbarStyles.register}>
              <Tooltip title='Account settings'>
                <IconButton
                  onClick={handleClick}
                  size='small'
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? "true" : undefined}>
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  {auth.name && (
                    <Typography sx={{ color: "white" }}>
                      {" "}
                      {" " + auth.name}
                    </Typography>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    color: "white",
                    backgroundColor: "#6E2754",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "#6E2754",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem onClick={ProfileHandler}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <NotificationsIcon sx={{ color: "white" }} />
                  </ListItemIcon>{" "}
                  Notifications
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize='small' sx={{ color: "white" }} />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize='small' sx={{ color: "white" }} />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize='small' sx={{ color: "white" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              {/* <Stack direction='row'>
                <Link href='/profile/'>
                  <Button>
                    <Avatar
                      sx={{ justifyContent: "center" }}
                      alt='Remy Sharp'
                      src=''
                    />
                  </Button>
                </Link>

                <Button
                  underline='none'
                  className={NavbarStyles.logout}
                  onClick={handleLogout}>
                  Logout
                </Button>
              </Stack> */}
            </Container>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
