import { map } from 'rxjs/operators';
// import { User } from 'src/app/_models/user';
import { PaginatedResult, Pagination } from './../_models/pagination';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(page? , itemsPerPage? , userParams?, likeParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
    }

    if (likeParams === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likeParams === 'Likees') {
      params = params.append('likees', 'true');
    }


    return this.http.get<User[]>(this.baseUrl + 'Users', { observe : 'response', params})
      .pipe(
          map(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
          })
      );
  }

  getuser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'Users/' + id);
  }

  updateUser(id: number, user: User) {
      return this.http.put(this.baseUrl + 'Users/' + id, user);
  }

  setMainPhoto(userid: number, id: number) {
    return this.http.post(this.baseUrl + 'Users/' + userid + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'Users/' + userId + '/photos/' + id);
  }

  sendLike(id: number,  recipientId: number) {
    return this.http.post(this.baseUrl  + 'Users/' + id + '/like/' + recipientId, {});
  }
}
