import styles from "./fixture.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import axios from "axios"
import { useAuth } from "../../context/AuthProvider";
import { useEffect,useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function TicketSellModal(props) {
   const {match,open,setOpen,ticket} = props;
   const [totalAmount,setTotalAmount] = useState(0);
   const [category,setCategory] = useState({})
   const {auth} = useAuth();
   const sellTicket = async ()=>{
    if(!auth)
    {
        alert("Please Log In first")
    }
     try{
        const res = await axios.post("/api/fixture/tickets",{match,category,totalAmount,email:auth.user})
        console.log(res);
        alert("Ticket purchased succesfully.")
     }
     catch(err)
     {
        alert("Something Wrong i can feel it.")
     }
   }
  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Buy ticket Now
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Team Rivals VS {match.opponant}
        </Typography>

        <FormControl onChange={(e)=>{setCategory(e.target.value)}}>
          <FormLabel id="demo-radio-buttons-group-label">
            Available Tickets :
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
          {
            ticket.map((t)=>{
                return <FormControlLabel
                value={t.category}
                control={<Radio />}
                label={`${t.category} | price : ${t.price} | ${t.total-t.sold} Tickets Remaining.`}
              />
            })
          }
        
          </RadioGroup>
        </FormControl>
        <TextField id="filled-basic" type="number" label="Total Ticket" variant="filled" onChange={(e)=>{setTotalAmount(e.target.value)}} />
        <Button variant="contained" onClick={sellTicket}>Buy Now</Button>
      </Box>
    </Modal>
  );
}
