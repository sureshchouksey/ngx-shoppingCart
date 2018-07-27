import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Device} from '../model/device';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','x-access-token':'eyJhbGciOiJIUzI1NiJ9.d29ya3BsYWNlT04.wY1KNDeJJqYKOQzF6KHsA-43k89vi86bX3gQckpbBfA' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) { }
	serverUrl:String = 'https://gwalaserver.herokuapp.com/api';
	//serverUrl:String = 'http://localhost:5000/api';
	//serverUrl:String = 'http://159.8.214.55';
  register(user:any): Observable<any> {
        return this.http.post<any>(`${this.serverUrl}/user`, JSON.stringify(user), httpOptions).pipe(
	      tap((user:any) => console.log(`added user w/ id=${user.username}`)),
	      catchError(this.handleError<any>('addHero'))
	    );
    }

		getAllUsers():Observable<any[]>{
    	 return this.http.get<any[]>(`${this.serverUrl}/users`,httpOptions)
	      .pipe(
	        tap(users => console.log(`fetched getAllUsers`)),
	        catchError(this.handleError('getAllUsers', []))
	      );
		}

		getAllAgents():Observable<any[]>{
    	 return this.http.get<any[]>(`${this.serverUrl}/agent/getAllAgents`,httpOptions)
	      .pipe(
	        tap(agents => console.log(`fetched getAllAgents`)),
	        catchError(this.handleError('getAllAgents', []))
	      );
		}

		getAgentById(userId:number):Observable<any[]>{
    	 return this.http.get<any[]>(`${this.serverUrl}/agent/getAgentById/${userId}`,httpOptions)
	      .pipe(
	        tap(agent => console.log(`fetched getAgentById`)),
	        catchError(this.handleError('getAgentById', []))
	      );
		}


		getUser(user):Observable<any[]>{

    	 return this.http.get<any[]>(`${this.serverUrl}/users/${user.username}`,httpOptions)
	      .pipe(
	        tap(users => console.log(`fetched heroes`)),
	        catchError(this.handleError('getAllUsers', []))
	      );
		}

		editUser(user): Observable<any> {       

        return this.http.put<any>(`${this.serverUrl}/user/${user._id}`, JSON.stringify(user), httpOptions).pipe(
	      tap((user:any) => console.log(`added hero w/ id=${user.username}`)),
	      catchError(this.handleError<Device>('addHero'))
	    );
		}
		
		searchUser(searchUser):Observable<Device[]>{
			 return this.http.post<any[]>(`${this.serverUrl}/user/search`,JSON.stringify(searchUser),httpOptions)
	      .pipe(
	        tap(devices => console.log(`searchUser`)),
	        catchError(this.handleError('searchUser', []))
	      );
		}

		searchAgent(searchAgent):Observable<Device[]>{
			 return this.http.post<any[]>(`${this.serverUrl}/agent/search`,JSON.stringify(searchAgent),httpOptions)
	      .pipe(
	        tap(agents => console.log(`searchAgent`)),
	        catchError(this.handleError('searchAgent', []))
	      );
		}

		updateAgent(updateAgent):Observable<Device[]>{
			 return this.http.put<any[]>(`${this.serverUrl}/agent/updateAgent`,JSON.stringify(updateAgent),httpOptions)
	      .pipe(
	        tap(agents => console.log(`updateAgent`)),
	        catchError(this.handleError('updateAgent', []))
	      );
		}

		getAllOrders():Observable<any[]>{
    	 return this.http.get<any[]>(`${this.serverUrl}/orders`,httpOptions)
	      .pipe(
	        tap(orders => console.log(`fetched getAllOrders`)),
	        catchError(this.handleError('getAllOrders', []))
	      );
		}

		searchOrder(searchOrder):Observable<any[]>{
			 return this.http.post<any[]>(`${this.serverUrl}/user/searchOrder`,JSON.stringify(searchOrder),httpOptions)
	      .pipe(
	        tap(orders => console.log(`searchOrder`)),
	        catchError(this.handleError('searchOrder', []))
	      );
		}

		getAllCoupons():Observable<any[]>{
    	 return this.http.get<any[]>(`${this.serverUrl}/getAllCoupons`,httpOptions)
	      .pipe(
	        tap(coupons => console.log(`fetched getAllCoupons`)),
	        catchError(this.handleError('getAllCoupons', []))
	      );
		}

		searchCoupon(searchCoupon):Observable<any[]>{
			 return this.http.post<any[]>(`${this.serverUrl}/searchCoupon`,JSON.stringify(searchCoupon),httpOptions)
	      .pipe(
	        tap(orders => console.log(`searchCoupon`)),
	        catchError(this.handleError('searchCoupon', []))
	      );
		}


     /**
	   * Handle Http operation that failed.
	   * Let the app continue.
	   * @param operation - name of the operation that failed
	   * @param result - optional value to return as the observable result
	   */
	  private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead

	      // TODO: better job of transforming error for user consumption
	      console.log(`${operation} failed: ${error.message}`);

	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	  }   
}
