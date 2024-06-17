import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-complete-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './complete-layout.component.html',
})
export class CompleteLayoutComponent {

}
