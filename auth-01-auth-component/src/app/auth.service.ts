import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: number,
    localId: string
}
 interface LoginResponseData {
    idToken: string,        //A Firebase Auth ID token for the authenticated user.
    email: string,	        //The email for the authenticated user.
    refreshToken: string,	//A Firebase Auth refresh token for the authenticated user.
    expiresIn: number,	    //The number of seconds in which the ID token expires.
    localId: string, 	    //The uid of the authenticated user.
    registered:	boolean	    //Whether the email is for an existing account.
 }
@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router){}
    private tokenExpirationTimer: any;
    
    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo1vSL7rtuOPsD48zVHVHqft0Ub80llvQ',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.errorHandling), tap(
            resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
            }
        ));
    }

    login(email: string, password: string) {
        return this.http.post<LoginResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo1vSL7rtuOPsD48zVHVHqft0Ub80llvQ',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.errorHandling), tap(
            resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
            }  
        ));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['./auth']);
        localStorage.removeItem('user');
        
        if(this.tokenExpirationTimer){
          clearTimeout(this.tokenExpirationTimer);  
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: { email: string, id: string, _token: string, expirationDate: string }= JSON.parse(localStorage.getItem('user'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData.expirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const duration = new Date(userData.expirationDate).getTime() - new Date().getTime();
            this.autoLogout(duration);
        } 
    }

    autoLogout(expirationDuration: number) { //in millisecond
        this.tokenExpirationTimer = setTimeout( ()=>{
            this.logout(); 
        }, expirationDuration);
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: number){
        const expiresDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, id, token, expiresDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);   //convert to ms
        localStorage.setItem('user', JSON.stringify(user));
    }

    private errorHandling(error: HttpErrorResponse){
        let errorMessage = 'Unknown error occurred';
        if(!error.error || !error.error.error){
            return throwError(errorMessage);
        }
        switch(error.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is not correct';
                break;
        }
        return throwError(errorMessage);
    }
}