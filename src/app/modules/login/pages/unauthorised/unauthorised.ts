import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { LoginButton } from '../../components/login-button/login-button';
import { CommonModule } from '@angular/common';
import { SendMail } from '../../services/send-mail';
import { ChangeDetectorRef } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-unauthorised',
  imports: [LoginButton, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './unauthorised.html',
  styleUrls: ['./unauthorised.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Unauthorised {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  messageFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  submitting = false;
  submitSuccess: boolean | null = null;

  constructor(private sendMail: SendMail, private cdr: ChangeDetectorRef) {}

  get canSubmit(): boolean {
    return this.emailFormControl.valid && this.messageFormControl.valid && !this.submitting;
  }

  onSubmit() {
    if (!this.canSubmit) return;
    this.submitting = true;
    this.submitSuccess = null;
    this.sendMail.askForAccess(
      this.emailFormControl.value ?? '',
      this.messageFormControl.value ?? ''
    ).subscribe({
      next: (result: boolean) => {
        this.submitSuccess = result;
        this.submitting = false;
        if (result) {
          this.emailFormControl.reset();
          this.messageFormControl.reset();
        }
      },
      error: () => {
        this.submitSuccess = false;
        this.submitting = false;
        console.error('Failed to send access request email');
        this.cdr.markForCheck(); // or this.cdr.detectChanges();
      }
    });
  }
}
