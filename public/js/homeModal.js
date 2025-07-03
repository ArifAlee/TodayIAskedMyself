document.addEventListener("DOMContentLoaded", () => {
  const privateIconTemplate = document.getElementById(
    "privateIconTemplate"
  ).innerHTML;
  const publicIconTemplate =
    document.getElementById("publicIconTemplate").innerHTML;


  const colorBox = document.querySelector(".color-box");

  // MAIN MODAL
  const journalBox = document.querySelector(".journal-entry");
  const publicIcon = document.querySelector(".public-icon");
  const privateIcon = document.querySelector(".private-icon");
  const statusBtn = document.querySelector(".status-btn");
  const entryStatus = document.querySelector("#entryStatus");

  colorBox.addEventListener("change", (event) => {
    const color = event.target.value;
    event.target.style.backgroundColor = color;
    journalBox.style.backgroundColor = color;
  });
  publicIcon.addEventListener("click", () => {
    statusBtn.innerHTML = publicIconTemplate;
    entryStatus.value = "public";
  });
  privateIcon.addEventListener("click", () => {
    statusBtn.innerHTML = privateIconTemplate;
    entryStatus.value = "private";
  });


  });
  
  
  // REFRESH BUTTON
  // const refreshBtn = document.querySelector(".refresh-btn")
  // const modalTitle = document.querySelector(".modal-title")
  
  // const question =
  
  // refreshBtn.addEventListener("click", () => {
    
  // })

