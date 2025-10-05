import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, ISort } from 'app/utils/util.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IDataTableUser, IRequirementUser, IRoles, IUser } from './user.types';
import { IPagination } from 'app/shared/paginator.traslate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  dataTableUser({ length, pageIndex, pageSize }: IPagination, { active, direction }: ISort): Observable<IResponse<IDataTableUser>> {
    const response = this._httpClient
      .post<IResponse<IDataTableUser>>(
        `${environment.apiUrl}/user/data-table`,
        {
          length,
          pageIndex,
          pageSize,
          active,
          direction
        }
      );
    return response;
  }

  public userRequeriments(): Observable<IResponse<IRequirementUser>> {
    const response = this._httpClient
      .get<IResponse<IRequirementUser>>(
        `${environment.apiUrl}/user/requeriment`,
      );
    return response;
  }

  public userStore(user: IUser): Observable<IResponse<IUser>> {
    const response = this._httpClient
      .post<IResponse<IUser>>(
        `${environment.apiUrl}/user`, user
      );
    return response;
  }

  public userUpdate(user: IUser): Observable<IResponse<IUser>> {
    const response = this._httpClient
      .put<IResponse<IUser>>(
        `${environment.apiUrl}/user/${user.id}`, user
      );
    return response;
  }

  public userEdit(user_id: number): Observable<IResponse<IUser>> {
    const response = this._httpClient
      .get<IResponse<IUser>>(
        `${environment.apiUrl}/user/${user_id}`,
      );
    return response;
  }

  public userDelete(user_id: number): Observable<IResponse<IUser>> {
    const response = this._httpClient
      .delete<IResponse<any>>(
        `${environment.apiUrl}/user/${user_id}`,
      );
    return response;
  }
}
