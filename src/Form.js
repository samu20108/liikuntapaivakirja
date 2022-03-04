import { Box, Stack, Button, TextField } from "@mui/material";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { isBefore, isAfter, isValid, addMinutes } from "date-fns";
import fi from "date-fns/locale/fi";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "./context";

function Form() {
  const maxDateTime = new Date();
  const [startTime, setStartTime] = useState(addMinutes(maxDateTime, -1));
  const [endTime, setEndTime] = useState(maxDateTime);
  const [activityName, setActivityName] = useState("");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const { addNewActivity } = useGlobalContext();
  const navigate = useNavigate();

  const handleActivityChange = (event) => {
    setActivityName(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonPressed(true);
    if (
      isValid(startTime) &&
      isValid(endTime) &&
      isAfter(maxDateTime, startTime) &&
      isBefore(startTime, endTime) &&
      activityName !== ""
    ) {
      addNewActivity(activityName, startTime, endTime);
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          padding: "30px 0 30px 0",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 2px 10px rgb(175, 175, 175)",
          width: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: "90%" }}
          textAlign="center"
        >
          <h2>Uusi aktiviteetti</h2>

          <Stack spacing={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
              <DateTimePicker
                label="Aloitusaika"
                color="warning"
                value={startTime}
                onChange={(startTime) => {
                  setStartTime(startTime);
                }}
                disableMaskedInput={true}
                maxDateTime={maxDateTime}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    color="warning"
                    error={isAfter(startTime, maxDateTime)}
                    helperText={
                      isAfter(startTime, maxDateTime)
                        ? "Aloitusaikaa ei voi asettaa tulevaisuuteen"
                        : " "
                    }
                  />
                )}
              />
              <DateTimePicker
                label="Lopetusaika"
                color="warning"
                value={endTime}
                onChange={(endTime) => {
                  setEndTime(endTime);
                }}
                disableMaskedInput={true}
                maxDateTime={maxDateTime}
                minTime={addMinutes(startTime, 1)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    color="warning"
                    error={isBefore(endTime, addMinutes(startTime, 1))}
                    helperText={
                      isBefore(endTime, addMinutes(startTime, 1))
                        ? "Lopetusajan täytyy olla suurempi kuin aloitusajan"
                        : " "
                    }
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Aktiviteetin kuvaus"
              value={activityName}
              onChange={handleActivityChange}
              error={activityName === "" && isButtonPressed}
              helperText={
                activityName === "" && isButtonPressed
                  ? "Aktiviteetin kuvaus on pakollinen"
                  : " "
              }
              color="warning"
            />

            <Button variant="contained" color="warning" type="submit">
              Lisää aktiviteetti
            </Button>
            <Button component={Link} to={"/"} color="warning">
              Takaisin
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
export default Form;
