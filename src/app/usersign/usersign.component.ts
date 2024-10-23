import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersign',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './usersign.component.html',
  styleUrl: './usersign.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class UsersignComponent {

  constructor(public http: HttpClient, public routed:Router) { }


  public data: any = '';


  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Username: ['', Validators.required],
    Password: ['', Validators.required]

  });
  
  secondFormGroup = this._formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    PhoneNumber: ['', Validators.required]
  });

  thirdFormGroup = this._formBuilder.group({
    Address: ['', Validators.required]
  });

  fourthFormGroup = this._formBuilder.group({
    DateOf: ['', Validators.required]
  });
  submit(){


    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const formData = {
      FirstName: this.firstFormGroup.value.FirstName,
      LastName: this.firstFormGroup.value.LastName,
      Username: this.firstFormGroup.value.Username,
      Password: this.firstFormGroup.value.Password,
      Email: this.secondFormGroup.value.Email,
      PhoneNumber: this.secondFormGroup.value.PhoneNumber,
      Address: this.thirdFormGroup.value.Address,
      DateOf: this.fourthFormGroup.value.DateOf
    };
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid || this.fourthFormGroup.invalid) {
      console.log("Please complete all required fields.");
      return;
  }
  
  this.http.post('http://localhost/bank_app/customersignup.php', formData, { headers }).subscribe(
    (data: any) => {
      console.log('Success:', data);
      alert("An email has been sent to your email address. Please check your account number before logging in.");
      this.routed.navigate(['/userlogin']);
    },
    (error) => {
      console.error('Error occurred:', error);
    }
  );
  
  }
}
