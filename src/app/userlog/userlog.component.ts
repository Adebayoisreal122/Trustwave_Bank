import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlog',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.css']
})
export class UserlogComponent {
  accountNumber = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  Submit(loginForm: NgForm) {
    if (!loginForm.valid) {
      this.errorMessage = 'Account number and password are required.';
      return;
    }

    this.errorMessage = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const formData = {
      AccountNumber: this.accountNumber,
      password: this.password
    };

    this.http
      .post('http://localhost/bank_app/customerLogin.php', formData, { headers })
      .subscribe(
        (response: any) => {
          if (response.status === 'success') {
            // Navigate to the dashboard after successful login
            this.router.navigate(['/userdash']);
          } else {
            // Display an error message
            this.errorMessage = response.message; // Corrected to use response message
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred. Please try again.';
          console.error('Error occurred:', error);
        }
      );
  }
}
