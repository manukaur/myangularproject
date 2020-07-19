import { Component ,OnInit} from '@angular/core';

@Component({
    selector:'app-server',
    templateUrl:'./server.component.html',
    styles:[`
    .online
    {
        color:white;
    }
    
    `]
})
export class ServerComponent implements OnInit

{
    ServerId=10;
ServerStatus='Offline';
allowNewServer=false;
serverText='No Server Created';
ServerName='';
ServerCreated=false;
ServerColor='';
servers=['Testserver','Testserver2'];

    constructor() {
        this.ServerStatus=Math.random() > 0.5 ? 'online' :'offline';
/*setTimeout(() => {this.allowNewServer=true;
    
}, 2000);*/
     }

    ngOnInit() {
    }
onCreateServer()
{
    this.ServerCreated=true;
    this.servers.push(this.ServerName);
    this.serverText='Server Created with name '+this.ServerName;
}
/*onResetValue()
{
    this.ServerName='';
}*/

getServerStatus()
{
    return this.ServerStatus;
}
onUpdateServerName(event)
{
    this.ServerName=event.target.value;
    console.log(event);
}
getColor()
{
 return this.ServerStatus=='offline' ? 'red':'green';}
}
