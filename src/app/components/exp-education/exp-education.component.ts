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
    this.mostrarAlert=false;
   
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
      

      let miEducacion = new Educacion(this.escuela, this.titulo, this.educacionList.image, this.career, this.score, this.anioInicioEdu, this.anioFinEdu);

      this.educacionList.push(miEducacion);

      let educacionPost = this.educacionList.slice(-1)[0];
      
      this.datosPorfolio.guardarEducacion(educacionPost).subscribe(() =>{
        
   
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
    this.mostrarAlertEdu=false;
    
  }

  obtenerExperiencia(){
    return this.datosPorfolio.cargarExperiencia();
  }
  obtenerEducacion(){
    return this.datosPorfolio.cargarEducacion();
  }

  editarExperiencia(indice:number){
    Swal.fire({
      title: 'Editar Experiencia',
      html: `
      <label class="label-edit">Cargo</label>
      
      <input  type="text" id="cargo" class="form-control">
      
      <label class="label-edit">Lugar de Trabajo</label>
      
      <input  type="text" id="lugar" class="form-control">
      
      <label class="label-edit">Formato</label>
      
      <input type="text" id="formato" class="form-control">

      <label class="label-edit">Inicio</label>
      
      <input type="text" id="inicio" class="form-control">

      <label class="label-edit">Finalizacion</label>
      
      <input  type="text" id="finalizacion" class="form-control">

      <label class="label-edit">Duración</label>
      
      <input type="text" id="duracion" class="form-control">
      `,    
      showCancelButton: true,
      allowOutsideClick:false,  
      confirmButtonColor: '#007E33',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      focusConfirm: false,
      customClass:{
        popup:'popup-edit',
        title:'title-edit'

      },
      


      preConfirm: () => {
        const cargo = (<HTMLInputElement>document.querySelector('#cargo')).value 
        const lugar = (<HTMLInputElement>document.querySelector('#lugar')).value      
        const formato =(<HTMLInputElement>document.querySelector('#formato')).value
        const inicio =(<HTMLInputElement>document.querySelector('#inicio')).value 
        const finalizacion =(<HTMLInputElement>document.querySelector('#finalizacion')).value  
        const duracion =(<HTMLInputElement>document.querySelector('#duracion')).value    

        if(cargo!=""){
          this.experienciaList[indice].position=cargo;
        }
        if(lugar!=""){
          this.experienciaList[indice].company=lugar;
        }
        if(formato!=""){
          this.experienciaList[indice].mode=formato;
        }
        if(inicio!=""){
          this.experienciaList[indice].started=inicio;
        }
        if(finalizacion!=""){
          this.experienciaList[indice].ended=finalizacion;
        }
        if(duracion!=""){
          this.experienciaList[indice].timeElapsed=duracion;
        }
              
        if (!cargo && !lugar && !formato && !inicio && !finalizacion && !duracion) {
          Swal.showValidationMessage(`Debe editar al menos un campo para aceptar!`)
        }          
        
        
        this.datosPorfolio.editarExperiencia(this.experienciaList[indice], this.experienciaList[indice].id).subscribe(()=>{         
      })
           
      }  
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Editado!',
          'Experiencia editado.',
          'success'
        )              
      }
    })


  }


  editarEducacion(indice:number){
    Swal.fire({
      title: 'Editar Educacion',
      html: `
      <label class="label-edit">Nombre de la Institución</label>
      
      <input type="text" id="institucion" class="form-control">
      
      <label class="label-edit">Título</label>
      
      <input type="text" id="titulo" class="form-control">
      
      <label class="label-edit">Tipo</label>
      
      <input type="text" id="tipo" class="form-control">

      <label class="label-edit">Inicio</label>
      
      <input type="text" id="inicio" class="form-control">

      <label class="label-edit">Finalizacion</label>
      
      <input type="text" id="finalizacion" class="form-control">
      `,
      allowOutsideClick:false,    
      showCancelButton: true,
      confirmButtonColor: '#007E33',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      focusConfirm: false,
      customClass:{
        popup:'popup-edit',
        title:'title-edit'     
        
      },
      preConfirm: () => {
        const institucion = (<HTMLInputElement>document.querySelector('#institucion')).value 
        const titulo = (<HTMLInputElement>document.querySelector('#titulo')).value      
        const tipo =(<HTMLInputElement>document.querySelector('#tipo')).value
        const inicio=(<HTMLInputElement>document.querySelector('#inicio')).value 
        const finalizacion =(<HTMLInputElement>document.querySelector('#finalizacion')).value  
   

        if(institucion!=""){
          this.educacionList[indice].school=institucion;
        }
        if(titulo!=""){
          this.educacionList[indice].title=titulo;
        }
        if(tipo!=""){
          this.educacionList[indice].career=tipo;
        }
        if(inicio!=""){
          this.educacionList[indice].started=inicio;
        }
        if(finalizacion!=""){
          this.educacionList[indice].ended=finalizacion;
        }
      
      
              
        if (!institucion && !titulo && !tipo && !inicio && !finalizacion) {
          Swal.showValidationMessage(`Debe editar al menos un campo para aceptar!`)
        }          
        
        
        this.datosPorfolio.editarEducacion(this.educacionList[indice], this.educacionList[indice].id).subscribe(()=>{  
              
      })
           
      }  
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Editado!',
          'Educación editada.',
          'success'
        )              
      }
    })


  }

  borrarExperiencia(indice:number){

    
    Swal.fire({
      title: 'Borrar experiencia',
      text: "¿Desea borrar definitivamente la experiencia seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick:false,  
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
      allowOutsideClick:false,  
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


    this.obtenerEducacion().subscribe(educaciones=>{
      educaciones.sort((edu1:any, edu2:any)=> {
        if (edu1.id < edu2.id){
          return -1;
        }else {
          return 1;
        }
      })       
      this.educacionList=educaciones;
    })

    this.obtenerExperiencia().subscribe(experiencias =>{
      experiencias.sort((exp1:any, exp2:any)=> {
        if (exp1.id < exp2.id){
          return -1;
        }else {
          return 1;
        }
      })        
      this.experienciaList=experiencias;      
    })

    this.datosPorfolio.DisparadorDeAgregaExp.subscribe(()=>{
      this.agregar_experiencia();
    }) 

    this.datosPorfolio.DisparadorDeAgregaEdu.subscribe(()=>{
      this.agregarEdu();
    })
  }

 

}
