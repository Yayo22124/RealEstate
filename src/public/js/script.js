document.addEventListener("DOMContentLoaded", function () {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      setTimeout(function () {
        errorMessage.style.display = "none";
      }, 5000); 
    });
  });
  