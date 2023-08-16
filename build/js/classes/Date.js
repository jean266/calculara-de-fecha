import {
  dayInput,
  monthInput,
  yearInput,
  btnSubmit,
  daysRemaining,
  monthsRemaining,
  yearsRemaining,
} from "../selectors.js";

import UI from "./UI.js";

// Instanciar class
const ui = new UI();

const monthShort = [4, 6, 9, 11];

export const dateObj = {
  day: "",
  month: "",
  year: "",
};

export default class Fecha {
  limitDay() {
    // Limita la cantidad de numeros en el input
    dayInput.value = dayInput.value.replace(/[^A-Z\d]/g, "");
    if (dayInput.value.length > 2) {
      dayInput.value = dayInput.value.slice(0, 2);
    }

    // Validar si el campo esta lleno
    if (this.validateEmpty(dayInput)) {

      // Verificar el maximo del meses, segun el mes y el año
      this.monthLengthDay();

    }
  }

  limitMonth() {
    // Limita la cantidad de numeros en el input
    monthInput.value = monthInput.value.replace(/[^A-Z\d]/g, "");
    if (monthInput.value.length > 2) {
      monthInput.value = monthInput.value.slice(0, 2);
    }

    // Validar si el campo esta lleno
    if (this.validateEmpty(monthInput)) {

      // Verificar el maximo del meses, segun el mes y el año
      this.monthLengthDay();

    } 
  }

  // Limita la cantidad de numeros en el input
  limitYear() {
    yearInput.value = yearInput.value.replace(/[^A-Z\d]/g, "");
    if (yearInput.value.length > 4) {
      yearInput.value = yearInput.value.slice(0, 4);
    }

    // Validar si el campo esta lleno
    if (this.validateEmpty(yearInput)) {

      // Verificar el maximo del meses, segun el mes y el año
      this.monthLengthDay()
      
    }
  }

  // Verifica que todos los campos esten llenos
  validateEmpty(input) {
    if (input.value === "" || input.value === undefined) {
      ui.sprintMessage("This filed is required", input.parentElement);
      return false;
    }

    ui.cleanAlert(input.parentElement);
    return true;
  }

  monthLengthDay() {
    // Verifica si los meses tiene 30 o 31 dias
    if (dayInput.value > 31) {
      ui.sprintMessage("Must be a valid day", dayInput.parentElement);
      ui.sprintMessage("", monthInput.parentElement);
      ui.sprintMessage("", yearInput.parentElement);
      dateObj.day = "";
      return;
    } else if (
      monthInput.value !== "" &&
      monthShort.includes(parseInt(monthInput.value)) &&
      dayInput.value > 30
    ) {
      ui.sprintMessage("Must be a valid day", dayInput.parentElement);
      ui.sprintMessage("", monthInput.parentElement);
      ui.sprintMessage("", yearInput.parentElement);
      dateObj.month = "";
      return;
    } else if (
      monthInput.value !== "" &&
      monthInput.value == 2 &&
      dayInput.value >= 29
    ) {
      if (yearInput.value % 4 === 0 && dayInput.value == 29) {
        ui.cleanAlert(dayInput.parentElement);
        ui.cleanAlert(monthInput.parentElement);
        ui.cleanAlert(yearInput.parentElement);
        return;
      } else {
        ui.sprintMessage("Must be a valid day", dayInput.parentElement);
        ui.sprintMessage("", monthInput.parentElement);
        return;
      }
    } 

    // Validar que el mes no sea mayor a 12
    if (monthInput.value > 12) {
      ui.sprintMessage("", dayInput.parentElement);
      ui.sprintMessage("Must be a valid month", monthInput.parentElement);
      ui.sprintMessage("", yearInput.parentElement);
      dateObj.month = "";
      return;
    } 

    if(this.carrentDate()) {
      console.log(dateObj);
      // Limpiar alertas 
      ui.cleanAlert(dayInput.parentElement);
      ui.cleanAlert(monthInput.parentElement);
      ui.cleanAlert(yearInput.parentElement);

      // llenar el objeto
      dateObj.year = yearInput.value;
      dateObj.month = monthInput.value;
      dateObj.day = dayInput.value;

    } else {
      this.cleanObj();
    }


  }

  // Validar que la fecha insertada no sea mayor a la actual 
  carrentDate() {
    const date = new Date();
    
    // valida el año
    if (yearInput.value !== "" && yearInput.value > date.getFullYear()) {
      ui.sprintMessage("Must be in the past", yearInput.parentElement);
      ui.sprintMessage("", monthInput.parentElement);
      ui.sprintMessage("", dayInput.parentElement);
      return false;

    } else if (yearInput.value !== "" && yearInput.value == date.getFullYear()) {

      // valida el mes
      if (monthInput.value !== "" && monthInput.value > date.getMonth() + 1) {

        ui.sprintMessage("", yearInput.parentElement);
        ui.sprintMessage("Must be in the past", monthInput.parentElement);
        ui.sprintMessage("", dayInput.parentElement);
        return false;

      } else if (monthInput.value !== "" && monthInput.value == date.getMonth() + 1) {

        // valida el dia
        if (dayInput.value !== "" && dayInput.value > date.getDate()) {

          ui.sprintMessage("", yearInput.parentElement);
          ui.sprintMessage("", monthInput.parentElement);
          ui.sprintMessage("Must be in the past", dayInput.parentElement);
          return false;

        } else {
          ui.cleanAlert(yearInput.parentElement);
          ui.cleanAlert(monthInput.parentElement);
          ui.cleanAlert(dayInput.parentElement);
        }

      } else {
        ui.cleanAlert(yearInput.parentElement);
        ui.cleanAlert(monthInput.parentElement);
        ui.cleanAlert(dayInput.parentElement);
      }

    } else {
      ui.cleanAlert(yearInput.parentElement);
      ui.cleanAlert(monthInput.parentElement);
      ui.cleanAlert(dayInput.parentElement);
    }

    return true;

  }

  // Limpia el objeto
  cleanObj() {
    dateObj.year = "";
    dateObj.month = "";
    dateObj.day = "";
  }

  // Funcion para saber la fecha que a pasado
  dateElapsed() {
    const newDate = this.dateFormat();
    const { year, month, day } = newDate;

    const date = `${year}${month}${day}`;
    
    const lastDate = moment(date).format("YYYY-MM-DD");

    let difference = moment.utc().diff(lastDate, "days");

    const lastYears = Math.floor(difference / 365);
    difference = difference - (lastYears * 365);
    const lastMonths = Math.floor(difference / 30.4);
    const lastDays = Math.floor(difference - (lastMonths * 30.4));

    ui.sprintDate(lastYears, lastMonths, lastDays);

    this.cleanObj();

  }

  // Formatear fecha ingresada
  dateFormat() {
    // formatear dia
    let { year, month, day } = dateObj;
    const newDate = {}

    if(day.length === 1) {
      day = "0" + day;
    } 

    if(month.length === 1) {
      month = "0" + month;
    }
    
    if( year.length === 1 ) {
      year = "000" + year;
    } else if ( year.length === 2 ) {
      year = "00" + year;
    } else if ( year.length === 3 ) {
      year = "0" + year;
    } 
    
    newDate.day = day;
    newDate.month = month;
    newDate.year = year;

    return newDate;
  }

}




