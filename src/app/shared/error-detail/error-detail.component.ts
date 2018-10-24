// External Imports
import { Component, OnInit, Inject } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

// Custom modules
// Custom Components
import {IException} from '../../../models/exception';

@Component({
  selector: 'app-error-detail',
  templateUrl: './error-detail.component.html',
  styleUrls: ['./error-detail.component.css']
})
export class ErrorDetailComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ErrorDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IException ) {

  }

  ngOnInit() {
  }
}
