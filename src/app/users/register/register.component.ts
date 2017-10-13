import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../users.service';
import { AuthService } from '../../global/services/auth.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    public form: FormGroup;
    public userReturn: any;
    public registrationSubmitted: boolean = false;
    public submitError: boolean = false;

    public identityClasses = Constance.IDENTITY_CLASSES;
    public identitySectors = Constance.IDENTITY_SECTOR_OPTIONS;

    constructor(private usersService: UsersService, private router: Router, private authService: AuthService) {  }

    public ngOnInit() {
        const token = localStorage.getItem('unfetterUiToken');
        if (token) {
            let userFromToken$ = this.usersService.getUserFromToken()
                .subscribe(
                    (user) => {
                        this.userReturn = user = user.attributes;
                        
                        this.form = new FormGroup({
                            firstName: new FormControl(user.firstName ? user.firstName : '', Validators.required),
                            lastName: new FormControl(user.lastName ? user.lastName : '', Validators.required),
                            userName: new FormControl(user.userName ? user.userName : user.github.userName ? user.github.userName : '', Validators.required),
                            email: new FormControl(user.email ? user.email : '', [
                                Validators.required,
                                Validators.email
                            ]),
                            // organizations: new FormControl(user.organizations ? user.organizations : ['']),
                            identity: new FormGroup({
                                name: new FormControl('', Validators.required),
                                description: new FormControl(''),
                                identity_class: new FormControl('', Validators.required),
                                sectors: new FormControl(['']),
                                contact_information: new FormControl(''),
                            })
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
        this.registrationSubmitted = true;
        for (let control in this.form.controls) {
            if (control === 'identity') {
                continue;
            } else if (this.form.controls[control].value && this.form.controls[control].value !== '') {
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

        let identity = this.form.get('identity').value;           
        let temp = {};

        for (let control in identity) {
            if (identity[control] && identity[control] !== '') {
                if (identity[control] instanceof Array) {
                    let validValues = identity[control].filter((el) => el && el !== '');
                    if (validValues && validValues.length) {
                        temp[control] = validValues;
                    }
                } else {
                    temp[control] = identity[control];
                }
            }
        } 
        this.userReturn.identity = temp;
             
        let submitRegistration$ = this.usersService.finalizeRegistration(this.userReturn)
            .subscribe(
                (res) => {
                    console.log('SUBMIT RES', res);
                    
                    let registered = res.attributes.registered;
                    if (registered) {
                        // TODO registration notification
                        this.authService.setUser(res.attributes);   
                        this.router.navigate(['/']);                      
                    } else {
                        console.warn('Server did not properly register user.');                        
                        this.submitError = true;
                    }    
                },
                (err) => {
                    console.log(err);
                    this.submitError = true;
                },
                () => {
                    submitRegistration$.unsubscribe();
                }
            );             
    }

    // TODO check for token, guide them to login through github if no token
}
