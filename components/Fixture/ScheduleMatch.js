import styles from "./fixture.module.scss";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
export default function ScheduleMatch(props) {
  const [date, setDate] = useState(new Date("2022-08-12T21:11:54"));
  const [time, setTime] = useState("11:00");
  const [match, setMatch] = useState({
    opponant: "",
    venue: "",
    date: date,
    time: time,
  });
  const [ticket, setTicket] = useState({
    category: "",
    price: "",
    total_ticket: "",
  });
  const [tickets, setTickets] = useState([]);
  const addMatch = async () => {
    //TODO: ADD VALIDATION
    try{
        const res = await axios.post(
            "/api/fixture",
            { match,tickets,date,time},
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
            { withCredentials: true }
          );

          if (res.status === 200) {
            alert("Macth ADDED");
          } else alert("Error Occured");
    }
    catch(err)
    {
        console.log(err)
        alert("Error Occured")
    }
          

        
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Schedule A Match
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <TextField
            id="filled-basic"
            label="Opponant Name"
            variant="filled"
            onChange={(e) => {
              setMatch({ ...match, opponant: e.target.value });
            }}
          />
          <TextField
            id="filled-basic"
            label="Venue"
            variant="filled"
            onChange={(e) => {
              setMatch({ ...match, venue: e.target.value });
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <DesktopDatePicker
            label="Match Date"
            inputFormat="yyyy-MM-dd"
            value={date}
            onChange={(val) => {
              setDate(val);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Time"
            value={time}
            onChange={(val) => {
              setTime(val);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Add Tickets
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <TextField id="filled-basic" label="Category" variant="filled"  onChange={(e) => {
              setTicket({ ...ticket, category: e.target.value });
            }} />
          <TextField
            id="filled-basic"
            label="Price"
            variant="filled"
            type="number"
            onChange={(e) => {
                setTicket({ ...ticket, price: e.target.value });
              }} 
          />
          <TextField
            id="filled-basic"
            label="Total Ticket"
            variant="filled"
            type="number"
            onChange={(e) => {
                setTicket({ ...ticket, total_ticket: e.target.value });
              }} 
          />
          <Button variant="contained" onClick={()=>{
            setTickets(t => [...t, ticket])
          }}>ADD ticket</Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "5px",
          }}
        >
         {tickets.map((t,i)=>{
            return  <p style={{ fontSize: "large" }}>{i+1}. {t.category} | {t.price} Tk | {t.total_ticket} Seats</p>
         })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "5px",
          }}
        >
          <Button variant="contained" onClick={addMatch}>Submit</Button>
        </div>
      </LocalizationProvider>
    </div>
  );
}
