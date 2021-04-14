import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-heroku';

  phone: string = '';
  code: string = '';
  phoneEntered: boolean = false;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization'
  });

  login(){
    if(!this.phoneEntered){
      this.signup(this.phone).subscribe(
        res => {
          this.phoneEntered = true;
          console.log(res);
        }
      );
    }
    else{
      this.signin(this.phone, this.code).subscribe(
        res => {
          console.log(res)
        }
      );
    }
  }

  signin(phone: string, code: string) {
    return this.http.post<SigninResponse>(`${environment.api}/auth2/login`, {
      phone_number: String(phone),
      code: String(code)
    }, {headers: this.headers});
  }
  signup(phone: string) {
      return this.http.post(`${environment.api}/auth2/code`, {
      phone_number: phone
      }, {headers: this.headers});
  }

  constructor(private http: HttpClient){}
}
interface SigninResponse { access_token: string; }
