import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService} from '../services/user.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']//,
  //encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  agentId:number;
  registerType:string;
  constructor(private formBuilder: FormBuilder,
              private userService:UserService,
              private route: ActivatedRoute,
              private router:Router) { 

      this.route.params.subscribe(params => {
        this.agentId = +params["Id"];
        this.registerType= params["type"];
        console.log('agentId',this.agentId);
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            phoneNumber: this.phoneNumber,
            firstName: this.firstName,
            lastName:this.lastName,
            email: this.email,
            password: this.password,
            role: this.role,
            flatNoBuidlingName: this.flatNoBuidlingName,
            streetName: this.streetName,
            area:this.area,
            pincode: this.pincode,
            city: this.city,
            state: this.state,
            aadharNumber:this.aadharNumber,
            panNumber:this.panNumber,            
            quantityCapacity:this.quantityCapacity,           
            milkType:this.milkType,
            availabilityStatus:this.availabilityStatus
        })
    if (this.agentId != 0)// edit
    {
      this.getAgentdetails();
    } 
  }
  
  getAgentdetails(){
    this.userService.getAgentById(this.agentId)
      .subscribe(response => {
        if (response) {
          console.log(response['data'][0]);
          this.patchValues(response['data'][0]);          
        }
      }, error => {
        console.log('registerUser error: ' + error);
    });
  }

  patchValues(data){
    if(data){
        this.registerForm.patchValue({
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName:data.lastName,
            email: data.email,
            password:data.password,            
            role: data.role,
            flatNoBuidlingName: data.flatNoBuidlingName,
            streetName: data.streetName,
            area:data.area,
            pincode: data.pincode,
            city: data.city,
            state: data.state,
            aadharNumber:data.aadharNumber,
            panNumber:data.panNumber,            
            quantityCapacity:data.quantityCapacity,           
            milkType:data.milkType,
            availabilityStatus:data.availabilityStatus
      })
    }    
  }
  phoneNumber = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  firstName = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  lastName = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  email = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  flatNoBuidlingName = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  streetName = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  area = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  landmark = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  pincode = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);
  city = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  state = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  role = new FormControl('', [Validators.required]);

  aadharNumber = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  panNumber = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  quantityCapacity = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  milkType = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  availabilityStatus = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  setClassFirstName() {
    return { 'has-danger': !this.firstName.pristine && !this.firstName.valid };
  }

   setClassLastName() {
    return { 'has-danger': !this.lastName.pristine && !this.lastName.valid };
  }

  setClassUsername() {
    return { 'has-danger': !this.phoneNumber.pristine && !this.phoneNumber.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  setClassFlat() {
    return { 'has-danger': !this.flatNoBuidlingName.pristine && !this.flatNoBuidlingName.valid };
  }

   setClassStreet() {
    return { 'has-danger': !this.streetName.pristine && !this.streetName.valid };
  }

  setClassArea() {
    return { 'has-danger': !this.area.pristine && !this.area.valid };
  }
  setClassPincode() {
    return { 'has-danger': !this.pincode.pristine && !this.pincode.valid };
  }
  setClassCity() {
    return { 'has-danger': !this.city.pristine && !this.city.valid };
  }
  setClassState() {
    return { 'has-danger': !this.state.pristine && !this.state.valid };
  }

  register() {
    if(this.registerType == 'update'){
        this.updateAgent();
    }
    else{
      this.addAgent();
    }
  }

  addAgent(){
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        console.log('Register Successfully')        
        this.router.navigate(['/login']);
      },
      error => console.log('email already exists')
    );
  }

  updateAgent(){
    let updateData = this.registerForm.value;
    updateData.agentId = this.agentId;
    this.userService.updateAgent(updateData).subscribe(
      res => {
        console.log('Register Successfully')        
        this.router.navigate(['/login']);
      },
      error => console.log('email already exists')
    );
  }

}
