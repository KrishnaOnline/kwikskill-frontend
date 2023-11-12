export function formatTime(seconds) {
    if (seconds < 60) {
      return Math.floor(seconds) + "s";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${Math.floor(remainingSeconds)}s`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours}h ${remainingMinutes}m ${Math.floor(remainingSeconds)}s`;
    }
  }  