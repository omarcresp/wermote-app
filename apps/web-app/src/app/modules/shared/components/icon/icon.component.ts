import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() icon!: string;
  @Input() width: string = "1em";
  @Input() height: string = "1em";
}
