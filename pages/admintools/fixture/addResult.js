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
export default function addResult() {
  const [events, setEvents] = useState("Select Event");
  const [goalType, setGoalType] = useState("");
  const [Scorer, setScorer] = useState("");
  const [assist, setAssist] = useState("");
  const [teamGoal, setTeamGoal] = useState("");

  const [saveType, setSaveType] = useState("");
  const [goalkeeper, setGoalKeeper] = useState("");
  const [teamSave, setTeamSave] = useState("");

  const [playerIn, setPlayerIn] = useState("");
  const [playerOut, setPlayerOut] = useState("");
  const [teamPlayer, setTeamPlayer] = useState("");

  const [card, setCard] = useState("");
  const [sentOf, setSentOf] = useState("");
  const [CardPlayer, setCardPlayer] = useState("");
  const [TeamCard, setTeamCard] = useState("");

  const event = ["Goal", "PlayerInOut", "PlayerBooked", "Saves"];
  const handleChange = (event) => {
    setEvents(event.target.value);
  };
  const addEvents = () => {
    console.log(yoo);
  };
  return (
    <>
      <div style={{ margin: "auto" }}>
        <h1>Add results of match</h1>
        <form>
          <Stack
            direction='column'
            spacing={4}
            sx={{ width: "30%", margin: "100px" }}>
            <TextField label='Time' />
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
                  value={goalType}
                  onChange={(e) => setGoalType(e.target.value)}
                />
                <TextField
                  label='Scorer'
                  value={Scorer}
                  onChange={(e) => setScorer(e.target.value)}
                />
                <TextField
                  label='Assisted Player'
                  value={assist}
                  onChange={(e) => setAssist(e.target.value)}
                />
                <TextField
                  label='Team name'
                  value={teamGoal}
                  onChange={(e) => setTeamGoal(e.target.value)}
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
                  value={saveType}
                  onChange={(e) => setSaveType(e.target.value)}
                />
                <TextField
                  value={goalkeeper}
                  label='Player'
                  onChange={(e) => setGoalKeeper(e.target.value)}
                />
                <TextField
                  label='Team name'
                  value={teamSave}
                  onChange={(e) => setTeamSave(e.target.value)}
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
                  value={playerIn}
                  onChange={(e) => setPlayerIn(e.target.value)}
                />
                <TextField
                  label='Out Player'
                  value={playerOut}
                  onChange={(e) => setPlayerOut(e.target.value)}
                />
                <TextField
                  label='Team name'
                  value={teamPlayer}
                  onChange={(e) => setTeamPlayer(e.target.value)}
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
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                />
                <TextField
                  label='Sent of'
                  value={sentOf}
                  onChange={(e) => setSentOf(e.target.value)}
                />
                <TextField
                  label='Player'
                  value={CardPlayer}
                  onChange={(e) => setCardPlayer(e.target.value)}
                />
                <TextField
                  label='Team name'
                  value={TeamCard}
                  onChange={(e) => setTeamCard(e.target.value)}
                />
              </>
            ) : (
              <></>
            )}

            <Button variant='contained' onClick={addEvents}>
              Add Events
            </Button>
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
