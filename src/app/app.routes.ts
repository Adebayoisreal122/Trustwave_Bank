import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersignComponent } from './usersign/usersign.component';
import { UserlogComponent } from './userlog/userlog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserdashComponent } from './userdash/userdash.component';

export const routes: Routes = [


    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'home', redirectTo: '', pathMatch: 'full'},


    { path: 'usersignup', component: UsersignComponent, title: 'UserSignUp' },

    { path: 'userlogin', component: UserlogComponent, title: 'UserLogIn' },
    { path: 'userdash', component: UserdashComponent, title: 'UserDashboard' },


    
    
    
    
    
    
    { path: '**', component: PageNotFoundComponent, title: 'NotFoundPage' },
];
