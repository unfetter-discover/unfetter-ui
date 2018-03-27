import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../core/services/users.service';
import { AuthService } from '../../core/services/auth.service';
import { Constance } from '../../utils/constance';
import { ConfigService } from '../../core/services/config.service';
import { cleanObjectProperties } from '../../global/static/clean-object-properties';

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

    public identityClasses: string[] = [];
    public identitySectors: string[] = [];

    constructor(
        private usersService: UsersService, 
        private router: Router, 
        private authService: AuthService,
        private configService: ConfigService
    ) {  }

    public ngOnInit() {
        const token = localStorage.getItem('unfetterUiToken');
        if (token) {
            const userFromToken$ = this.usersService.getUserFromToken()
                .subscribe(
                    (user) => {
                        this.userReturn = user = user.attributes;
                        
                        this.form = new FormGroup({
                            unfetterInformation: new FormGroup({
                                firstName: new FormControl(user.firstName ? user.firstName : '', Validators.required),
                                lastName: new FormControl(user.lastName ? user.lastName : '', Validators.required),
                                userName: new FormControl(user.userName ? user.userName : user.github.userName ? user.github.userName : '', Validators.required),
                                email: new FormControl(user.email ? user.email : '', [
                                    Validators.required,
                                    Validators.email
                                ]),
                            }),
                            registrationInformation: new FormGroup({
                                applicationNote: new FormControl(''),
                                requestedOrganization: new FormControl(''),
                            }),
                            identity: new FormGroup({
                                name: new FormControl('', Validators.required),
                                description: new FormControl(''),
                                sectors: new FormControl(['']),
                                contact_information: new FormControl(''),
                            }),
                        }); 
                    },
                    (err) => {
                        console.log(err);                        
                    },
                    () => {
                        userFromToken$.unsubscribe();
                    }
                );

            this.configService.getConfigPromise()
                .then((res) => {
                    this.identitySectors = res['openVocab']['industry-sector-ov'].enum;
                    this.identityClasses = res['openVocab']['identity-class-ov'].enum;
                })
                .catch((err) => console.log(err));
                
        } else {
            console.log('User token not set');            
        }
    }

    public registerSubmit() {
        this.registrationSubmitted = true;

        const unfetterInformation = this.form.get('unfetterInformation').value;
        for (let control in unfetterInformation) {
            if (unfetterInformation[control] && unfetterInformation[control] !== '') {
                if (unfetterInformation[control] instanceof Array) {                    
                    let validValues = unfetterInformation[control].filter((el) => el && el !== '');
                    if (validValues && validValues.length) {
                        this.userReturn[control] = validValues;
                    }
                } else {
                    this.userReturn[control] = unfetterInformation[control];
                }
            }            
        }  

        this.userReturn.identity = cleanObjectProperties({}, { ...this.form.get('identity').value });
        this.userReturn.registrationInformation = cleanObjectProperties({}, { ...this.form.get('registrationInformation').value });
        
        const submitRegistration$ = this.usersService.finalizeRegistration(this.userReturn)
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
                    if (submitRegistration$) {
                        submitRegistration$.unsubscribe();
                    }
                }
            );             
    }
}
