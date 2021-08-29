import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private alertCmpFactoryResolver: ComponentFactoryResolver){}
  authObs = new Observable();

  onSwitchMode (){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.isLoading = true;
    if(this.isLoginMode){
      this.authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      this.authObs = this.authService.signup(form.value.email, form.value.password);
    }

    this.authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      error =>{
        console.log(error);
        this.error = error;
        this.showErrorAlert(this.error);;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(msg: string) {
    const aletCmpFactoryResolver = this.alertCmpFactoryResolver.resolveComponentFactory(AlertComponent);
   
    const viewContainerRef = this.alertHost.viewContainerref;

    const cmpRef = viewContainerRef.createComponent(aletCmpFactoryResolver);
    cmpRef.instance.message = msg;
    this.closeSub = cmpRef.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe();
      viewContainerRef.clear();
    })  
  }

  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
