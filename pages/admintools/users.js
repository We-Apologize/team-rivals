import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../context/AuthProvider";
import { authorizationHandler } from "../../utils/authorizationHandler";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Card from "@mui/material/Card";
import SidebarItems from "../../components/AdminPanelComponents/SidebarItems/SidebarItems";
import axios from "axios";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: alpha("#5E35B1", 0.15),
  "&:hover": {
    backgroundColor: alpha("#5E35B1", 0.2),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  color: "black",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  color: "black",
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const columns = [
  { field: "userId", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 400 },
  { field: "createdAt", headerName: "Registered At", width: 400 },
];
export default function AdminTools(props) {
  const { IsAdmin, auth, loading } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const rows = props.data;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const ClickHandler = () => {
    axios.post("/api/admintools/users");
  };
  if (loading)
    return (
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <CircularProgress sx={{ margin: "auto" }} />
      </Box>
    );
  if (!IsAdmin) return <h1>Can't found page</h1>;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div sx={{ padding: "20px" }}>
        <AppBar
          position='fixed'
          open={open}
          sx={{
            backgroundColor: "white",
            marginLeft: "20px",
          }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction='row'>
              <IconButton
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}>
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{
                  color: "black",
                  fontFamily: "comfortaa",
                  fontWeight: "bold",
                }}>
                AdminTools
              </Typography>
            </Stack>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#5E35B1" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Stack direction='row' spacing={2}>
              <Avatar alt='Remy Sharp' src='' />
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        variant='permanent'
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#0A0927",
            color: "white",
          },
        }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <h1>
                <ChevronRightIcon />
              </h1>
            ) : (
              <Typography sx={{ color: "white" }}>
                TeamRivals
                <ChevronLeftIcon />
              </Typography>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Dashboard",
            "Users",
            "Shop",
            "News",
            "Reports",
            "Comments",
            "Go Back",
          ].map((text) => (
            <SidebarItems key={text} name={text} />
          ))}
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#E3F2FD",
          height: "100vh",
          marginTop: "100px",
          marginLeft: "30px",
          marginRight: "30px",
          borderRadius: "8px",
        }}>
        <Typography sx={{ margin: "8px" }}>All pending users</Typography>
        <Button
          variant='contained'
          type='submit'
          onClick={ClickHandler}
          sx={{ margin: "8px" }}>
          Delete all expired users
        </Button>
        <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.userId}
            checkboxSelection
          />
        </div>
      </Box>
    </Box>
  );
}
export async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers.cookie;
  const res = await axios.get("http://localhost:3000/api/admintools/users", {
    headers: {
      cookie: cookie,
    },
  });
  return {
    props: {
      data: res.data,
    },
  };
}
