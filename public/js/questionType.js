let qType = "";

document.getElementById("nextQuestionBtn").addEventListener("click", async () => {
  const selectedType = document.querySelector('input[name="questionType"]:checked').value;

  // Choose the right API route
  const apiUrl = selectedType === "simple" ? "/user/api/simplequestion" : "/user/api/question";
  qType = apiUrl;

  try {
    const res = await fetch(apiUrl);
    const question = await res.json();

    document.getElementById("questionHeading").textContent = question;
    document.getElementById("questionInput").value = question;

    // Show the main modal
    const questionsModalEl = bootstrap.Modal.getInstance(document.getElementById("questionsModal"));
    questionsModalEl.hide();

    const mainModal = new bootstrap.Modal(document.getElementById("mainModal"));
    mainModal.show();

  } catch (err) {
    console.error("Failed to load question:", err);
    alert("Couldn't load a question. Try again.");
  }
});

document.querySelector(".refresh-btn").addEventListener("click", async () => {
    try{
        const res = await fetch(qType);
        const question = await res.json()
        console.log(question)

        document.getElementById("questionHeading").textContent = question;
        document.getElementById("questionInput").value = question;
    } catch {
        console.error("Failed to load question:", err);
    }
})

