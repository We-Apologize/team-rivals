import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { countries } from "../../utils/statics/countries";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";

export default function Login() {
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>{`Add new Player | Team Rivals`}</title>
      </Head>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Card
            sx={{
              minWidth: 275,
              marginLeft: "80px",
              marginRight: "80px",
              marginTop: "20px",
              padding: "15px",
            }}
          >
            <h3 style={{ display: "flex", justifyContent: "center" }}>
              Register New Player | Team Rivals
            </h3>
            <div style={{display:"flex",justifyContent:"space-around" ,marginBottom:"10px"}}>
              <TextField
                id="filled-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
                variant="filled"
              />
              <TextField
                id="filled-multiline-flexible"
                label="Biography"
                multiline
                maxRows={4}
                variant="filled"
              />
            </div>
            <FormControl fullWidth style={{marginBottom:"10px"}}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="country"
                //   onChange={handleChange}
              >
                {countries.map((country, i) => {
                  return (
                    <MenuItem key={i} value={country.name}>
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
           <div style={{display:"flex",justifyContent:"space-around" ,marginBottom:"10px"}}>
           <TextField
              id="filled-multiline-flexible"
              label="Jersey No"
              type="number"
              variant="filled"
            />
            <TextField
              id="filled-multiline-flexible"
              label="Height (Centimeter)"
              type="number"
              variant="filled"
            />
            <TextField
              id="filled-multiline-flexible"
              label="Release Clause(Million)"
              type="number"
              variant="filled"
            />
            <TextField
              id="filled-multiline-flexible"
              label="Jersey No"
              type="number"
              variant="filled"
            />
           </div>
            <FormControl fullWidth style={{marginBottom:"20px"}}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="position"
                //   onChange={handleChange}
              >
                <MenuItem value="Midfielder">Midfielder</MenuItem>
                <MenuItem value="Forward">Forward</MenuItem>
                <MenuItem value="Defender">Defender</MenuItem>
                <MenuItem value="Goalkeeper">GoalKeeper</MenuItem>
              </Select>
            </FormControl>
            <div style={{display:"flex",justifyContent:"space-around" ,marginBottom:"10px"}}>
            <DesktopDatePicker
              label="Date Of Birth"
              inputFormat="yyyy-MM-dd"
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Join Date"
              inputFormat="yyyy-MM-dd"
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Contract End"
              inputFormat="yyyy-MM-dd"
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            </div>
            <h5>Add Player Image</h5>
            <input
              type="file"
              // onChange={onChange}
              accept="image/*"
              style={{ display: "block" }}
            />
            <Button
              color="success"
              variant="contained"
              //  onClick={addProduct}
            >
              Register the player
            </Button>
          </Card>
        </LocalizationProvider>
      </div>
    </>
  );
}
