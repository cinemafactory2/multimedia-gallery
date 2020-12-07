import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private modal = null;

  @Output() private closeModal = new EventEmitter<boolean>();

  constructor(private registerService: RegisterService) { }

  public registerFormErrorMessage = '';

  public registerFormError = false;

  public register = {
    username: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    email: ''
  };

  public registerLoadingForm = false;

  public success = '#28a745';

  ngOnInit() {}

  onSubmit() {
    this.registerFormError = false;
    this.registerFormErrorMessage = '';
    this.registerLoadingForm = true;
    this.registerService
      .registerUser(
        this.register.username,
        this.register.password,
        this.register.password2,
        this.register.first_name,
        this.register.last_name,
        this.register.email,
      )
      .then(data => {
        this.register.username = '',
        this.register.password = '',
        this.register.password2 = '',
        this.register.first_name = '',
        this.register.last_name = '',
        this.register.email = '',
        this.close();
        window.location.reload();
      })
      .catch(err => {
        this.registerFormErrorMessage = err;
        this.registerFormError = true;
        this.registerLoadingForm = false;
      });
  }

  close() {
    this.closeModal.emit(true);
  }
}
