import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../../../components/Navbar/Navbar";
import styles from "../../../../styles/Home.module.scss"
export default function addResult() {
  const [events, setEvents] = useState("Select Event");
  const [allEvent,setAllEvent] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const saveMatchDetails =async ()=>{
    try{
      const res = await axios.post("/api/fixture/saveMatch",{events:allEvent,m_id:id})
      alert("Match details Added");
    }
    catch(err){
      console.log(err)
    }

  }
  const [goal, setGoal] = useState({
    type:"",
    scorer:"",
    assist:"",
    teamname:""
  });
   
  const [save, setSave] = useState({
    type:"",
    keeper:"",
    teamname:""
  })
 
  const [playerInOut,setPlayerInOut] = useState({
    playerIn:"",
    playerOut:"",
    teamname:""
  });
  const [book,setBook] = useState({
    card:"",
    sentOf:"",
    player:"",
    teamname:""
  });
  const [time,setTime] = useState(0);
  const event = ["Goal", "PlayerInOut", "PlayerBooked", "Saves"];
  const handleChange = (e) => {
    setEvents(e.target.value);
  };
  const addEvents = () => {
    let ev = {
      time,
      events
    }
    if(events=="Goal")
    {
      ev.eventDetails = goal
    }
    else if(events=="PlayerInOut")
    {
      ev.eventDetails = playerInOut;
    }
    else if(events=="PlayerBooked")
    {
      ev.eventDetails = book
    }
    else if(events=="Saves")
    {
      ev.eventDetails = save
    }
    setAllEvent((prev)=>[...prev,ev])
  };
  return (
    <>
    <Navbar/>
      <div style={{ margin: "auto" }} className={styles.bgOfAdresult}>
        <h1 style={{display:"flex",justifyContent:"center"}}>Add results of match</h1>
        <form>
          <Stack
            direction='column'
            justifyContent="center"
            alignSelf="center"
            spacing={4}
            sx={{ width: "30%", margin: "100px"}}>
               <h3 style={{display:"flex",justifyContent:"center"}}>Add Timestamp of the match event</h3>
            <TextField label='Time' onChange={(e)=>{setTime(e.target.value)}}/>
            <h3 style={{display:"flex",justifyContent:"center"}}>Select Event Type</h3>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>
                Select Event
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={events}
                label='Select event'
                placeholder='Select Event'
                required
                onChange={handleChange}
                sx={{ width: "200px" }}>
                {event.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {events == "Goal" ? (
              <>
                <Typography>Goals</Typography>
                <TextField
                  label='Goal Type'
                  onChange={(e) => setGoal({...goal,type:e.target.value})}
                />
                <TextField
                  label='Scorer'
                  onChange={(e) => setGoal({...goal,scorer:e.target.value})}
                />
                <TextField
                  label='Assisted Player'
                  onChange={(e) => setGoal({...goal,assist:e.target.value})}
                />
                <TextField
                  label='Team name'
                  onChange={(e) => setGoal({...goal,teamname:e.target.value})}
                />
              </>
            ) : (
              <></>
            )}
            {events == "Saves" ? (
              <>
                <Typography>Saves</Typography>
                <TextField
                  label='Saves Type'
                  onChange={(e) => setSave({...save,type:e.target.value})}
                />
                <TextField
                  label='Player'
                  onChange={(e) => setSave({...save,keeper:e.target.value})}
                />
                <TextField
                  label='Team name'
                  onChange={(e) => setSave({...save,teamname:e.target.value})}
                />
              </>
            ) : (
              <></>
            )}
            {events == "PlayerInOut" ? (
              <>
                <Typography>PlayerInOut</Typography>
                <TextField
                  label='In player'
                  onChange={(e) => setPlayerInOut({...playerInOut,playerIn:e.target.value})}
                />
                <TextField
                  label='Out Player'
                  onChange={(e) => setPlayerInOut({...playerInOut,playerOut:e.target.value})}
                />
                <TextField
                  label='Team name'
                  onChange={(e) => setPlayerInOut({...playerInOut,teamname:e.target.value})}
                />
              </>
            ) : (
              <></>
            )}
            {events == "PlayerBooked" ? (
              <>
                <Typography>Player Booked</Typography>
                <TextField
                  label='Card'
                  onChange={(e) => setBook({...book,card:e.target.value})}
                />
                <TextField
                  label='Sent of'
                  onChange={(e) => setBook({...book,sentOf:e.target.value})}
                />
                <TextField
                  label='Player'
                  onChange={(e) => setBook({...book,player:e.target.value})}
                />
                <TextField
                  label='Team name'
                  onChange={(e) => setBook({...book,teamname:e.target.value})}
                />
              </>
            ) : (
              <></>
            )}

            <Button variant='contained' sx={{bgcolor:"#0A0927"}} onClick={addEvents}>
              Add Events
            </Button>
            {allEvent.map((ev,i)=>{
             return <div><p>{i+1}</p>
              <p>{JSON.stringify(ev)}</p></div>
               
            })}
            <Button variant='contained' sx={{bgcolor:"#0A0927"}} onClick={saveMatchDetails}>
              Save
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
