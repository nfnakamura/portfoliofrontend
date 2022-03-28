import { Component, OnInit } from '@angular/core';
import { Informacion } from 'src/app/modelos/headerData.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  miPorfolio:any=[];

  editaInfo=false;
  aceptaEdicion=false;
  mostrarAlert=false;
  load=false;

  imagen:string="";
  nombre:string="";
  apellido:string="";
  trabajos:string="";
  lugar:string="";

  nombreApellido:any=[];


  userLogged=this.authService.getUserLogged();

  separaNombre(nombre:string){   
    this.nombreApellido = this.miPorfolio.name[0].split(" ");
    nombre = this.nombreApellido[0];
    return nombre;     
   }       


  separaApellido(apellido:string){   
    this.nombreApellido = this.miPorfolio.name[0].split(" ");
    apellido = this.nombreApellido[1]; 
    return apellido;    
  }

 


  editarInfo(){
    this.editaInfo=true;
  }


  cancelarEdicion(){
    this.editaInfo=false;

  }
  aceptarEdicion(){    

    if(this.nombre =="" && this.apellido=="" && this.trabajos=="" && this.lugar==""){
          this.mostrarAlert=true;
    }else{

      this.editaInfo=false;
      this.mostrarAlert=false;

      if(this.nombre !="" && this.apellido!=""){

        this.miPorfolio.name=this.nombre + " " +  this.apellido;

        let nombreActualizado:any=[];
        nombreActualizado.push(this.miPorfolio.name);

       this.datosPorfolio.guardarNombre(nombreActualizado).subscribe((name) =>
            console.log(name)
      )
     
       
      }
      if(this.trabajos!=""){   
        this.miPorfolio.position=this.trabajos;

        let trabajoActualizado:any=[];
        trabajoActualizado.push(this.miPorfolio.position);

        this.datosPorfolio.guardarTrabajo(trabajoActualizado).subscribe((position) =>
          console.log(position)
        )
      
      }
      if(this.lugar!=""){
        this.miPorfolio.ubication=this.lugar;

        let ubicacionActualizada:any=[];

        ubicacionActualizada.push(this.miPorfolio.ubication)

        this.datosPorfolio.guardarUbicación(ubicacionActualizada).subscribe((ubication)=>
        console.log(ubication)
        )
      
      }      
           
    }      

  }


  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  ngOnInit(): void {

    this.datosPorfolio.cargarDatos().subscribe(data =>{
       this.miPorfolio=data;
       this.load=true;
    });

 
  }


}
