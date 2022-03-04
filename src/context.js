import { useState, createContext, useContext, useEffect } from "react";
import { differenceInMinutes, isAfter, addDays } from "date-fns";

const AppContext = createContext();

function AppProvider({ children }) {
  const [activityList, setActivityList] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalDurationWeek, setTotalDurationWeek] = useState(0);

  const addNewActivity = (activityName, startTime, endTime) => {
    const newActivity = {
      activityName: activityName,
      startTime: startTime,
      endTime: endTime,
      duration: calculateDuration(startTime, endTime),
    };
    setActivityList([...activityList, newActivity]);
  };
  const calculateDuration = (start, end) => {
    let durationInMinutes = differenceInMinutes(end, start);
    let duration = { minutes: 0, hours: 0 };
    if (durationInMinutes >= 60) {
      duration.hours = durationInMinutes / 60;
      duration.minutes = durationInMinutes % 60;
    } else {
      duration.minutes = durationInMinutes;
    }
    return duration;
  };

  useEffect(() => {
    //Calculate the total duration of activities
    let totalDuration = { hours: 0, minutes: 0 };
    activityList.map((activity) => {
      totalDuration.hours += activity.duration.hours;
      totalDuration.minutes += activity.duration.minutes;
      if (totalDuration.minutes >= 60) {
        totalDuration.hours = totalDuration.minutes / 60;
        totalDuration.minutes = totalDuration.minutes % 60;
      }
      return totalDuration;
    });
    //Calculate the total duration of activities over the past 7 days
    let totalDurationWeek = { hours: 0, minutes: 0 };
    let filtedList = activityList.filter((activity) => {
      return isAfter(activity.endTime, addDays(new Date(), -7));
    });
    filtedList.map((activity) => {
      totalDurationWeek.hours += activity.duration.hours;
      totalDurationWeek.minutes += activity.duration.minutes;
      if (totalDurationWeek.minutes >= 60) {
        totalDurationWeek.hours = totalDurationWeek.minutes / 60;
        totalDurationWeek.minutes = totalDurationWeek.minutes % 60;
      }
      return totalDurationWeek;
    });
    //Sort list by endTime
    setActivityList(
      activityList.sort((a, b) => {
        return b.endTime - a.endTime;
      })
    );
    setTotalDurationWeek(totalDurationWeek);
    setTotalDuration(totalDuration);
  }, [activityList]);

  return (
    <AppContext.Provider
      value={{ activityList, addNewActivity, totalDuration, totalDurationWeek }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext };
