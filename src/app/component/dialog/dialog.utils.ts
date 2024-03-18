import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { DialogContent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogUtils {
  dlgData: any;
  constructor(public dialog: MatDialog) { }

  openDialog(_data: any, _hideButton: boolean = false): any {
    _data.hideButton = _hideButton;
    this.dlgData = _data;
    return new Promise((resolve: any) => {
      const dialogRef = this.dialog.open(DialogContent, {
        minWidth: '250px',
        enterAnimationDuration: 100,
        exitAnimationDuration: 100,
        data: _data
      });

      dialogRef.afterClosed().subscribe(() => { resolve() });
    });
  }

  openDlgQuestion(_data: any) {
    _data.isQuestion = true;
    return this.openDialog(_data);
  }

  openSimpleDlg(_data: any) {
    return this.openDialog(_data, true);
  }

  deleteDialog(_data: any): any {
    _data.title = 'Delete';
    return this.deleteDialog(_data)
  }

  closeDialog(): any {
    return new Promise((resolve: any) => {
      this.dialog.closeAll();
      this.dialog.afterAllClosed.subscribe(() => { resolve() });
    });
  }

}
