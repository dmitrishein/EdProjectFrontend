import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/shared/models/user';
import { FormControl, FormGroup,Validators , NgControl} from '@angular/forms';
import { UpdateUserData } from 'src/app/store/actions/account.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user$!:User;
  public userForm!: FormGroup;
  public dataEditEnable : Boolean = false;
  public errorMessage : string = "";

  constructor(private store : Store) {  
    let jsonUser = this.store.selectSnapshot(our => our.account.user);
    this.user$ = {
      id: jsonUser[0].id,
      username : jsonUser[0].username,
      email : jsonUser[0].email,
      fullName : jsonUser[0].fullname,
      IsEmailConfirmed : jsonUser[0].isEmailConfirmed,
    };
    this.userForm = new FormGroup(
    {
     id: new FormControl({value: this.user$.id, disabled : true},[Validators.required]),
     username: new FormControl({value: this.user$.username, disabled : true},[Validators.required]),
     firstName: new FormControl({value: this.user$.fullName.split(" ",1).pop(), disabled : true },[Validators.required]), 
     lastName: new FormControl({value: this.user$.fullName.split(" ").pop(), disabled : true },[Validators.required]), 
     email: new FormControl({value: this.user$.email, disabled : true },[Validators.required, Validators.email]) 
    });
  }


  editEnable(){
    this.userForm.enable();
    this.dataEditEnable = true;
  }
  
  updateForm(){
    if(this.userForm.dirty){
        this.store.dispatch(new UpdateUserData(this.userForm.value)).subscribe(
          () => { 
           this.errorMessage = "Successfuly updated! ";
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

