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
} from "@mui/material";

import Link from "next/link"
import NavbarStyles from "./Navbar.module.scss";

function Navbar() {
  return (
    <AppBar position='sticky' className={NavbarStyles.bg}>
      <Toolbar>
        <IconButton></IconButton>
        <Typography variant='h6' component='div' flexGrow='1'>
          TeamRivals
        </Typography>
        <Stack direction='row'>
          <Button className={NavbarStyles.navItem}>Team</Button>
          <Button className={NavbarStyles.navItem}>
            <Link
              underline='none'
              className={NavbarStyles.register}
              href='/new'>
              New
            </Link>
          </Button>
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
