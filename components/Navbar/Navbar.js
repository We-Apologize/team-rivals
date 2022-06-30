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
import Avatar from "@mui/material/Avatar";
import Image from "next/image";

import Link from "next/link";
import NavbarStyles from "./Navbar.module.scss";
import { useAuth } from "../../context/AuthProvider";

function Navbar() {
  const { auth, IsAdmin, logout } = useAuth();
  const user = auth.user;
  const handleLogout = () => {
    logout();
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
          <Button className={NavbarStyles.navItem}>Team</Button>

          <Button className={NavbarStyles.navItem}>Tickets</Button>
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
              <Stack direction='row'>
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
              </Stack>
            </Container>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
