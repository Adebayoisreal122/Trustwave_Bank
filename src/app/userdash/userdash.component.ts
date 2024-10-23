import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-userdash',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './userdash.component.html',
  styleUrl: './userdash.component.css'
})
export class UserdashComponent {

  constructor(public http: HttpClient) { }

  public data: any = '';

  view: string = 'home'; // default view
  public details: any[] = [];


   // Example user data, replace these with actual data
   userName: string = '';
   userEmail: string = '';
   userProfilePic: string = '/images/peter.jpg'; // Replace with actual profile picture URL
 
  //  ngOnInit() {
  //   this.http.get('http://localhost/bank_app/customerinfo.php').subscribe((data: any) => {
  //     console.log(data); 
  //     this.details = data;
  //     this.userName = data.userName;
  //     this.userEmail = data.email;
      
  //   });
  //  }


  ngOnInit() {
    this.http.get('http://localhost/bank_app/customerinfo.php').subscribe((data: any) => {
      console.log(data);
      this.details = data;
  
      if (data.length > 0) {
        this.userName = data[0].userName;  // Access the first user
        this.userEmail = data[0].email;    // Access the first user's email
      } else {
        console.log("No user data found.");
      }
    });
  }
  
  setView(selectedView: string) {
    this.view = selectedView;
  }


  
}
