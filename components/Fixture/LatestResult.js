import styles from "./fixture.module.scss"
import Button from '@mui/material/Button';
export default function LatestResult(props) {
    const {matches}=props;
    const showDate=(d)=>{
      let date = new Date(d);
      return date.toString().slice(0,15);
    }
  return (
    <div className={styles.heroWrapper}>
        <p className={styles.stadium}>{matches.venue}</p>
        <p className={styles.date}><i><b>{showDate(matches.date)}</b></i></p>
        <div className={styles.vsDiv}>

            <p className={styles.teamname}>Team Rivals</p>
            <div className={styles.time}>{matches.time}</div>
            <p className={styles.teamname}>{matches.opponant}</p>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        </div>
       


    </div>
  );
}
