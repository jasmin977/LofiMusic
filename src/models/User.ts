export type IUser = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type IMessage = {
  id: string;
  content: string;
  sender: IUser | null;
  createdAt: string;
};

export type IPomodorClock = {
  workDurationMinutes: number;
  breakDurationMinutes: number;
  isRunning: boolean;
};
