import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../../styles/Fixture.module.scss";
import Latest from "../../components/Fixture/Latest";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
export default function fixture(props) {
  const { match, events } = props;
  const showDate = (d) => {
    let date = new Date(d);
    return date.toString().slice(0, 15);
  };

  return (
    <>
      <Head>
        <title>{`Result | Team Rivals`}</title>
      </Head>
      <Navbar />
      <div>
        <div className={styles.heroBg}>
          <Latest matches={match[0]} />
        {events.map((e)=>{
           switch(e.mevent) {
            case "Goal":
              return<div> <div className={styles.goal}>
              <div className={styles.goad_card}>
                <div>
                <span
                  style={{
                    height: "30px",
                    width: "30px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    padding: ".2rem",
  
                  }}
                >
                  {e.etime}'
                </span>
                <span  style={{fontSize:"2rem", marginLeft:"2rem"}}>Goal!! {e.details.scorer}!!!</span>
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                  <span style={{fontSize:"1.5rem", fontWeight:"bold", marginRight:"2rem"}}>Goal by {e.details.type}</span>
                <img src="/goal.png" alt="" style={{height:"60px", width:"100px"}}/>
                </div>
              </div>
              <div style={{marginTop:"2rem"}}>
                  <span style={{fontSize:"1.3rem", marginLeft:"2rem",marginTop:"2rem", fontWeight:"bold"}}>Assist by {e.details.assist}</span>
              </div>
            </div>
           
            </div>
              break;
            case "PlayerBooked":
              return <div> <div className={styles.goal}>
              <div className={styles.goad_card}>
                <div>
                <span
                  style={{
                    height: "30px",
                    width: "30px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    padding: ".2rem",
  
                  }}
                >
                  {e.etime}'
                </span>
                <span  style={{fontSize:"2rem", marginLeft:"2rem"}}>Booked {e.details.player}!!!</span>
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                  <span style={{fontSize:"1.5rem", fontWeight:"bold", marginRight:"2rem"}}> {e.details.card} Card</span>
                <img src="/card.png" alt="" style={{height:"60px", width:"100px"}}/>
                </div>
              </div>
              <div style={{marginTop:"2rem"}}>
                  <span style={{fontSize:"1.3rem", marginLeft:"2rem",marginTop:"2rem", fontWeight:"bold"}}>Sent by {e.details.sentOf}</span>
              </div>
            </div>
           
            </div>
              break;
            case "Saves":
                return <div> <div className={styles.goal}>
                <div className={styles.goad_card}>
                  <div>
                  <span
                    style={{
                      height: "30px",
                      width: "30px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      textAlign: "center",
                      padding: ".2rem",
    
                    }}
                  >
                    {e.etime}'
                  </span>
                  <span  style={{fontSize:"2rem", marginLeft:"2rem"}}>What a save !!!! {e.details.keeper}!!!</span>
                  </div>
                  <div style={{display:"flex", alignItems:"center"}}>
                    <span style={{fontSize:"1.5rem", fontWeight:"bold", marginRight:"2rem"}}> {e.details.type} save</span>
                  <img src="/keeper.png" alt="" style={{height:"60px", width:"100px"}}/>
                  </div>
                </div>
                <div style={{marginTop:"2rem"}}>
                    <span style={{fontSize:"1.3rem", marginLeft:"2rem",marginTop:"2rem", fontWeight:"bold"}}>Put the pressure</span>
                </div>
              </div>
             
              </div>
                break;
                case "PlayerInOut":
                    return <div> <div className={styles.goal}>
                    <div className={styles.goad_card}>
                      <div>
                      <span
                        style={{
                          height: "30px",
                          width: "30px",
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          textAlign: "center",
                          padding: ".2rem",
        
                        }}
                      >
                        {e.etime}'
                      </span>
                      <span  style={{fontSize:"2rem", marginLeft:"2rem"}}> {e.details.playerIn} Comes In</span>
                      </div>
                      <div style={{display:"flex", alignItems:"center"}}>
                        <span style={{fontSize:"1.5rem", fontWeight:"bold", marginRight:"2rem"}}> Tired of playing</span>
                      <img src="/inout.png" alt="" style={{height:"60px", width:"100px"}}/>
                      </div>
                    </div>
                    <div style={{marginTop:"2rem"}}>
                        <span style={{fontSize:"1.3rem", marginLeft:"2rem",marginTop:"2rem", fontWeight:"bold"}}>{e.details.playerOut} Goes Out</span>
                    </div>
                  </div>
                 
                  </div>
          }
        })}
          
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let { id } = context.params;
  let match = {};
  let events = [];
  try {
    const getFixture = await axios.get(
      `http://localhost:3000/api/result/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    if (getFixture.status === 200) {
      match = getFixture.data.match;
      events = getFixture.data.details;
      console.log("--------------------------")
      console.log(match, events);
    } else alert("Error Occured");
  } catch (err) {
    console.log(err);
  }

  return { props: { match, events } };
}
