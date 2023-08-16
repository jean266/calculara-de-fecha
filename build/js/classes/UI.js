import {
  daysRemaining,
  monthsRemaining,
  yearsRemaining,
} from "../selectors.js";

export default class UI {
  sprintMessage(message, container) {
    const messageAlert = document.createElement("P");
    messageAlert.classList.add("alert");
    messageAlert.textContent = message;

    this.cleanAlert(container);
    container.classList.add("message-alert");
    container.appendChild(messageAlert);
  }

  cleanAlert(container) {
    const alert = container.querySelector(".alert");

    if (container.classList.contains("message-alert")) {
      container.classList.remove("message-alert");
      alert.remove();
    }

  }

  // Imprime la fecha en le HTML
  sprintDate(years, months, days) {
    yearsRemaining.textContent = years;
    monthsRemaining.textContent = months;
    daysRemaining.textContent = days;
  }

}
