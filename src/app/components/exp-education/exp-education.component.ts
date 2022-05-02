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
  score:string="";


  escuela:string="";
  titulo:string="";
  career:string="";
  img:string="";
  anioInicioEdu:string="";
  anioFinEdu:string="";

  imagenes:any=[];

  

  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  userLogged=this.authService.getUserLogged();

  agregar_experiencia(){
    this.agregaexperiencia=true;
    window.scrollBy(0,280)
  }

  aceptarExp(){
    if (this.cargo=="" || this.compania=="" || this.modo=="" || this.anioInicio=="" || this.anioFin==""){
      this.mostrarAlert=true;
    }else{
      this.mostrarAlert=false;
      this.aceptaExp=true;
      this.agregaexperiencia=false;
                     
      let miExperiencia = new Experiencia(this.cargo, this.compania, this.experienciaList.image, this.modo, this.anioInicio, this.anioFin, this.duracion);
              
      this.experienciaList.push(miExperiencia);

      let experienciaPost = this.experienciaList.slice(-1)[0];

      this.datosPorfolio.guardarExperiencia(experienciaPost).subscribe(() =>{
        console.log("Experiencia guardada")
        this.ngOnInit();
        }      
      )
    }
  }

  cargarImagen(event:any){    

    console.log(event.target.files);   
    let archivo = event.target.files  
    let nombre = "Experiencia";
    let reader = new FileReader();
    reader.readAsDataURL(archivo[0]);
    reader.onloadend=() =>{

      this.imagenes.push(reader.result);
      this.datosPorfolio.guardarImagenExp(nombre+"_"+Date.now(), reader.result).then(urlImagen=>{
        let experiencia={
          name:'Experiencia',
          imgProfile: urlImagen,
      }        
        this.experienciaList.image=urlImagen;
      })
    }     
  }


  cancelarExp(){
    this.agregaexperiencia=false;
    window.scrollBy(0,-280)
  }

  agregarEdu(){
    this.agregaEdu=true;
    window.scrollBy(0,320)
  }

  aceptarEdu(){
    if(this.escuela=="" || this.titulo=="" || this.career=="" || this.anioInicioEdu=="" || this.anioFinEdu=="" ){
      this.mostrarAlertEdu=true;
    }else{
      this.mostrarAlertEdu=false;
      this.aceptaEdu=true;
      this.agregaEdu=false;
      

      let miEducacion = new Educacion(this.escuela, this.titulo, this.educacionList.image, this.career, this.score, this.anioInicioEdu, this.anioFinEdu);

      this.educacionList.push(miEducacion);

      let educacionPost = this.educacionList.slice(-1)[0];

      this.datosPorfolio.guardarEducacion(educacionPost).subscribe(() =>{
        
        console.log("Educacion guardada")
        this.ngOnInit();
      }       
      )
    }    
  }

  
  cargarImagenEdu(event:any){    

    console.log(event.target.files);   
    let archivo = event.target.files  
    let nombre = "Educacion";
    let reader = new FileReader();
    reader.readAsDataURL(archivo[0]);
    reader.onloadend=() =>{

      this.imagenes.push(reader.result);
      this.datosPorfolio.guardarImagenEdu(nombre+"_"+Date.now(), reader.result).then(urlImagen=>{
        let educacion={
          name:'Educacion',
          imgProfile: urlImagen,
      }        
        this.educacionList.image=urlImagen;
      })
    }     
  }
  



  cancelarEdu(){
    this.agregaEdu=false;
    window.scrollBy(0,-300)
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
        this.datosPorfolio.eliminarExperiencia(this.experienciaList[indice].id).subscribe(()=>{
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
        this.datosPorfolio.eliminarEducacion(this.educacionList[indice].id).subscribe(()=>{
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

    this.obtenerEduExp().subscribe(eduexp =>{
      this.educacionList=eduexp.educaciones;
      this.experienciaList=eduexp.experiencias;      
    })

  }

}
