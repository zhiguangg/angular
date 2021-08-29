import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
//import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor() { }

  ngOnInit() {
/*     this.subscription = interval(1000).subscribe(
      count=>{
        console.log(count);
      }
    ); */
    const custObj = new Observable(observer =>{
      let count = 0;
      setInterval(()=>{
          observer.next(count);
          count++;

          if(count === 50){
            observer.complete();
          }
          if(count > 30){
            observer.error(new Error('Error, Count is greater than 3'));
          }
        }, 1000);
      }
    );

    this.subscription = custObj.pipe(filter((val: number) => {
      return val %2==0;
    }), map(data=>{
      return 'round: ' + data;
    })).subscribe((data)=>{
      console.log(data);
    }, 
    error=>{
      console.log(error.message);
    },
    ()=>{
      console.log('completed!');
    });
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
