import { Component, Inject, Injectable, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogUtils } from './dialog.utils';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogContent implements OnDestroy {
  title = 'Dialog';
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogContent>,
    private dlgUtils: DialogUtils,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnDestroy(): void {
    this.data.routeTrips = false;
    this.data.addTrip = false;
    this.data.addCity = false;
    this.data.addTouSpot = false;
    this.data.isQuestion = false;
    this.data.isEditing = false;
    this.dlgUtils.dlgData = this.data;
  }
}
