import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() private closeModal = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService) {}

  public loginFormErrorMessage = '';

  public loginFormError = false;

  public login = {
    username: '',
    password: ''
  };

  public loginLoadingForm = false;

  public success = '#28a745';

  ngOnInit() {}

  onSubmit() {
    this.loginFormError = false;
    this.loginFormErrorMessage = '';
    this.loginLoadingForm = true;
    this.authenticationService
      .login(this.login.username, this.login.password)
      .then(data => {
        window.location.reload();
      })
      .catch(err => {
        this.loginFormErrorMessage = err;
        this.loginFormError = true;
        this.loginLoadingForm = false;
      });
  }

  close() {
    this.closeModal.emit(true);
  }
}
