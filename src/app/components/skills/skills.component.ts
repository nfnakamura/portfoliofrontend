import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/modelos/skill.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{

  
  listaAptitudes:any=[];

  aceptaHabilidad=false;
  agregaHabilidad=false;

  mostrarAlert=false;

  habilidad:string="";
  porcentaje:string="";

  userLogged=this.authService.getUserLogged();

  agregarHabilidad(){
    this.agregaHabilidad=true;
  }

  aceptarHabilidad(){
    if(this.habilidad=="" || this.porcentaje==""){
      this.mostrarAlert=true;
    }else{
      this.mostrarAlert=false;
      this.aceptaHabilidad=true;
      this.agregaHabilidad=false;

      let miHabilidad = new Habilidad(this.habilidad, parseInt(this.porcentaje), this.habilidad.toLowerCase());
      
      this.listaAptitudes.push(miHabilidad);

      let habilidadPost = this.listaAptitudes.slice(-1)[0];

      this.datosPorfolio.guardarHabilidad(habilidadPost).subscribe(() =>{
        console.log("Habilidad guardada")
        this.ngOnInit();
      }
        
      )
          
    }    
  }
  
  cancelarHabilidad(){
    this.agregaHabilidad=false;
  }

  obtenerHabilidad(){

    return this.datosPorfolio.cargarDatos();

  }

  borrarHabilidad(indice:number){

    
    Swal.fire({
      title: 'Borrar habilidad',
      text: "¿Desea borrar definitivamente la habilidad seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrada!',
          'Habilidad borrada con éxito.',
          'success'
        )
        this.datosPorfolio.eliminarHabilidad(this.listaAptitudes[indice].id).subscribe(()=>{
          this.listaAptitudes.splice(indice, 1);
     })
      }
    })

  }

  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }
  
  


  ngOnInit(): void {


    //FIREBASE
    this.obtenerHabilidad().subscribe(habilidades =>{
      this.listaAptitudes=habilidades.habilidades;
    });

  }



}
