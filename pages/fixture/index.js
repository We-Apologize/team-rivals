import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../../styles/Fixture.module.scss";
import LatestResult from "../../components/Fixture/LatestResult";
import Button from "@mui/material/Button";
import axios from "axios";
import TicketSellModal from "../../components/Fixture/TicketSellModal";
import { useState } from "react";
export default function fixture(props) {
  const {matches}=props;
  const showDate=(d)=>{
    let date = new Date(d);
    return date.toString().slice(0,15);
  }
  const getTicketInfo =async(m_id)=>{
    const res = await axios.get(`/api/fixture/tickets?m_id=${m_id}`);
    console.log(res);
    return res;
}
  const [open,setOpen]=useState(false);
  const [match,setMatch] =useState({});
  const [ticket,setTicket] =useState({});
  const setModalOpen = async (m)=>{
    const res = await getTicketInfo(m.m_id);
    console.log(res);
    setTicket(res.data.ticket)
    setMatch(m);
    setOpen(true)

  }
  return (
    <>
      <Head>
        <title>{`Fixture | Team Rivals`}</title>
      </Head>
      <Navbar />
      <div>
      {matches.length==0 && <h1>No matches availbale</h1>}
     {matches.length>0 && <div className={styles.heroBg}>
     <div>
        <LatestResult matches={matches[0]}/>
        {
          matches.map((m,i)=>{
            return         <div className={styles.whiteCard}>
            <div className={styles.singleFixture}>
              <p>{`${showDate(m.date)} ${m.time}`}</p>
              <p>{m.venue}</p>
              <div className={styles.teams}>
              <p>Team Rivals</p>
              <p>VS</p>
              <p>{m.opponant}</p>
              </div>
              <Button variant="contained" sx={{ bgcolor:"yellow",color:"black", textTransform:"capitalize", height:"30px", padding:".2rem 2rem"}} onClick={(e)=>{console.log(m);setModalOpen(m)}} >Tickets</Button>
            </div>
          </div>
          })
        }
          {open && <TicketSellModal open={open} setOpen={setOpen} match={match} ticket={ticket}/>}

  
        </div>
      </div>}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let matches = [];
  try {
    const getFixture = await axios.get(
      "http://localhost:3000/api/fixture",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    if (getFixture.status === 200) {
      matches = getFixture.data.matches;
    } else alert("Error Occured");
  } catch (err) {
    console.log(err);
  }

  return { props: { matches } };
}
