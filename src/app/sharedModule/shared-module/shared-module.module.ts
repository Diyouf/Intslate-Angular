// shared.module.ts
import { NgModule } from '@angular/core';
import { appNoLeadingSpace } from '../../directive/trim-input.directive';

@NgModule({
  declarations: [appNoLeadingSpace],
  exports: [appNoLeadingSpace]
})
export class SharedModule {}




