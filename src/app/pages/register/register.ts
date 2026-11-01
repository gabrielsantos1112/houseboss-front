import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None
})
export class Register {

  logoForm = 'img/Logotipo House Boss Barberaria.png';

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    console.log("Formulário submetido ",this.form.value)
  }

}
