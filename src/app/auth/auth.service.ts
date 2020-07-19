import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators'
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


interface AuthResponsedata // to get the response data from firebase authentication API, we can define the type that we recieve
{
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered? : boolean; // ? is used to decalare optional variables It will be used in sing in method's response
}
@Injectable({providedIn :'root'})
export class AuthService
{
    error: string;
    //user = new Subject<User>(); // contains information whenever new data is emitted
    user= new BehaviorSubject<User>(null); // (BehaviorSubject)always retrun a value if data has loaded or not
    constructor(private http : HttpClient)
    {

    }
    signUp(email : string, password : string)
    {
        return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKDTHDyfT18MLkYW0BH6HIIMk6S6JnXWE',
        {
            email : email,
            password : password,
            returnSecureToken : true

        }).pipe(
            catchError(this.handleError),tap(resdata=>{
                this.handleAuthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)//+ is used to convert string into number
            }));
    }
    login(email :string, password : string)
    {
        return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKDTHDyfT18MLkYW0BH6HIIMk6S6JnXWE',
        {
            email : email,
            password : password,
            returnSecureToken : true

        }).pipe(
            catchError(this.handleError),tap(resdata=>{
                this.handleAuthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)//+ is used to convert string into number
            }));
    }
    private handleAuthentication(email:string,userId : string,token : string, expiresIn:number)
    {
        const expirationDate = new Date(new Date().getTime()+ expiresIn*1000); 
        const user = new User(email, userId,token,expirationDate);
        this.user.next(user);
    }
    private handleError(errorRes : HttpErrorResponse)
    {
        let errorMessage ='An unknown error occured';
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage='Email does not exist';
                break;
            case 'INVALID_PASSWORD' :
                errorMessage='This Password is not correct';
                break;
            case 'USER_DISABLED':
                errorMessage='User has been disabled';
                break;
            
        }
        return throwError(errorMessage);   

    }
}