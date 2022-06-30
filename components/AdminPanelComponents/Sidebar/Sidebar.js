export default function(){
  return( <Drawer
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
              <Typography sx={{color:"white"}}>
                TeamRivals
                <ChevronLeftIcon />
              </Typography>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        </List>
      </Drawer>)
}