import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface IPerk {
  img: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-remote-perks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './remote-perks.component.html',
})
export class RemotePerksComponent {
  public perks: IPerk[] = [
    {
      img: '/assets/perks/creatividad.svg',
      title: 'Mayor Creatividad',
      content: 'Aumentan tu capacidad creativa cambiando de ambiente y conociendo nuevas personas',
    },
    {
      img: '/assets/perks/experiencia.svg',
      title: 'Experiencia',
      content: 'Te sacamos de la rutina con nuevos espacios por descibrir.',
    },
    {
      img: '/assets/perks/servicio.svg',
      title: 'Servicio Excelente',
      content: 'Nuestros host están certificados y calificados para darte el mejor servicio.',
    },
  ];
}
