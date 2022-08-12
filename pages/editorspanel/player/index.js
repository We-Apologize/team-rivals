import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import Navbar from "../../../components/Navbar/Navbar";
import EditorAppBar from "../../../components/EditorComponent/editorAppBar";
import { useState,useEffect } from "react";
import Head from "next/head";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { countries } from "../../../utils/statics/countries";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../lib/Firebase";
import Button from "@mui/material/Button";
import axios from "axios";
export default function player() {
  const { auth, loading, IsEditor } = useAuth();
  const [image, setImage] = useState([]);
  const [player,setPlayer] = useState({
    p_id:Math.floor(100000 + Math.random() * 900000),
    name:"",
    biography:"",
    teamName:"Team Rivals",
    dob:"",
    country:"",
    jersey_no:"",
    height:"",
    release_clause:"",
    join_date:"",
    position:"",
    contract_end:"",
    image:""
  })
  if (loading) return <LoadingScreen />;
  if (!IsEditor) return <h1>The page is not found</h1>;
  const addPlayer = () => {
    //TODO: ADD VALIDATION
    if (image.length !== 0) {
      const imageRef = ref(storage, `player/${player.p_id}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const res = await axios.post(
            "/api/player",
            { player,url },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
            { withCredentials: true }
          );

          if (res.status === 200) {
            alert("Player ADDED");
          } else alert("Error Occured");
        });
      });
    } else return;
  };
  return (
    <>
    <Head>
        <title>{`Register New Player | Team Rivals`}</title>
      </Head>
      <Navbar />
      <EditorAppBar />
      <div style={{backgroundImage: "linear-gradient(90deg, rgb(24,23,51,0.1) 0%,rgb(195,18,46,0.3) 100%)",marginTop:"-30px",height:"100vh"}}>
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
                onChange={(e)=>{setPlayer({...player,name:e.target.value})}}
              />
              <TextField
                id="filled-multiline-flexible"
                label="Biography"
                multiline
                maxRows={4}
                variant="filled"
                onChange={(e)=>{setPlayer({...player,biography:e.target.value})}}
              />
            </div>
            <FormControl fullWidth style={{marginBottom:"10px"}}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="country"
                onChange={(e)=>{setPlayer({...player,country:e.target.value})}}
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
              onChange={(e)=>{setPlayer({...player,jersey_no:e.target.value})}}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Height (Centimeter)"
              type="number"
              variant="filled"
              onChange={(e)=>{setPlayer({...player,height:e.target.value})}}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Release Clause(Million)"
              type="number"
              variant="filled"
              onChange={(e)=>{setPlayer({...player,release_clause:e.target.value})}}
            />
           </div>
            <FormControl fullWidth style={{marginBottom:"20px"}}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="position"
                onChange={(e)=>{setPlayer({...player,position:e.target.value})}}
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
              onChange={(val)=>{setPlayer({...player,dob:val})}}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Join Date"
              inputFormat="yyyy-MM-dd"
              onChange={(val)=>{setPlayer({...player,join_date:val})}}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Contract End"
              inputFormat="yyyy-MM-dd"
              onChange={(val)=>{setPlayer({...player,contract_end:val})}}
              renderInput={(params) => <TextField {...params} />}
            />
            </div>
            <h5>Add Player Image</h5>
            <input
              type="file"
              onChange = {(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
            
              accept="image/*"
              style={{ display: "block" }}
            />
            <Button
              color="success"
              variant="contained"
              sx={{
                  marginTop:"10px",
                  display:"flex",
                  justifyContent:"center"
              }}
              style={{
                backgroundColor: "#143e7d",

            }}
              onClick={addPlayer}
            >
              Register the player
            </Button>
          </Card>
        </LocalizationProvider>
      </div>
     
    </>
  );
}
