
import { timer as observableTimer,  Observable  } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material';
import { tokenNotExpired } from 'angular2-jwt';

import { UsersService } from '../../core/services/users.service';
import { AuthService } from '../../core/services/auth.service';
import { Constance } from '../../utils/constance';
import { ConfigService } from '../../core/services/config.service';
import { cleanObjectProperties } from '../../global/static/clean-object-properties';
import { UserHelpers } from '../../global/static/user-helpers';

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
    public importErrorMsg: string = '';

    public identityClasses: string[] = [];
    public identitySectors: string[] = [];

    @ViewChild('importStix')
    public importStixEl: ElementRef;

    @ViewChild('stepper')
    public stepper: MatStepper;

    public helpHtml: string = `
#### Approval Process

After completing registration, an Unfetter administrator will have to approve your account before you can use the application.

#### Organizations

To get the most out of Unfetter, users should be in one or more organizations. After being approved to the application, you may apply to join organizations in the users settings dashboard. An organization leader or an Unfetter administrator has to approve organization applicants.
`;

    private importedStixIdentity: any = {};

    constructor(
        private usersService: UsersService, 
        private router: Router, 
        private authService: AuthService,
        private configService: ConfigService
    ) {  }

    public ngOnInit() {
        const token = localStorage.getItem('unfetterUiToken');
        if (token && tokenNotExpired('unfetterUiToken')) {
            const userFromToken$ = this.usersService.getUserFromToken()
                .subscribe(
                    (user) => {
                        this.userReturn = user = user.attributes;
                        this.userReturn.avatar_url = UserHelpers.getAvatarUrl(user);
                        
                        this.form = new FormGroup({
                            unfetterInformation: new FormGroup({
                                firstName: new FormControl(user.firstName ? user.firstName : '', Validators.required),
                                lastName: new FormControl(user.lastName ? user.lastName : '', Validators.required),
                                userName: new FormControl(user.userName ? user.userName : user.auth.userName ? user.auth.userName : '', Validators.required, this.validateUserName.bind(this)),
                                email: new FormControl(user.email ? user.email : '', [
                                    Validators.required,
                                    Validators.email
                                ], this.validateEmail.bind(this)),
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
            console.log('User token not set or is expired');
            this.router.navigate(['/']);            
        }
    }

    public registerSubmit() {
        if (this.form.status !== 'VALID') {
            console.log('Invalid attempt to submit registration');
            return;
        }
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

        this.userReturn.identity = {
            ...this.importedStixIdentity,
            ...cleanObjectProperties({}, { ...this.form.get('identity').value })
        };
        this.userReturn.registrationInformation = cleanObjectProperties({}, { ...this.form.get('registrationInformation').value });

        const submitRegistration$ = this.usersService.finalizeRegistration(this.userReturn)
            .subscribe(
                (res) => {
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

    public enterPressed(e: KeyboardEvent) {
        console.log(e)

        if ((e.target as any).name === 'cancelBtn') {
            this.logOut();
        }

        // Ignore if the cancel button or a stepper back button is clicked
        if ((e.target as any).name === 'cancelBtn' || ((e as any).target.attributes && (e as any).target.attributes.matstepperprevious)) {
            return;
        }

        e.preventDefault();

        // Form is valid
        if (this.form.status === 'VALID') {
            this.registerSubmit();

        // Step 1 is selected and valid
        } else if (this.stepper.selectedIndex === 0 && this.form.get('registrationInformation').status === 'VALID') {
            this.stepper.next();

        // Step 2 is selected
        } else if (this.stepper.selectedIndex === 1) {
            this.stepper.next();
        }
    }

    public openFileUpload() {
        this.importStixEl.nativeElement.click();
    }

    public fileChanged(event: UIEvent) {       
        this.importErrorMsg = '';
        this.importedStixIdentity = {};
        try {
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                try {                    
                    const stixContent = JSON.parse(e.target.result);
                    this.processImportedIdentity(stixContent);
                } catch (error) {
                    this.importErrorMsg = 'File is not JSON, please upload a STIX bundle or identity';
                }
            };
            const file = this.importStixEl.nativeElement.files[0];
            const fileContents = reader.readAsText(file, 'UTF-8');
        } catch (error) {
            this.importErrorMsg = 'Unable to read file';
        }        
    }

    public logOut() {
        this.authService.logOut();
    }

    private processImportedIdentity(stixContent: any) {
        if (stixContent.type) {
            if (stixContent.type === 'bundle' && stixContent.objects && stixContent.objects.length && stixContent.objects[0].type === 'identity') {
                if (stixContent.objects[0].identity_class === 'individual') {
                    this.importedStixIdentity = stixContent.objects[0];
                    this.form.get('identity').patchValue(stixContent.objects[0]);
                } else {
                    this.importErrorMsg = 'Only individual identities can be accepted';
                }
            } else if (stixContent.type === 'identity') {
                if (stixContent.identity_class === 'individual') {
                    this.importedStixIdentity = stixContent;
                    this.form.get('identity').patchValue(stixContent);
                } else {
                    this.importErrorMsg = 'Only individual identities can be accepted';
                }
            } else {
                this.importErrorMsg = 'Only STIX identities, or STIX identities in bundles may be processed';
            }
        } else {
            this.importErrorMsg = 'File does not appear to be STIX';
        }
    }

    private validateEmail(emailCtrl: FormControl): Observable<any> {
        return observableTimer(50).pipe(
            switchMap(() => this.usersService.emailAvailable(emailCtrl.value)),
            map((emailAvailable: boolean) => emailAvailable ? null : { 'emailTaken': true }));
    }

    private validateUserName(userNameCtrl: FormControl): Observable<any> {
        return observableTimer(50).pipe(
            switchMap(() => this.usersService.userNameAvailable(userNameCtrl.value)),
            map((userNameAvailable: boolean) => userNameAvailable ? null : { 'userNameTaken': true }));
    }
}
