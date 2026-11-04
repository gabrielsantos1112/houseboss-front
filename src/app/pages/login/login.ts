import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User, UserLoginPayload } from '../../services/user';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinnerModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None
})

export class Login {
  logoForm = 'img/Logotipo House Boss Barberaria.png';
  form: FormGroup<{ email: FormControl<string>, senha: FormControl<string> }>;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder, private user: User, private router: Router) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      senha: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true })
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    const formData = this.form.value as UserLoginPayload;
    this.isLoading = true;

    this.user.login(formData).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro ao entrar', error)
        window.alert('E-mail ou senha incorretos. Tente novamente.');
        this.form.reset();
      }
    })
  }
}