import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    public form: FormGroup;
    public userReturn: any;

    constructor(private usersService: UsersService) {  }

    public ngOnInit() {
        const token = localStorage.getItem('unfetterUiToken');
        if (token) {
            let userFromToken$ = this.usersService.getUserFromToken()
                .subscribe(
                    (user) => {
                        this.userReturn = user = user.attributes;
                        console.log(this.userReturn);
                        
                        this.form = new FormGroup({
                            firstName: new FormControl(user.firstName ? user.firstName : '', Validators.required),
                            lastName: new FormControl(user.lastName ? user.lastName : '', Validators.required),
                            userName: new FormControl(user.userName ? user.userName : user.github.userName ? user.github.userName : '', Validators.required),
                            email: new FormControl(user.email ? user.email : '', [
                                Validators.required,
                                Validators.email
                            ]),
                            organizations: new FormControl(user.organizations ? user.organizations : [''])
                        });                      
                    },
                    (err) => {
                        console.log(err);                        
                    },
                    () => {
                        userFromToken$.unsubscribe();
                    }
                );
        } else {
            console.log('User token not set');            
        }
    }

    public registerSubmit() {
        for (let control in this.form.controls) {
            if (this.form.controls[control].value && this.form.controls[control].value !== '') {
                if (this.form.controls[control].value instanceof Array) {                    
                    let validValues = this.form.controls[control].value.filter((el) => el && el !== '');
                    if (validValues && validValues.length) {
                        this.userReturn[control] = validValues;
                    }
                } else {
                    this.userReturn[control] = this.form.controls[control].value;
                }
            }            
        }        
        let submitRegistration$ = this.usersService.finalizeRegistration(this.userReturn)
            .subscribe(
                (res) => {
                    let registered = res.attributes.registered;
                    if (registered) {
                       console.log('Registraiton complete');
                       // TODO handle registration complete                        
                    }     
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    submitRegistration$.unsubscribe();
                }
            );             
    }

    // TODO check for token, guide them to login through github if no token
}
