

document.addEventListener("DOMContentLoaded", () => {
  const privateIconTemplate = document.getElementById(
    "privateIconTemplate"
  ).innerHTML;
  const publicIconTemplate =
    document.getElementById("publicIconTemplate").innerHTML;
  const privateIconTemplateEdit = document.getElementById(
    "privateIconTemplateEdit"
  ).innerHTML;
  const publicIconTemplateEdit = document.getElementById(
    "publicIconTemplateEdit"
  ).innerHTML;


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

  //EDIT MODAL

  document.querySelectorAll(".modal").forEach((modal) => {
    const publicIconEdit = modal.querySelector(".public-icon-edit");
    const privateIconEdit = modal.querySelector(".private-icon-edit");
    const statusBtnEdit = modal.querySelector(".status-btn-edit");
    const entryStatusEdit = modal.querySelector('[id^="entryStatusEdit"]');


    if (publicIconEdit && statusBtnEdit && entryStatusEdit) {
      publicIconEdit.addEventListener("click", () => {
        statusBtnEdit.innerHTML = publicIconTemplateEdit;
        entryStatusEdit.value = "public";
      });
    }

    if (privateIconEdit && statusBtnEdit && entryStatusEdit) {
      privateIconEdit.addEventListener("click", () => {
        statusBtnEdit.innerHTML = privateIconTemplateEdit;
        entryStatusEdit.value = "private";
      });
    }
  });
  

  
  // REFRESH BUTTON
  // const refreshBtn = document.querySelector(".refresh-btn")
  // const modalTitle = document.querySelector(".modal-title")
  
  // const question =
  
  // refreshBtn.addEventListener("click", () => {
    
  // })


});