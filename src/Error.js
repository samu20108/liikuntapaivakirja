import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Error = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="div">
          Tapahtui virhe
        </Typography>
        <Button component={Link} to={"/"} color="warning">
          Takaisin etusivulle
        </Button>
      </Box>
    </Box>
  );
};
export default Error;
