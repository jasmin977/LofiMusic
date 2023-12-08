const formatDate = (utcDateString: any) => {
  const date = new Date(utcDateString);

  // Format the time as HH:mm:ss
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedTime;
};

export default formatDate;
