const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("formResponse");
const submitBtn = contactForm.querySelector("button[type='submit']");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  responseMessage.classList.add("open");
  responseMessage.textContent = "Please wait...";

  try {
    const res = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      responseMessage.textContent = "Thanks! Your message has been sent.";
      contactForm.reset();
    } else {
      responseMessage.textContent = "Something went wrong. Please try again.";
    }
  } catch (error) {
    console.error(error.message);
    responseMessage.textContent = "Network error. Please check your connection and try again.";
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Send Message";

  setTimeout(() => {
    responseMessage.classList.remove("open");
  }, 4000);
});