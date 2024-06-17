import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { IPlaceType } from '../../../../core/interface/workplaces';

@Component({
  selector: 'app-type-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-slider.component.html',
  styleUrl: './type-slider.component.scss'
})
export class TypeSliderComponent {
  // TODO: move to backend API
  public workSpaces: IPlaceType[] = [
    { id: "1", name: "Biblioteca", image: "/assets/work-types/biblioteca.svg"},
    { id: "2", name: "Coworking", image: "/assets/work-types/coworking.svg"},
    { id: "3", name: "Vista al mar", image: "/assets/work-types/mar.svg"},
    { id: "4", name: "Oficinas", image: "/assets/work-types/oficina.svg"},
    { id: "5", name: "Zonas Urbanas", image: "/assets/work-types/urbanas.svg"},
    { id: "6", name: "Zonas Verdes", image: "/assets/work-types/verdes.svg"},
  ];

}
