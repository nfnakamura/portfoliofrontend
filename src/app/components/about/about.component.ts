import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  miPorfolio:any=[];
  texto:string="";
  editarParrafo=false;
  mostrarAlert=false;
  isLoad=false;
  
  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  ngOnInit(): void {

    this.obtenerAbout().subscribe(about =>{
       this.miPorfolio=about;  
       this.isLoad=true;    
    });
  }
    
  userLogged=this.authService.getUserLogged();

  /*************************GET ABOUT********************/

    obtenerAbout(){
      return this.datosPorfolio.cargarDatos();
    }

  /********************************EDIT ABOUT************************************/

  habilitar_edicion(){
    this.editarParrafo=true; 
  };

  aceptar_edicion(){
    if(this.texto==""){
      this.mostrarAlert=true;
    }else{
      this.miPorfolio.about=this.texto;
      this.editarParrafo=false;      
      this.mostrarAlert=false;

      this.datosPorfolio.guardarAbout(this.miPorfolio).subscribe(() =>{       
      })
    }    
  }

  cancelar_edicion(){
    this.editarParrafo=false;
    this.mostrarAlert=false; 
  }



}
