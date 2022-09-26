import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserContact } from '../model/user-contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlConstants } from '../constant/api.constant';

@Injectable()
export class UserContactService {
  apiUrlContants = ApiUrlConstants;
  constructor(private _httpClient: HttpClient) {}

  getUserContacts(): Observable<UserContact> {
    return this._httpClient.get<UserContact>(
      this.apiUrlContants.apiURL + 'userContacts'
    );
  }

  postUserContact(userContact: UserContact): Observable<UserContact> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._httpClient.post<UserContact>(
      this.apiUrlContants.apiURL + 'userContacts',
      userContact,
      httpOptions
    );
  }

  updateUserContact(
    userContact: UserContact,
    id: number
  ): Observable<UserContact> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this._httpClient.put<UserContact>(
      this.apiUrlContants.apiURL + 'userContacts/' + id,
      userContact,
      httpOptions
    );
  }

  getContactById(id: number): Observable<UserContact> {
    return this._httpClient.get<UserContact>(
      this.apiUrlContants.apiURL + 'userContacts/' + id
    );
  }

  deleteContactById(id: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._httpClient.delete<number>(
      this.apiUrlContants.apiURL + 'userContacts/' + id,
      httpOptions
    );
  }
}
