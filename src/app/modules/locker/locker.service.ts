import { Injectable } from '@angular/core';
import { IResponse, ISort } from 'app/utils/util.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IDoor, ILocker, ILockerProps, StatusInfoProp } from './locker.types';
import { CardLockerProps, IRequerimentLocker } from '../dashboard/dashboard.types';

@Injectable({
  providedIn: 'root'
})
export class LockerService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getLockerStatus(locker_id: number): Observable<IResponse<StatusInfoProp>> {
    const response = this._httpClient
      .post<IResponse<StatusInfoProp>>(
        `${environment.apiUrl}/locker/get-status`,
        { locker_id }
      );
    return response;
  }

  public getLockerRequeriments(): Observable<IResponse<IRequerimentLocker>> {
    const response = this._httpClient
      .get<IResponse<IRequerimentLocker>>(
        `${environment.apiUrl}/locker/requirement`,
      );
    return response;
  }

  public lockerStore(locker: ILocker): Observable<IResponse<number>> {
    const response = this._httpClient
      .post<IResponse<number>>(
        `${environment.apiUrl}/locker`, locker
      );
    return response;
  }

  public lockerUpdate(locker: ILocker): Observable<IResponse<ILocker>> {
    const response = this._httpClient
      .put<IResponse<ILocker>>(
        `${environment.apiUrl}/locker/${locker.locker_id}`, locker
      );
    return response;
  }

  public lockerEdit(locker_id: number): Observable<IResponse<ILocker>> {
    const response = this._httpClient
      .get<IResponse<ILocker>>(
        `${environment.apiUrl}/locker/${locker_id}`,
      );
    return response;
  }

  public lockerDelete(locker_id: number): Observable<IResponse<any>> {
    const response = this._httpClient
      .get<IResponse<any>>(
        `${environment.apiUrl}/locker/${locker_id}`,
      );
    return response;
  }
}
