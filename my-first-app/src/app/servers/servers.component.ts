import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreated = 'no server was created';
  serverName = 'Empty Server';
  
  username='';
  isServerCreated = false;
  servers = [];

  onResetUsername(){
    this.username = '';
  }

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
   }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.isServerCreated = true;
    this.servers.push(this.serverName);
    this.serverCreated = 'server was created! ' + this.serverName;
  }

  onUserInput(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  getColor(index: number){
    return index % 2 === 0 ? 'blue' : 'yellow';
  }
}
