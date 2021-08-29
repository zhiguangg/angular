import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms-td';
  defaultValue = 'pet';
  answer = '';
  genders = ['male', 'female'];

  @ViewChild('f') signupForm: NgForm;

  onSubmit() {
    //console.log(form);
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  suggestUsername() {
    this.signupForm.form.patchValue({
      userInput: { name: 'Superuser', email: 'this@this.com'},
      password: '',
      questionAnswer: 'default question and answer',
      secret: 'car',
      gender: 'female'
    })
  }
}
