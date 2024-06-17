import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';

const declarations = [ButtonComponent, IconComponent]
const imports = [CommonModule, ReactiveFormsModule, FormsModule]

@NgModule({
  declarations,
  imports,
  exports: [...declarations, imports],
})
export class SharedModule {}
