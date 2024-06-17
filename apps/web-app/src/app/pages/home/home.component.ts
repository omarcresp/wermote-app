import { Component } from '@angular/core';

import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { TypeSliderComponent } from './components/type-slider/type-slider.component';
import { RemotePerksComponent } from './components/remote-perks/remote-perks.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    HomeBannerComponent,
    TypeSliderComponent,
    RemotePerksComponent,
    HomeFooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
