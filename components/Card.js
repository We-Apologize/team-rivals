import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "../styles/Register.module.scss";
export default function Cards(props) {
  return (
    <Card
      sx={{
        height: "130px",
        width: "200px",
        borderRadius: "15px",
        boxShadow: "2px",
        background: "#0b0e2d",
      }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "Product Sans",
          }}>
          {props.type}
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "Product Sans",
          }}>
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
