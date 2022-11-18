import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UsersService)
   {
      this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.email],
        phone: ['', Validators.maxLength(12)],
        password: formBuilder.control(['', Validators.compose([Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])]),
        passwordConfirm: formBuilder.control(['', Validators.required])
      })

      this.registerForm.addValidators(
        createCompareValidator(
          this.registerForm.get('password'),
          this.registerForm.get('passwordConfirm')
        )
      );
   }

  ngOnInit(): void {
  }

  registerData(form: any){
    console.log(this.registerForm.value)
    this.userService.addUser(
      this.registerForm.value.first_name,
      this.registerForm.value.last_name,
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.phone,
      this.registerForm.value.password,
    ).pipe(first()).subscribe({
      next: (v) => this.route.navigate(['login']),
      error:(e) => {alert("Kayıt başarısız, lütfen girdilerinizi kontrol ediniz!!")}
    })
}
}

function  createCompareValidator(controlOne: any, controlTwo: any) {
  return () => {
  if (controlOne.value !== controlTwo.value)
    return { match_error: 'Parola doğrulaması hatalı!!' };
  return null;
};

}
