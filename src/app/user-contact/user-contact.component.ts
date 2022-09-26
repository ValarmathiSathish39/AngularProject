import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserContact } from '../model/user-contact.model';
import { UserContactService } from '../service/user-contact.service';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.less'],
})
export class UserContactComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<boolean>();
  userContactForm: FormGroup;
  show: boolean = false;
  userContact: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _userContactService: UserContactService,
    private _router: Router
  ) {
    let contact = localStorage.getItem('userContact');
    this.userContact = contact ? JSON.parse(contact) : null;
    localStorage.removeItem('userContact');
  }

  ngOnInit(): void {
    this.buildFormGroup();

    if (this.userContact) {
      this.mapFormGroup(this.userContact);
    }
  }

  onFormSubmit(): void {
    console.log(this.userContactForm.value);
    if (!this.userContactForm.value.id) {
      let userContact = this.mapUserContact();
      this._userContactService.postUserContact(userContact).subscribe(() => {
        this.userContactForm.reset();
        this._router.navigate(['/contactList']);
        this.closeEvent.emit(true);
      });
    } else {
      let id = this.userContactForm.value.id;
      let userContact = this.mapUserContact();
      this._userContactService
        .updateUserContact(userContact, id)
        .subscribe(() => {
          this.userContactForm.reset();
          this._router.navigate(['/contactList']);
          this.closeEvent.emit(true);
        });
    }
  }

  resetForm(): void {
    this.userContactForm.reset();
  }

  buildFormGroup(): void {
    this.userContactForm = this._formBuilder.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: this._formBuilder.group({
        addressLine: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      }),
    });
  }

  mapUserContact(): UserContact {
    let userContactFormValue = this.userContactForm.value;
    userContactFormValue.dob = userContactFormValue.dob.toString();
    if (!userContactFormValue.id) {
      let lastId = localStorage.getItem('LastID');
      userContactFormValue.id = lastId
        ? parseInt(lastId) + 1
        : Math.floor(Math.random() * 10) + 1;
      localStorage.removeItem('lastID');
    }
    return userContactFormValue;
  }

  mapFormGroup(userContact: UserContact): void {
    this.userContactForm.setValue(userContact);
  }

  closePopUp(): void {
    this.closeEvent.emit(true);
  }
}
