import { Component, OnInit} from '@angular/core';
import { Proyecto } from 'src/app/modelos/proyect.model';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {


 constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  
  proyectosLista:any=[];

  agregaProyecto=false;
  aceptaProyecto=false;
  mostrarAlert=false;
  muestraDescripcion=false;
  aceptaBorrarProyecto=false;

  editaProyecto=false;
  aceptaEdit=false;

    
  formatoProyecto:string="";
  nombreProyecto:string="";
  linkProyecto:string="";
  descripcionProyecto:string="";

    
  userLogged=this.authService.getUserLogged();

  agregarProy(){
    
    this.agregaProyecto=true;
   

    
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
    
  }

  mostrarDescripcion(){     
    this.muestraDescripcion=true;         
  }

  ocultarDescripcion(){
    this.muestraDescripcion=false;
  }

 
  obtenerProyectos(){
    return this.datosPorfolio.cargarProyectos();
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


  editarProyecto(indice:number){
    Swal.fire({
      title: 'Editar Proyecto',
      html: `
      <label>Formato del proyecto</label>
      
      <input type="text" id="formatoProy" class="swal2-input">
      
      <label>Nombre del proyecto</label>
      
      <input type="text" id="nombreProy" class="swal2-input">
      
      <label>Link del proyecto</label>
      
      <input type="text" id="linkProy" class="swal2-input">
      
      <label>Breve descripción del proyecto</label>
      <textarea 
      id="text-area" 
      class="swal2-textarea"></textarea>
      `,    
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      focusConfirm: false,
      preConfirm: () => {
        const formatoProy = (<HTMLInputElement>document.querySelector('#formatoProy')).value 
        const nombreProy = (<HTMLInputElement>document.querySelector('#nombreProy')).value      
        const linkProy =(<HTMLInputElement>document.querySelector('#linkProy')).value
        const descrip =(<HTMLInputElement>document.querySelector('#text-area')).value       
       

        if(formatoProy!=""){
          this.proyectosLista[indice].format=formatoProy;
        }
        if(nombreProy!=""){
          this.proyectosLista[indice].name=nombreProy;
        }
        if(linkProy!=""){
          this.proyectosLista[indice].link=linkProy;
        }
        if(descrip!=""){
          this.proyectosLista[indice].description=descrip;
        }
              
        if (!formatoProy && !nombreProy && !linkProy && !descrip) {
          Swal.showValidationMessage(`Debe editar al menos un campo para aceptar!`)
        }   
                                
        this.datosPorfolio.editarProyecto(this.proyectosLista[indice], this.proyectosLista[indice].id).subscribe(()=>{         
      })
           
      }  
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Editado!',
          'Proyecto editado.',
          'success'
        )              
      }
    })


  }

  cancelarEdit(){
    this.editaProyecto=false;
  }
 

  ngOnInit(): void {

 
    this.obtenerProyectos().subscribe(proyectos=>{
      
      proyectos.sort((proy1:any, proy2:any)=> {
        if (proy1.id < proy2.id){
          return -1;
        }else {
          return 1;
        }
      })       
      this.proyectosLista=proyectos;
     
         
    });


    this.datosPorfolio.DisparadorDeAgregaProy.subscribe(()=>{
      this.agregarProy();
    })

     
  }

}
