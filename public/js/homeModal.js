document.addEventListener("DOMContentLoaded", () => {
  const privateIconTemplate = document.getElementById(
    "privateIconTemplate"
  ).innerHTML;
  const publicIconTemplate =
    document.getElementById("publicIconTemplate").innerHTML;



  // MAIN MODAL
  const publicIcon = document.querySelector(".public-icon");
  const privateIcon = document.querySelector(".private-icon");
  const statusBtn = document.querySelector(".status-btn");
  const entryStatus = document.querySelector("#entryStatus");


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

