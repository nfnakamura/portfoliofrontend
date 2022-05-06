import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Proyecto } from 'src/app/modelos/proyect.model';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
import { animate } from '@angular/animations';


@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {


 constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  //proyectList:any=[];

  //PARA FIREBASE
  proyectosLista:any=[];

  agregaProyecto=false;
  aceptaProyecto=false;
  mostrarAlert=false;
  muestraDescripcion=false;
  aceptaBorrarProyecto=false;
    
  formatoProyecto:string="";
  nombreProyecto:string="";
  linkProyecto:string="";
  descripcionProyecto:string="";

    
  userLogged=this.authService.getUserLogged();

  agregarProy(){
    
    this.agregaProyecto=true;
   
    window.scrollBy(0,300)
    
  }


  aceptarProy(){
    if(this.formatoProyecto=="" || this.nombreProyecto==""){
      this.mostrarAlert=true;
    }else{
      this.aceptaProyecto=true;
      this.agregaProyecto=false; 
      this.mostrarAlert=false;
      
      const miProyecto= new Proyecto(this.formatoProyecto, this.nombreProyecto, this.linkProyecto, this.descripcionProyecto);    
     
      this.proyectosLista.push(miProyecto);

      let proyectoPost = this.proyectosLista.slice(-1)[0]; 

      this.datosPorfolio.guardarProyecto(proyectoPost).subscribe(() =>{
     
        this.ngOnInit();
      }
        
      )
    }
  }

  cancelarProy(){
    this.agregaProyecto=false;
    this.mostrarAlert=false;
    window.scrollBy(0,-300)
  }

  mostrarDescripcion(){     
    this.muestraDescripcion=true;         
  }

  ocultarDescripcion(){
    this.muestraDescripcion=false;
  }


 //DESDE EL Servicio
  obtenerProyectos(){
    return this.datosPorfolio.cargarProyectos();
  }

  validacionParaBorrar(indice:number){  
    this.aceptaBorrarProyecto=true;   
    return indice;
  }

  cancelarBorrarProy(){
    this.aceptaBorrarProyecto=false;
  }

  borrarProyecto(indice:number){

    Swal.fire({
      title: 'Borrar proyecto',
      text: "¿Desea borrar definitivamente el proyecto seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'El proyecto ha sido borrado con éxito.',
          'success'
        )
        this.datosPorfolio.eliminarProyecto(this.proyectosLista[indice].id).subscribe(()=>{
           this.proyectosLista.splice(indice, 1);
           
     })
      }
    })
  }
 

  ngOnInit(): void {

 // TRAER DESDE FIREBASE
    this.obtenerProyectos().subscribe(proyectos=>{
      this.proyectosLista=proyectos;
       
    });


    this.datosPorfolio.DisparadorDeAgregaProy.subscribe(()=>{
      this.agregarProy();
    })

    /*  this.datosPorfolio.obtenerDatos().subscribe(data =>{
      this.proyectList=data.achivements;

    }); */
  
  }

}
