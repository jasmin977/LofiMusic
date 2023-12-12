import React, { useEffect, useState } from "react";
import { DraggableCard } from "../../components/shared";
import {
  useAppState,
  useAppuStatu,
  useAuth,
  useSignalRContext,
} from "../../context";
import { Palette } from "../../themes";
import { HopOff, Pause, Play, Plus, RotateCcw, Zap } from "lucide-react";
import { IPomodorClock } from "../../models";

function PomodoroCard() {
  const { room } = useAuth();
  const { connection } = useSignalRContext();
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(10); // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [displayWorkTimer, setDisplayWorkTimer] = useState(true);
  const [workDurationInSeconds, setWorkDurationInSeconds] = useState(10 * 60); // 25 minutes in seconds
  const [breakDurationInSeconds, setBreakDurationInSeconds] = useState(5 * 60); // 5 minutes in seconds
  const progress =
    ((workDurationInSeconds - seconds) / workDurationInSeconds) * 100;
  const intervalRef = React.useRef<any>(null);

  useEffect(() => {
    if (room) {
      setTimer(
        room.pomodorClock.workDurationMinutes,
        room.pomodorClock.breakDurationMinutes,
        false
      );
    }
  }, [room]);

  useEffect(() => {
    const handleInterval = () => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    };

    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(handleInterval, 1000);
    } else if (isActive && seconds === 0) {
      // Switch between work and break modes
      setIsBreak((prevIsBreak) => !prevIsBreak);

      // Set the new duration based on the mode
      setSeconds(isBreak ? breakDurationInSeconds : workDurationInSeconds);
    }

    return () => clearInterval(intervalRef.current);
  }, [
    isActive,
    seconds,
    isBreak,
    workDurationInSeconds,
    breakDurationInSeconds,
  ]);
  useEffect(() => {
    connection?.on(
      "UpdatePomodorTimer",
      (userName: string, timer: IPomodorClock, date: string) => {
        setTimer(
          timer.workDurationMinutes,
          timer.breakDurationMinutes,
          timer.isRunning
        );
      }
    );
    connection?.on("ReceiveStartPomodorTimer", (userName, date) => {
      setIsActive(true);
    });
    connection?.on("ReceiveStopPomodorTimer", (userName, date) => {
      setIsActive(false);
    });
    return () => {
      connection?.off("UpdatePomodorTimer");
      connection?.off("ReceiveStartPomodorTimer");
      connection?.off("ReceiveStopPomodorTimer");
    };
  }, [connection]);
  const handleStartStop = () => {
    togglePomodorTimer(!isActive);
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleRepeat = () => {
    setSeconds(isBreak ? breakDurationInSeconds : workDurationInSeconds);
    setIsActive(true);
  };

  const setTimer = (
    newWorkDurationInMinutes: number,
    newBreakDurationInMinutes: number,
    isActive: boolean
  ) => {
    const newWorkDuration = newWorkDurationInMinutes * 60;
    const newBreakDuration = newBreakDurationInMinutes * 60;
    setWorkDurationInSeconds(newWorkDuration);
    setBreakDurationInSeconds(newBreakDuration);
    setSeconds(isBreak ? newBreakDuration : newWorkDuration);
    setIsBreak(false);
    setIsActive(isActive);
  };

  const handleModeChange = (
    newWorkDurationInMinutes: number,
    newBreakDurationInMinutes: number
  ) => {
    SetPomodorTimer(newWorkDurationInMinutes, newBreakDurationInMinutes);
  };

  const SetPomodorTimer = (
    workDurationInMinutes: number,
    breakDurationInMinutes: number
  ) => {
    connection
      ?.invoke("SetPomodorTimer", {
        WorkDurationMinutes: workDurationInMinutes,
        BreakDurationMinutes: breakDurationInMinutes,
      })
      .then(() => console.log("SetPomodorTimer"))
      .catch((err) => console.log(err));
  };
  const togglePomodorTimer = (isRunning: boolean) => {
    connection?.invoke(isRunning ? "StartPomodorTimer" : "StopPomodorTimer");
  };

  const { pomodoroCard } = useAppuStatu();

  return (
    <DraggableCard
      isVisible={pomodoroCard.isVisible}
      onToggleVisibility={pomodoroCard.toggleVisibility}
      h={250}
      w={400}
      zIndex={pomodoroCard.zindex}
      bringToFront={pomodoroCard.bringToFront}
      //title={pomodoroCard.zindex.toString()}
    >
      <div className="p-2 text-center">
        <p className="space-x-0 text-5xl font-semibold tracking-wide text-white ">
          {Math.floor(seconds / 3600)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0")}
          :{(seconds % 60).toString().padStart(2, "0")}
        </p>
        <div className="flex items-center justify-center gap-6 py-2 ">
          <div
            className="flex items-center gap-2 hover:cursor-pointer "
            onClick={() => handleModeChange(25, 5)}
          >
            <Zap size={13} color={isBreak ? Palette.text : Palette.primary} />
            <span
              className={`${!isBreak && "font-bold"}`}
              style={{
                fontSize: 12,
                color: !isBreak ? Palette.primary : Palette.text,
              }}
            >
              Focus mode
            </span>
          </div>
          <div
            className="flex items-center gap-2 hover:cursor-pointer "
            onClick={() => handleModeChange(5, 10)}
          >
            <HopOff
              size={13}
              color={isBreak ? Palette.primary : Palette.text}
            />
            <span
              className={`${isBreak && "font-bold"}`}
              style={{
                fontSize: 12,
                color: !isBreak ? Palette.text : Palette.primary,
              }}
            >
              Break timer
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 ">
          <div className="p-2 rounded-full hover:cursor-pointer">
            <Plus size={25} color={Palette.text} />
          </div>
          <div
            onClick={handleStartStop}
            style={{ backgroundColor: "#f3a85253" }}
            className="flex justify-center p-2 rounded-full hover:cursor-pointer "
          >
            {isActive ? (
              <Pause
                fill={Palette.primary}
                size={40}
                strokeWidth={1}
                color={Palette.primary}
              />
            ) : (
              <Play
                strokeWidth={1}
                fill={Palette.primary}
                size={40}
                color={Palette.primary}
              />
            )}
          </div>

          <div className="p-2 rounded-full hover:cursor-pointer">
            <RotateCcw size={25} color={Palette.text} onClick={handleRepeat} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div
              style={{ backgroundColor: Palette.border }}
              className="w-full rounded-full "
            >
              <div
                style={{
                  backgroundColor: Palette.primary,
                  width: `${progress}%`,
                }}
                className={`  h-2 rounded-full `}
              ></div>
            </div>
            <div className="text-right">
              <span
                style={{ color: Palette.text }}
                className="inline-block text-base font-normal "
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/*  <div>
          <label className="mr-2">Work Duration (minutes):</label>
          <input
            type="number"
            min="1"
            value={workDurationInSeconds / 60}
            onChange={(e) => setWorkDurationInSeconds(Number(e.target.value) * 60)}
          />
        </div>
        <div>
          <label className="mr-2">Break Duration (minutes):</label>
          <input
            type="number"
            min="1"
            value={breakDurationInSeconds / 60}
            onChange={(e) => setBreakDurationInSeconds(Number(e.target.value) * 60)}
          />
        </div>
       */}
      </div>
    </DraggableCard>
  );
}

export default PomodoroCard;
