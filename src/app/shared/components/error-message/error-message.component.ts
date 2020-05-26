import { Component, Input  } from '@angular/core';

@Component({
  selector: 'wcw-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() public errorMessage: string;
}
