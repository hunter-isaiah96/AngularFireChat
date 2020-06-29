import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '@services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private authService: AuthService,
    private router: Router
  ) {
    this.titleService.setTitle('Register');
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, ValidationService.emailValidator]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        conf_password: ['', [Validators.required, Validators.minLength(7)]],
      },
      { validator: this.checkPasswordMatches }
    );
  }

  checkPasswordMatches(formGroup: FormGroup) {
    let pass = formGroup.get('password').value;
    let conf_pass = formGroup.get('conf_password').value;

    let result = pass === conf_pass ? null : { notSame: true };
    return result;
  }

  register() {
    // this.formSubmitted = true;
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.authService.signUp(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      this.authService.user$.subscribe((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
        }
      });
    }
  }
}
