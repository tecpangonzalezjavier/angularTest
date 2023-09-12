import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const today = new Date()
    const year = today.getFullYear().toString().padStart(4, '0');
    const month = (today.getMonth()+1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, "0")
    const date = `${year}-${month}-${day}`;
    this.selectedDate = date;
  }


  selectedUnit: string = 'day';
  quantity: number = 0;
  selectedDate: String = '2023-10-12';
  FinalDate: Date | undefined;

  submitForm() {
    const date2 = new Date(Date.parse(this.selectedDate + 'T06:00:00.000Z'))
    const dateUTC = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()));
    this.FinalDate = dateUTC;

    if (this.selectedUnit === 'day') {
      if (this.quantity!=0){
        this.FinalDate.setDate(date2.getDate()-1 + this.quantity);
      }
    } else if (this.selectedUnit === 'month') {
      this.FinalDate.setMonth(date2.getMonth() + this.quantity);
    } else if (this.selectedUnit === 'year') {
      this.FinalDate.setFullYear(date2.getFullYear() + this.quantity);
    }
  }

}
