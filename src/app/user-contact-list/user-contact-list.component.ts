import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogModelComponent } from '../dialog-model/dialog-model.component';
import { displayedColumns } from '../enum/displayed-columns.enum';
import { UserContact } from '../model/user-contact.model';
import { CommunicationService } from '../service/communication.service';
import { UserContactService } from '../service/user-contact.service';

@Component({
  selector: 'app-user-contact-list',
  templateUrl: './user-contact-list.component.html',
  styleUrls: ['./user-contact-list.component.less'],
})
export class UserContactListComponent implements OnInit {
  contactList: UserContact[];
  subscription: Subscription;
  displayedColumns: string[] = [
    displayedColumns.FirstName,
    displayedColumns.LastName,
    displayedColumns.DOB,
    displayedColumns.Email,
    displayedColumns.Gender,
    displayedColumns.Address,
    displayedColumns.Delete,
    displayedColumns.Edit,
  ];
  constructor(
    private _userContactService: UserContactService,
    private _router: Router,
    private _dialog: MatDialog,
    private _communicationService: CommunicationService
  ) {
    this.subscription = this._communicationService
      .getMessage()
      .subscribe((message: boolean) => {
        if (message) {
          this.getContactList();
        }
      });
  }

  ngOnInit(): void {
    this.getContactList();
  }

  getContactList(): void {
    this._userContactService.getUserContacts().subscribe((data: any) => {
      this.contactList = data;
      let lastIndex = this.contactList.length - 1;
      let lastId = '' + this.contactList[lastIndex].id;
      localStorage.setItem('LastID', lastId);
    });
  }

  deleteContact(id: number) {
    this._userContactService.deleteContactById(id).subscribe(() => {
      this.getContactList();
    });
  }

  editUserContact(id: number) {
    this._userContactService.getContactById(id).subscribe((response) => {
      localStorage.setItem('userContact', JSON.stringify(response));
      this.openDialog();
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this._dialog.open(DialogModelComponent, dialogConfig);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
