import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Page } from '../../model/base.model';
import { UserService} from '../../services/user.service';

export class SearchUser {
  code:string;
  amount:string;
  role:string;
}


@Component({
  selector: 'app-manange-coupon',
  templateUrl: './manange-coupon.component.html',
  styleUrls: ['./manange-coupon.component.css']
})
export class ManangeCouponComponent implements OnInit {

  searchForm:FormGroup;
  notificationForm: FormGroup;
  username = new FormControl('');
  area = new FormControl('');
  role = new FormControl('');
  loading: boolean;
  public page = new Page();
  LIMITS: any;
  rows:any[];
  constructor(private userService:UserService,private formBuilder:FormBuilder) { }

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
      searchUser.code =this.searchForm.value.code;
    if(this.searchForm.value.area)
      searchUser.amount =this.searchForm.value.amount;
    if(this.searchForm.value.role)
     searchUser.role =this.searchForm.value.role;
    console.log(searchUser);
    this.userService.searchUser(searchUser)
    	.subscribe(users => {
        //this.devices = devices
        this.rows = users['data'];
        this.page.totalCount = 0;
        this.page.pageIndex = 0;
        this.page.pageSize = 10;
        this.page.sortDirection = 'DESC';
        this.page.sortColumn = '';
        this.page.searchText = '';
    		console.log(users);
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
    this.userService.getAllCoupons()
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


}
