import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Page } from '../../model/base.model';
import { UserService} from '../../services/user.service';
import { Router } from '@angular/router';

export class SearchUser {
  firstName:string;
  area:string;
  role:string;
}

@Component({
  selector: 'app-manage-agent',
  templateUrl: './manage-agent.component.html',
  styleUrls: ['./manage-agent.component.css']
})
export class ManageAgentComponent implements OnInit {

  searchForm:FormGroup;
  notificationForm: FormGroup;
  username = new FormControl('');
  area = new FormControl('');
  role = new FormControl('');
  loading: boolean;
  public page = new Page();
  LIMITS: any;
  rows:any[];
  constructor(private userService:UserService,private formBuilder:FormBuilder, private router: Router,) { }

  ngOnInit() {
     this.searchForm = this.formBuilder.group({
        username :this.username,                                    
        area:this.area,            
        role:this.role
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

  search(){
    let searchUser= new SearchUser();
    if(this.searchForm.value.username)
      searchUser.firstName =this.searchForm.value.username;
    if(this.searchForm.value.area)
      searchUser.area =this.searchForm.value.area;
    if(this.searchForm.value.role)
     searchUser.role =this.searchForm.value.role;
    console.log(searchUser);
    this.userService.searchAgent(searchUser)
    	.subscribe(agents => {
        //this.devices = devices
        this.rows = agents['data'];
         this.page.totalCount = 0;
          this.page.pageIndex = 0;
          this.page.pageSize = 10;
          this.page.sortDirection = 'DESC';
          this.page.sortColumn = '';
          this.page.searchText = '';
    		console.log(agents);
    	});
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
    this.userService.getAllAgents()
      .subscribe(response => {
        if (response) {
          console.log(response);
          this.rows = response['data'];
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

  addAgent(){
     this.router.navigate(['/register/0/add']);
  }

  editAgent(row){
    console.log(row);
    this.router.navigate(['/register/'+row.agentId + '/update']);
  }

}
