import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Device} from '../model/device';
import { PushNotificationService} from '../services/push-notification.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Payload} from '../model/Payload';
import { Notification} from '../model/Notification';
import { DeviceDetailComponent} from '../device-detail/device-detail.component';
import { AuthService } from '../services/auth.service';
import { Page } from '../model/base.model';

export class SearchDevice {
  username:string;
  deviceId:string;
  packageName:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  public page = new Page();
   LIMITS: any;
  rows:any[];
  columns = [
    { prop: 'username' },
    { name: 'platform' }      
  ];

  devices: Device[];
  selectedDevice:Device;
  isLoading = true;
  searchForm:FormGroup;
  notificationForm: FormGroup;
  username = new FormControl('');
  deviceId = new FormControl('');
  packageName = new FormControl('');
  messageTitle = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  messageBody = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);	
  constructor(private formBuilder:FormBuilder,
              private pushNotificationService:PushNotificationService,
              public toast: ToastComponent,public auth: AuthService ) { }

  ngOnInit() {
    
    this.getDevices();
     this.searchForm = this.formBuilder.group({
            username :this.username,                                    
            deviceId:this.deviceId,            
            packageName:this.packageName
        })
    this.notificationForm= this.formBuilder.group({
      messageTitle:this.messageTitle,
      messageBody:this.messageBody
    })
    
    this.LIMITS = [
      { key: 10, value: 10 },
      { key: 20, value: 20 },
      { key: 50, value: 50 },
      { key: 100, value: 100 }
    ];
    this.page.totalCount = 0;
    this.page.pageIndex = 0;
    this.page.pageSize = 10;
    this.page.sortDirection = 'DESC';
    this.page.sortColumn = '';
    this.page.searchText = '';
     this.onPage({ page: this.page.pageIndex});
      // this.onPage(this.page.pageIndex);
      this.setLimits();


  }

  setClassEmail() {
    return { 'has-danger': !this.messageTitle.pristine && !this.messageTitle.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.messageBody.pristine && !this.messageBody.valid };
  }

  getDevices(){
  	 this.pushNotificationService.getAllDevices()
    	.subscribe(devices => {
    		this.devices = devices
    		console.log(this.devices);
    	},
      error => console.log(error),
      () => this.isLoading = false);
  }

  deleteDevice(device:Device){
    this.pushNotificationService.deleteDevice(device)
    	.subscribe(response => {
    		//this.devices = devices
        console.log(response);
         this.getDevices();
    	});
  }

  search(){
    let searchDevice= new SearchDevice();
    if(this.searchForm.value.username)
      searchDevice.username =this.searchForm.value.username;
    if(this.searchForm.value.deviceId)
      searchDevice.deviceId =this.searchForm.value.deviceId;
    if(this.searchForm.value.packageName)
     searchDevice.packageName =this.searchForm.value.packageName;
    console.log(searchDevice);
    this.pushNotificationService.searchDevice(searchDevice)
    	.subscribe(devices => {
        //this.devices = devices
        this.rows = devices;
         this.page.totalCount = 0;
          this.page.pageIndex = 0;
          this.page.pageSize = 10;
          this.page.sortDirection = 'DESC';
          this.page.sortColumn = '';
          this.page.searchText = '';
    		console.log(this.devices);
    	});
  }

  checkAll(ev) {
    this.devices.forEach(x => x.state = ev.target.checked)
  }

  isAllChecked() {
    if(this.devices)
      return this.devices.every(item => item.state);
  }

  viewDeviceDetail(id){
    this.pushNotificationService.getDeviceById(id)
    	.subscribe(device => {
        this.selectedDevice = device
       
    		console.log(this.selectedDevice);
    	});
  }

  SendToAll(){
    let payloadList:Array<Payload> = [];
    let notificationData = new Notification();
    let payload = new Payload();
    let packageName:String;
    let selectedList:Array<Device> =[];
    let userList:Array<String> =[];
     selectedList = this.devices.filter(device => device.state === true);
     console.log(selectedList);
     selectedList.forEach((item,index)=>{
       if(item.hasOwnProperty('username')){
         userList.push(item.username);
         packageName = item.packageName;
       }
     })
    notificationData.title = this.notificationForm.value.messageTitle;
    notificationData.body = this.notificationForm.value.messageBody;
    payload.username = userList.toString();
    payload.packageName =packageName;
    payload.notification = notificationData;
    payloadList.push(payload);    
    this.pushNotificationService.sendNotification(payloadList).subscribe(
      res => {
         this.toast.setMessage('send Notification Successfully!', 'success');  
        console.log('send Notification Successfully');        
        
      },
      error => this.toast.setMessage('Notification Fail', 'danger')
    );
  }

  onPage(pageInfo) {
    this.page.pageIndex = pageInfo.page;
    this.page.searchText = '';
   
    this.getInternalUsers();
    
  }

  setLimits() {
      this.page.pageSize = this.LIMITS[0].value;
  }

   public getInternalUsers() {
    this.pushNotificationService.getAllDevices()
      .subscribe(response => {
        if (response) {
          console.log(response);

          this.rows = response;
          this.page.totalCount = 0;
          this.page.pageIndex = 0;
          this.page.pageSize = 10;
          this.page.sortDirection = 'DESC';
          this.page.sortColumn = '';
          this.page.searchText = '';
        }
      }, error => {
        console.log('registerUser error: ' + error);
    });
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      // const rows = [...this.rows];
      // // this is only for demo purposes, normally
      // // your server would return the result for
      // // you and you would just set the rows prop
      // const sort = event.sorts[0];
      // rows.sort((a, b) => {
      //   return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
      // });

      // this.rows = rows;
      if (event.sorts.length > 0) {
        this.page.sortDirection = event.sorts[0].dir;
        this.page.sortColumn = event.sorts[0].prop;
      }
      this.onPage({page : this.page.pageIndex});
      this.loading = false;
    }, 1000);
  }

}
