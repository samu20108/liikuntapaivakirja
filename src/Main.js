import {
  Box,
  Stack,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useGlobalContext } from "./context";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Main() {
  const { activityList, totalDuration, totalDurationWeek } = useGlobalContext();
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (activityList.length > 0) {
      setShowList(true);
    }
  }, [activityList]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          padding: "30px 0 30px 0",
          borderRadius: "20px",
          boxShadow: "0px 2px 10px rgb(175, 175, 175)",
          width: "1000px",
          minHeight: "500px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h3" sx={{ wordBreak: "break-word" }}>
            Liikuntapäiväkirja
          </Typography>

          {showList ? (
            <>
              <Typography>
                <b>Aktiviteetteihin käytetty kokonaisaika</b>
              </Typography>
              <Stack sx={{ width: "fit-content" }}>
                <Typography sx={{ textAlign: "right" }}>
                  Viimeisen 7vrk aikana:{" "}
                  {Number(totalDurationWeek.hours).toFixed()}h{" "}
                  {Number(totalDurationWeek.minutes).toFixed()}min
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  Koko aikana: {Number(totalDuration.hours).toFixed()}h{" "}
                  {Number(totalDuration.minutes).toFixed()}min
                </Typography>
              </Stack>
            </>
          ) : null}
          <Button
            component={Link}
            variant="contained"
            to={"/form"}
            color="warning"
            sx={{ maxWidth: "500px" }}
          >
            Lisää uusi aktiviteetti
          </Button>

          <List
            sx={{
              alignItems: "center",
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            {showList ? (
              activityList.map((activity, index) => {
                return (
                  <ListItem
                    disableGutters
                    key={index}
                    sx={{
                      margin: "4px 0 4px 0",
                      padding: "5px",
                      borderRadius: "10px",
                      boxShadow: "0px 2px 10px rgb(175, 175, 175)",
                      textAlign: "left",
                      alignItems: "flex-start",
                      wordWrap: "break-word",
                    }}
                  >
                    <ListItemText
                      primary="Aktiviteetti "
                      secondary={activity.activityName}
                    ></ListItemText>
                    <Divider
                      orientation="vertical"
                      flexItem
                      light={true}
                      sx={{ margin: "4px" }}
                    />
                    <ListItemText
                      primary="Aloitus "
                      secondary={format(
                        new Date(activity.startTime),
                        "dd.MM.yyyy' 'HH:mm"
                      )}
                      sx={{ width: "min-content" }}
                    ></ListItemText>
                    <Divider
                      orientation="vertical"
                      flexItem
                      light={true}
                      sx={{ margin: "4px" }}
                    />

                    <ListItemText
                      primary="Lopetus "
                      secondary={format(
                        new Date(activity.endTime),
                        "dd.MM.yyyy' 'HH:mm"
                      )}
                      sx={{ width: "min-content" }}
                    ></ListItemText>
                    <Divider
                      orientation="vertical"
                      flexItem
                      light={true}
                      sx={{ margin: "4px" }}
                    />
                    <ListItemText
                      primary="Käytetty aika "
                      secondary={`${Number(activity.duration.hours).toFixed()}h
                        ${Number(activity.duration.minutes).toFixed()}min`}
                    ></ListItemText>
                  </ListItem>
                );
              })
            ) : (
              <Typography variant="h5" component="div">
                Ei suoritettuja aktiviteetteja
              </Typography>
            )}
          </List>
        </Stack>
      </Box>
    </Box>
  );
}
export default Main;
