const FormatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;

  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;
  const monthMs = 30 * dayMs;
  const yearMs = 365 * dayMs;

  if (diffMs < minuteMs) {
    return "Just now";
  } else if (diffMs < hourMs) {
    const minutes = Math.floor(diffMs / minuteMs);
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else if (diffMs < dayMs) {
    const hours = Math.floor(diffMs / hourMs);
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else if (diffMs < monthMs) {
    const days = Math.floor(diffMs / dayMs);
    return `${days} day${days === 1 ? "" : "s"}`;
  } else if (diffMs < yearMs) {
    const months = Math.floor(diffMs / monthMs);
    return `${months} month${months === 1 ? "" : "s"}`;
  } else {
    const years = Math.floor(diffMs / yearMs);
    return `${years} year${years === 1 ? "" : "s"}`;
  }
};

export default FormatTime;