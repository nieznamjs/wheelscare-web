import { Component, OnInit } from '@angular/core';
import Calendar from 'tui-calendar';

@Component({
  selector: 'wcw-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public ngOnInit(): void {
    const calendar = new Calendar('#calendar', {
      defaultView: 'month',
      useCreationPopup: true,
    });
  }
}
