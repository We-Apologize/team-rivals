import styles from "./fixture.module.scss"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from '@mui/material/TextField';
export default function TicketSellModal(props) {
   
  return (
    <div>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Buy ticket Now
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Team Rivals VS Team Juary
          </Typography>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Available Tickets : </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other  - 140 Tickets Left"
              />
            </RadioGroup>
          </FormControl>
          <TextField id="filled-basic" label="Total Ticket" variant="filled" />
          <p>Total amount : 100</p>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Available Tickets : </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other  - 140 Tickets Left"
              />
            </RadioGroup>
          </FormControl>
          <Button variant="contained">Buy Now</Button>

        </Box>
        </Modal>
  </div>
  );
}
