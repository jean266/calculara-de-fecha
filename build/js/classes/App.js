
import { btnSubmit, dayInput, monthInput, yearInput, dates } from "../selectors.js";

import Fecha, { dateObj } from "./Date.js";
import UI from "./UI.js";

const date = new Fecha();
const ui = new UI();

export default class App {
    constructor () {
        this.initApp();
    }

    initApp() {
        btnSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            
            dates.forEach( e => {
              date.validateEmpty(e.querySelector("input"));
              date.limitDay();
              date.limitMonth();
              date.limitYear();
            })

            if( dateObj.day !== "" && dateObj.month !== "" && dateObj.year !== "" ) {
                date.dateElapsed();
            } else {
                ui.sprintDate("- -", "- -", "- -");
            }
        })
        dayInput.addEventListener("input", e => {
            date.limitDay();
        });
        monthInput.addEventListener("input", e => {
            date.limitMonth();
        });
        yearInput.addEventListener("input", e => {
            date.limitYear();
        });
    }
}