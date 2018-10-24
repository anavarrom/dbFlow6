// External modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom modules
import { PrimeModule             } from './prime.module';
import { MaterialModule          } from './material.module';

// Custom Components
import {ErrorDetailComponent} from './error-detail/error-detail.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeModule,
    MaterialModule
  ],
  declarations: [ErrorDetailComponent],
  entryComponents: [
    ErrorDetailComponent
  ],
})
export class SharedModule { }
