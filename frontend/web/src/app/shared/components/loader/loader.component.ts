import { Component, Input } from '@angular/core';

@Component({
  selector: 'wcw-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() public color: 'primary' | 'accent' | 'warn' | string;
  @Input() public size: string;
}
