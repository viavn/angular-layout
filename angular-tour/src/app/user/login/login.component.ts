import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { AuthService } from '../auth.service';
import { getMaskUserName } from '../state/user.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageTitle = 'Log In';
  maskUserName!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.store.select(getMaskUserName).subscribe(
      maskUserName => this.maskUserName = maskUserName
    );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch({
      type: '[User] Mask User Name'
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
