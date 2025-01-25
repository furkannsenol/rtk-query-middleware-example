let isOnline = navigator.onLine;

const handleOnlineStatusChange = () => {
  isOnline = navigator.onLine;
};

window.addEventListener("online", handleOnlineStatusChange);
window.addEventListener("offline", handleOnlineStatusChange);

export const getIsOnline = () => {
  return isOnline;
};
