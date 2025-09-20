import { Injectable } from '@angular/core';
import { IResponse } from 'app/utils/util.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { ILocker } from './locker.types';

@Injectable({
  providedIn: 'root'
})
export class LockerService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getLockerStatus(locker_id: number): Observable<IResponse<ILocker>> {
    const response = this._httpClient
      .post<IResponse<ILocker>>(
        `${environment.apiUrl}/locker/get-status`,
        { locker_id }
      );
    return response;
  }
}
