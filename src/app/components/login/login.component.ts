import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario = {
  email: '',
  password: ''
}

errorIngresoMail=false;
errorVacio=false;


redirigir(){
  this.router.navigate(['/home']);
}

ingresar(){

  const {email, password} = this.usuario;
  if (email=="" || password==""){
      this.errorVacio=true;
      this.errorIngresoMail=false;}
  else{
    this.errorVacio=false;
    this.authService.login(email, password).then (res =>{   
     
      if(res == null){
        this.errorIngresoMail=true}
      else{
        this.errorIngresoMail=false;
        this.redirigir(); 
      }    
      })
      }
    }

/*
ingresarConGoogle(){
  
  const {email, password} = this.usuario;
  this.authService.loginWithGoogle(email, password).then (res => {
  
    this.redirigir();
  })
}
*/

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    this.authService.logout()
  }

}
