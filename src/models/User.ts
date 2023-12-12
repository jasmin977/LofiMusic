export type IUser = {
  userId?: number;
  userName: string;
  email?: string;
};

export type IMessage = {
  id: string;
  content: string;
  sender: IUser | null;
  createdAt: string;
};

export type IRoom = {
  id: string;
  name: string;
  syncPlayer: ISyncPlayer;
  pomodorClock: IPomodorClock;
  conversation: IMessage[];
};

export type ISyncPlayer = {
  currentAttachmentIndex: number;
  currentAttachmentProgress: number;
  id: string;
  isPlaying: boolean;
  playlist: {
    link: string;
    name: string;
  }[];
};

export type IPomodorClock = {
  workDurationMinutes: number;
  breakDurationMinutes: number;
  isRunning: boolean;
};
