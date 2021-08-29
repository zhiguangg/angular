import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbidenNames = ['David', 'Anna'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        'email': new FormControl(null, Validators.email, this.forbiddenEmail)
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });

/*     this.signupForm.valueChanges.subscribe(
      (value)=>{
        console.log('value'+value);
      }
    ) */

    // this.signupForm.get('gender').statusChanges.subscribe(
    //   (status)=>{
    //     console.log('status'+status);
    //   }
    // );
    this.signupForm.setValue({
      'userData': {
        'username': 'Peter',
        'email': 'email@email.com'
      },
      'gender': 'male',
      'hobbies': []
    })
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      'userData': {
        'username': '',
        'email': 'test2@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
  }

  onAddHobby() {
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }  

  getHobbies() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenName(control: FormControl): {[s: string]: boolean} {
    if(this.forbidenNames.indexOf(control.value) != -1){
      return {'forbiddenName': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject)=>{
      setTimeout(() => {
          if(control.value === 'test@test.com'){
           resolve({'forbiddenEmail': true});
          } else {
            resolve(null);
          }   
        }, 4000);
      });
    return promise;
  }
}
