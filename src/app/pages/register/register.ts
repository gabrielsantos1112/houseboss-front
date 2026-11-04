import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { User } from '../../services/user';

@Component({
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinnerModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None
})
export class Register {

  logoForm = 'img/Logotipo House Boss Barberaria.png';

  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder, private user: User, private router: Router) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const formData = this.form.value;

    this.isLoading = true;

    this.user.register(formData).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        window.alert('E-mail inválido. Insira outro e tente novamente.');
        this.form.reset();
        console.error('Erro ao registrar funcionário', error)
      }
    })
  }
}
