import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
  Divider,
  Link,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import NavbarStyles from "./Navbar.module.scss";

function Navbar() {
  return (
    <AppBar position='sticky'  className={NavbarStyles.bg}>
      <Toolbar>
        <IconButton></IconButton>
        <Typography variant='h6' component='div' flexGrow='1'>
          TeamRivals
        </Typography>
        <Stack direction='row'>
          <Button className={NavbarStyles.navItem}>Team</Button>
          <Button className={NavbarStyles.navItem}>Tickets</Button>
          <Button className={NavbarStyles.navItem}>Shops</Button>
          <Button className={NavbarStyles.navItem}>
            <Link
              underline='none'
              className={NavbarStyles.register}
              href='/login'>
              Login
            </Link>
          </Button>
          <Link
            underline='none'
            className={NavbarStyles.register}
            href='/register'>
            <Button variant='contained' className={NavbarStyles.registerButton}>
              Register
            </Button>
          </Link>

          {/* <Button color='inherit'>Team</Button>

          <Button color='inherit' className={NavbarStyles.navItem}>
            Tickets
          </Button>
          <Button color='inherit' className={NavbarStyles.navItem}>
            Shop
          </Button>
          <Button color='inherit'>Login</Button>
          <Button variant='contained' color='success'>
            Success
          </Button> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
