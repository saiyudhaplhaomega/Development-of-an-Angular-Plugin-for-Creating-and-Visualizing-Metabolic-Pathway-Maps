import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDateService {

  constructor() { }

  getDate() {
    let currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();

    const offset = currentDate.getTimezoneOffset();
    currentDate = new Date(currentDate.getTime() - (offset * 60 * 1000));
    return `${currentDate.toISOString().split('T')[0]} ${currentHour}:${currentMinute}:${currentSecond}`;
  }
}
