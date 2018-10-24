import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ButtonModule,
          AccordionModule,
          ScheduleModule
} from 'primeng/primeng';

import 'fullcalendar';

import * as jQuery from 'jquery';
(window as any).jQuery = (window as any).$ = jQuery;

 @NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ButtonModule,
    AccordionModule,
    ScheduleModule
  ],
  declarations: []
})
export class PrimeModule { }
