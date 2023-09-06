// shared.module.ts
import { NgModule } from '@angular/core';
import { appNoLeadingSpace } from '../../directive/trim-input.directive';
import { appImageFileValidator } from '../../directive/file-input.directive';

@NgModule({
  declarations: [appNoLeadingSpace,appImageFileValidator],
  exports: [appNoLeadingSpace,appImageFileValidator]
})
export class SharedModule {}




