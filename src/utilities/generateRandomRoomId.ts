const generateRandomRoomId = () => {
  const prefix = "room";
  const randomString = Math.random().toString(36).substring(7);
  return `${prefix}${randomString}`;
};

export default generateRandomRoomId;
