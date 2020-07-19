import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy
{
    private userSubsecription : Subscription;
    isAuthenticated = false;
    constructor(private httpService : DataStorageService, private authService : AuthService){}
    onSaveData()
    {
        this.httpService.storageRecipes();
    }

    onFetchData()
    {
        console.log("**************************");
        this.httpService.fetchRecipes();
    }
    ngOnInit()
    {
        this.userSubsecription=this.authService.user.subscribe(user=>{
            //will get data in user object if user is logged in
            this.isAuthenticated= !user ? false : true;
            console.log(!user);
            console.log(!!user);
        });
    }
    ngOnDestroy()
    {
        this.userSubsecription.unsubscribe();
    }
}