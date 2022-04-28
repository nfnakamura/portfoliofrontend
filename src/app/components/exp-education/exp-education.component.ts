import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/modelos/education.model';
import { Experiencia } from 'src/app/modelos/experience.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exp-education',
  templateUrl: './exp-education.component.html',
  styleUrls: ['./exp-education.component.css']
})
export class ExpEducationComponent implements OnInit {

  educacionList:any=[];
  experienciaList:any=[];

  
  agregaexperiencia=false;
  aceptaExp=false;
  agregaEdu=false;
  aceptaEdu=false;
  mostrarAlert=false;
  mostrarAlertEdu=false;

  cargo:string="";
  compania:string="";
  anioInicio:string="";
  anioFin:string="";
  duracion:string="";
  modo:string="";


  escuela:string="";
  titulo:string="";
  career:string="";
  img:string="";
  anioInicioEdu:string="";
  anioFinEdu:string="";
  

  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  userLogged=this.authService.getUserLogged();

  agregar_experiencia(){
    this.agregaexperiencia=true;
  }

  aceptarExp(){
    if (this.cargo=="" || this.compania=="" || this.modo=="" || this.anioInicio=="" || this.anioFin==""){
      this.mostrarAlert=true;
    }else{
      this.mostrarAlert=false;
      this.aceptaExp=true;
      this.agregaexperiencia=false;
      
      let miExperiencia = new Experiencia(this.cargo, this.compania, this.img, this.modo, this.anioInicio, this.anioFin, this.duracion);

      this.experienciaList.push(miExperiencia);

      this.datosPorfolio.guardarExperiencia(this.experienciaList).subscribe((miExperiencia) =>
      console.log(miExperiencia)
    )
      
    }
   
  }

  cancelarExp(){
    this.agregaexperiencia=false;
  }

  agregarEdu(){
    this.agregaEdu=true;
  }

  aceptarEdu(){
    if(this.escuela=="" || this.titulo=="" || this.career=="" || this.anioInicioEdu=="" || this.anioFinEdu=="" ){
      this.mostrarAlertEdu=true;
    }else{
      this.mostrarAlertEdu=false;
      this.aceptaEdu=true;
      this.agregaEdu=false;
      

      let miEducacion = new Educacion(this.escuela, this.titulo, this.img, this.career, this.anioInicioEdu, this.anioFinEdu);

     
      this.educacionList.push(miEducacion);

      this.datosPorfolio.guardarEducacion(this.educacionList).subscribe((miEducacion) =>
        console.log(miEducacion)
      )

    }
    
  }

  cancelarEdu(){
    this.agregaEdu=false;
  }

  obtenerEduExp(){
    return this.datosPorfolio.cargarDatos();
  }


  borrarExperiencia(indice:number){

    
    Swal.fire({
      title: 'Borrar experiencia',
      text: "¿Desea borrar definitivamente la experiencia seleccionada?",
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
          'Experiencia borrada con éxito.',
          'success'
        )
        this.datosPorfolio.eliminarExperiencia(indice).subscribe(()=>{
          this.experienciaList.splice(indice, 1);
     })
      }
    })
    


  }

  borrarEducacion(indice:number){

    
    Swal.fire({
      title: 'Borrar educación',
      text: "¿Desea borrar definitivamente la educación seleccionada?",
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
          'Educación borrada con éxito.',
          'success'
        )
        this.datosPorfolio.eliminarEducacion(indice).subscribe(()=>{
          this.educacionList.splice(indice, 1);
     })
      }
    })

  }

  


  ngOnInit(): void {

   /* 
    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      this.educacionList=data.education;
      this.experienciaList=data.experience;
      
    });  */

    this.obtenerEduExp().subscribe(educacion =>{
      this.educacionList=educacion.educaciones;
      this.experienciaList=educacion.experiencias;      
    })

  }

}
