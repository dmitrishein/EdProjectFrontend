import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/shared/models/user';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { UpdateUserData } from 'src/app/store/actions/account.actions';
import { AccountState } from 'src/app/store/states/account.state';
import { VariablesConstants } from 'src/app/shared/constants/variables-constant';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public userForm!: FormGroup;
  jwtToken ?:string;
  public dataEditEnable : Boolean = false;
  public errorMessage : string = "";

  constructor(private store : Store) {  
    this.store.select(AccountState.jwtToken).subscribe(
      (res)=> {this.jwtToken = res}
    )
    this.store.select(AccountState.user).subscribe(
      (payload : User | null ) => {       
        this.userForm = new FormGroup({
          jwt: new FormControl({value: this.jwtToken, disabled : true},[Validators.required]),
          username: new FormControl({value: payload?.username, disabled : true},Validators.compose([Validators.required,Validators.pattern(VariablesConstants.USERNAME_PATTERN)])),
          firstName: new FormControl({value: payload?.fullname.split(" ",1).pop(), disabled : true },Validators.compose([Validators.required,Validators.pattern(VariablesConstants.NAME_PATTERN)])), 
          lastName: new FormControl({value: payload?.fullname.split(" ").pop(), disabled : true },Validators.compose([Validators.required,Validators.pattern(VariablesConstants.NAME_PATTERN)])), 
          email: new FormControl({value: payload?.email, disabled : true },[Validators.required, Validators.email]),
        });
     })

  }


  editEnable(){
    this.userForm.enable();
    this.userForm.controls['email'].disable();
    this.dataEditEnable = true;
  }
  
  updateForm(){
    if(this.userForm.dirty){
        this.store.dispatch(new UpdateUserData(this.userForm.value)).subscribe(
          () => { 
           this.userForm.disable();
           this.dataEditEnable = false;
          },
          (err) => {
            this.errorMessage = err.error;
          }
      )
    } else {
      this.dataEditEnable = false;
      this.userForm.disable();
    }
  }
   
  ngOnInit(): void {

  }
}

