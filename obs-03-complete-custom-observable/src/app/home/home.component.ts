import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/Operators';

//import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const obs = new Observable(
      subscriber => {
        let count = 0;
        setInterval(
          ()=>{
            subscriber.next(count);
            if(count === 5){
              subscriber.complete();
            }
            // if(count > 3){
            //   subscriber.error(new Error('count greater than 3'));
            // }
            count++;
          }, 1000);
      });
    this.firstObsSubscription = obs.pipe(filter(data => { return data > 0; }), map((data: number)=>{
       return 'Round:'+ (data+1);
      })).subscribe(data => {
      console.log(data);
    }, error =>{
      console.log(error);
      alert(error.message);
    }, ()=>{
      console.log('completed');
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
