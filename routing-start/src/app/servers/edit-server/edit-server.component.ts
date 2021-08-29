import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/servers/edit-server/canDeactivateGuard.service';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;
  constructor(private serversService: ServersService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    console.log(this.serversService.getServer(id).name);
    console.log(this.serversService.getServer(id).status);
    this.route.queryParams.subscribe(
      (queryParam: Params) => {
        console.log(queryParam['allowEdit']);
        this.allowEdit = queryParam['allowEdit'] === '1' ? true : false;
      }
      );
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(id);
    this.serverName =  this.server.name;
    this.serverStatus = this.server.status;
  }
  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route});
  }

  canComponentDeactivate(){
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) &&
      !this.changeSaved) {
        confirm('do you want to save before leave?');
      } else {
        return true;
      }
  }
}
