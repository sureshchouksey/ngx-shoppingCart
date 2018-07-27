import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-rates',
  templateUrl: './create-rates.component.html',
  styleUrls: ['./create-rates.component.css']
})
export class CreateRatesComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            cowMilkRate: this.cowMilkRate,
            buffaloMilkRate: this.buffaloMilkRate,
            deliveryCharge:this.deliveryCharge            
        })
  }   

  cowMilkRate = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  buffaloMilkRate = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  deliveryCharge = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z_-\\s]*')]);
  
  setClassCowMilkRate() {
    return { 'has-danger': !this.cowMilkRate.pristine && !this.cowMilkRate.valid };
  }

   setClassBuffaloMilkRate() {
    return { 'has-danger': !this.buffaloMilkRate.pristine && !this.buffaloMilkRate.valid };
  }

  setClassDeliveryCharge() {
    return { 'has-danger': !this.deliveryCharge.pristine && !this.deliveryCharge.valid };
  }
  
  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        console.log('Register Successfully')        
        this.router.navigate(['/login']);
      },
      error => console.log('email already exists')
    );
  }

}
