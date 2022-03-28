import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario = {
  email: '',
  password: ''
}

errorRegistrando=false;
errorVacio=false;

redirigir(){
  this.router.navigate(['/home']);
}

registrarse(){
  const {email, password} = this.usuario;
  if (email=="" || password==""){
    this.errorVacio=true;
    this.errorRegistrando=false;

}else{
  this.errorVacio=false;
  this.authService.register(email,password).then(res => {
    console.log("Se registró", res);
    this.redirigir();
    if(res == null)
      {this.errorRegistrando=true}else
      {
        this.errorRegistrando=false;
      } 
  })
} 
}

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }


}
