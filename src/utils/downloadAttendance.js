export const downloadAttendance = (name, content) => {
  let date = new Date(Date.now()).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });

  const fileName = name + "_" + date.replace(", ", "_");

  const element = document.createElement("a");

  const blob = new Blob([content], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(blob);

  element.setAttribute("href", fileUrl);
  element.setAttribute("download", fileName);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
};
