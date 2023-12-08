import {
  JAZZ_1,
  JAZZ_2,
  JAZZ_3,
  JAZZ_4,
  JAZZ_5,
  chill_1,
  chill_2,
  chill_3,
  chill_4,
  chill_5,
  sleepy_1,
  sleepy_2,
  sleepy_3,
  sleepy_4,
  sleepy_5,
} from "../assets";

interface Song {
  title: string;
  url: string;
  type: string;
}
export const playlistData: Song[] = [
  {
    title: "Chill Song 1",
    url: chill_1,
    type: "chill",
  },
  {
    title: "Chill Song 2",
    url: chill_2,
    type: "chill",
  },
  {
    title: "Chill Song 3",
    url: chill_3,
    type: "chill",
  },
  {
    title: "Chill Song 4",
    url: chill_4,
    type: "chill",
  },
  {
    title: "Chill Song 5",
    url: chill_5,
    type: "chill",
  },
  {
    title: "Jazz Song 1",
    url: JAZZ_1,
    type: "jazz",
  },
  {
    title: "Jazz Song 2",
    url: JAZZ_2,
    type: "jazz",
  },
  {
    title: "Jazz Song 3",
    url: JAZZ_3,
    type: "jazz",
  },
  {
    title: "Jazz Song 4",
    url: JAZZ_4,
    type: "jazz",
  },
  {
    title: "Jazz Song 5",
    url: JAZZ_5,
    type: "jazz",
  },
  {
    title: "Sleepy Song 1",
    url: sleepy_1,
    type: "sleepy",
  },
  {
    title: "Sleepy Song 2",
    url: sleepy_2,
    type: "sleepy",
  },
  {
    title: "Sleepy Song 3",
    url: sleepy_3,
    type: "sleepy",
  },
  {
    title: "Sleepy Song 4",
    url: sleepy_4,
    type: "sleepy",
  },
  {
    title: "Sleepy Song 5",
    url: sleepy_5,
    type: "sleepy",
  },
];
