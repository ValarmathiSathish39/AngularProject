import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from '../service/communication.service';

@Component({
  selector: 'app-dialog-model',
  templateUrl: './dialog-model.component.html',
  styleUrls: ['./dialog-model.component.less'],
})
export class DialogModelComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<DialogModelComponent>,
    private _communicationService: CommunicationService
  ) {}

  ngOnInit(): void {}
  closePopUp(): void {
    this._dialogRef.close();
    this._communicationService.sendMessage(true);
  }
}
