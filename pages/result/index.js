import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../../styles/Fixture.module.scss";
import Latest from "../../components/Fixture/Latest";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
export default function fixture(props) {
  const { matches } = props;
  const router = useRouter();
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
        {matches.length == 0 && <h1>No matches available</h1>}
        {matches.length > 0 && (
          <div className={styles.heroBg}>
            <div>
              <Latest matches={matches[0]} />
              {matches.map((m, i) => {
                return (
                  <div className={styles.whiteCard} onClick={()=>{
                    router.push(`/result/${m.m_id}`)
                  }}>
                    <div className={styles.singleFixture}>
                      <p>{`${showDate(m.date)} ${m.time}`}</p>
                      
                      <div className={styles.teams}>
                        <p>Team Rivals</p>
                        <p>{m.home} - {m.away}</p>
                        <p>{m.opponant}</p>
                      </div>
                      <p>{m.venue}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let matches = [];
  try {
    const getFixture = await axios.get(
      "http://localhost:3000/api/result",
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
