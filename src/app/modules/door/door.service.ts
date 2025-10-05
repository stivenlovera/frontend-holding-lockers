import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from 'app/shared/paginator.traslate';
import { IResponse, ISort } from 'app/utils/util.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IController, IDataTableController, IListController } from '../locker/locker.types';
import { CardLockerProps } from '../dashboard/dashboard.types';
import { IDataTableDoor, IDoor, RequerimentsProp } from './door.type';


@Injectable({
  providedIn: 'root'
})
export class DoorService {

  constructor(
    private _httpClient: HttpClient
  ) { }


  public dataTableDoor(locker_id: number, { length, pageIndex, pageSize }: IPagination, { active, direction }: ISort): Observable<IResponse<IDataTableDoor>> {
    const response = this._httpClient
      .post<IResponse<IDataTableDoor>>(
        `${environment.apiUrl}/door/data-table`,
        {
          locker_id,
          length,
          pageIndex,
          pageSize,
          active,
          direction
        }
      );
    return response;
  }

  public doorRequeriments(locker_id: number): Observable<IResponse<RequerimentsProp>> {
    const response = this._httpClient
      .post<IResponse<RequerimentsProp>>(
        `${environment.apiUrl}/door/requirement`, { locker_id }
      );
    return response;
  }

  public doorStore(door: IDoor): Observable<IResponse<IDoor>> {
    const response = this._httpClient
      .post<IResponse<IDoor>>(
        `${environment.apiUrl}/door`,  door 
      );
    return response;
  }

  public doorUpdate(door: IDoor): Observable<IResponse<IDoor>> {
    const response = this._httpClient
      .put<IResponse<IDoor>>(
        `${environment.apiUrl}/door/${door.door_id}`,  door 
      );
    return response;
  }

  public doorEdit(door_id: number): Observable<IResponse<IDoor>> {
    const response = this._httpClient
      .get<IResponse<IDoor>>(
        `${environment.apiUrl}/door/${door_id}`,
      );
    return response;
  }

  public doorDelete(door_id: number): Observable<IResponse<any>> {
    const response = this._httpClient
      .get<IResponse<any>>(
        `${environment.apiUrl}/door/${door_id}`,
      );
    return response;
  }

  //Controller

  public dataTableController(locker_id: number, { length, pageIndex, pageSize }: IPagination, { active, direction }: ISort): Observable<IResponse<IDataTableController>> {
    const response = this._httpClient
      .post<IResponse<IDataTableController>>(
        `${environment.apiUrl}/controller/data-table`,
        {
          locker_id,
          length,
          pageIndex,
          pageSize,
          active,
          direction
        }
      );
    return response;
  }

  public controllerRequeriments(): Observable<IResponse<CardLockerProps>> {
    const response = this._httpClient
      .get<IResponse<CardLockerProps>>(
        `${environment.apiUrl}/door/requirement`,
      );
    return response;
  }

  public controllerStore(door: IDoor): Observable<IResponse<IController>> {
    const response = this._httpClient
      .post<IResponse<IController>>(
        `${environment.apiUrl}/door`, { door }
      );
    return response;
  }

  public controllerUpdate(door_id: number, door: IDoor): Observable<IResponse<IController>> {
    const response = this._httpClient
      .put<IResponse<IController>>(
        `${environment.apiUrl}/door/${door_id}`, { door }
      );
    return response;
  }

  public controllerEdit(door_id: number): Observable<IResponse<IController>> {
    const response = this._httpClient
      .get<IResponse<IController>>(
        `${environment.apiUrl}/door/${door_id}`,
      );
    return response;
  }

  public controllerDelete(door_id: number): Observable<IResponse<IController>> {
    const response = this._httpClient
      .get<IResponse<IController>>(
        `${environment.apiUrl}/door/${door_id}`,
      );
    return response;
  }
}
