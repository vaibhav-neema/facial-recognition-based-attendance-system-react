export const downloadAttendance = (name, content) => {
  let date = new Date(Date.now()).toUTCString().slice(5, 25);

  const fileName = name + "_" + date.replaceAll(" ", "_");

  const element = document.createElement("a");

  const blob = new Blob([content], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(blob);

  element.setAttribute("href", fileUrl); //file location
  element.setAttribute("download", fileName); // file name
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
};
