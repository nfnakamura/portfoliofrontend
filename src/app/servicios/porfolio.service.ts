import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutComponent } from '../components/about/about.component';
import { ExpEducationComponent } from '../components/exp-education/exp-education.component';
import { HeaderComponent } from '../components/header/header.component';
import { ProyectsComponent } from '../components/proyects/proyects.component';
import { SkillsComponent } from '../components/skills/skills.component';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';


firebase.initializeApp(environment.firebaseConfig);

const httpOptions={

  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })

}

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  urlBack = 'https://portfolionakamura.herokuapp.com/'

  storageRef = firebase.app().storage().ref();

  @Output() DisparadorDeAgregaExp: EventEmitter<any> = new EventEmitter();
  @Output() DisparadorDeAgregaEdu: EventEmitter<any> = new EventEmitter();
  @Output() DisparadorDeAgregaHab: EventEmitter<any> = new EventEmitter();
  @Output() DisparadorDeAgregaProy: EventEmitter<any> = new EventEmitter();

  
  constructor(private http:HttpClient) { }


  /*GET*/
  cargarDatos():Observable<any>{
      
     return this.http.get(this.urlBack+'ver/personas/1');

 }

cargarExperiencia():Observable<any>{
  return this.http.get(this.urlBack+'ver/experiencias');
}

 cargarEducacion():Observable<any>{
   return this.http.get(this.urlBack+'ver/educaciones');
 }

 cargarHabilidades():Observable<any>{
   return this.http.get(this.urlBack+'ver/habilidades');
 }

 cargarProyectos():Observable<any>{
    return this.http.get(this.urlBack+'ver/proyectos')
 }

 /*DELETE*/
 
 eliminarDatos():Observable<any>{
   return this.http.delete('https://portfolio-7c37f-default-rtdb.firebaseio.com/.json')
 }


 eliminarProyecto(idProyecto:number): Observable<ProyectsComponent>{
  return this.http.delete<ProyectsComponent>(this.urlBack+`delete/persona/1/proyecto/${idProyecto}`);
}

 eliminarHabilidad(idHabilidad:number): Observable<SkillsComponent>{
   return this.http.delete<SkillsComponent>(this.urlBack+`delete/persona/1/habilidad/${idHabilidad}`);
 }

 eliminarExperiencia(idExperiencia:number): Observable<ExpEducationComponent>{
  return this.http.delete<ExpEducationComponent>(this.urlBack+`delete/persona/1/experiencia/${idExperiencia}`);
}

eliminarEducacion(idEducacion:number): Observable<ExpEducationComponent>{
  return this.http.delete<ExpEducationComponent>(this.urlBack+`delete/persona/1/educacion/${idEducacion}`);
}

  /*POST*/  

  guardarProyecto(proyecto:ProyectsComponent[]): Observable<ProyectsComponent>{                 
    return this.http.post<ProyectsComponent>(this.urlBack+'new/persona/1/proyecto', proyecto, httpOptions);
}

  guardarHabilidad(habilidad:SkillsComponent[]): Observable<SkillsComponent>{      
      return this.http.post<SkillsComponent>(this.urlBack+'new/persona/1/habilidad', habilidad, httpOptions);
  }

  guardarEducacion(educacion:ExpEducationComponent[]): Observable<ExpEducationComponent>{    
    return this.http.post<ExpEducationComponent>(this.urlBack+'new/persona/1/educacion', educacion, httpOptions);
  }

  guardarExperiencia(experiencia:ExpEducationComponent[]): Observable<ExpEducationComponent>{
    return this.http.post<ExpEducationComponent>(this.urlBack+'new/persona/1/experiencia', experiencia, httpOptions);
  }


  /*PATCH - PUT*/

  guardarAbout(about:AboutComponent[]): Observable<AboutComponent>{
    return this.http.patch<AboutComponent>(this.urlBack+'edit/persona/1', about, httpOptions);
  }

  guardarPersona(persona:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.patch<HeaderComponent>(this.urlBack+'edit/persona/1', persona, httpOptions);
  }

  guardarImagenExperiencia(image:ExpEducationComponent[], idexperiencia:number): Observable<ExpEducationComponent>{
    return this.http.patch<ExpEducationComponent>(this.urlBack+`edit/persona/1/experiencia/${idexperiencia}/imagen`, image, httpOptions);
  }

  editarProyecto(proyecto:ProyectsComponent[], idProyecto:number): Observable<ProyectsComponent>{
    return this.http.patch<ProyectsComponent>(this.urlBack+`edit/persona/1/proyecto/${idProyecto}`, proyecto, httpOptions);
  }

  editarHabilidad(habilidad:SkillsComponent[], idHabilidad:number): Observable<SkillsComponent>{
    return this.http.patch<SkillsComponent>(this.urlBack+`edit/persona/1/habilidad/${idHabilidad}`, habilidad, httpOptions);
  }


/* Guardando en el storage de Firebase*/
  async guardarImagenPerfil(nombre:string, imgBase64:any){

    try{
      let respuesta = await this.storageRef.child("users/"+nombre).putString(imgBase64, 'data_url')     
      return await respuesta.ref.getDownloadURL();
      
    }catch(err){
      console.log(err);
      return null;
    }

  }

  async guardarImagenExp(nombre:string, imgBase64:any){

    try{
      let respuesta = await this.storageRef.child("experiencia/"+nombre).putString(imgBase64, 'data_url')     
      return await respuesta.ref.getDownloadURL();
      
    }catch(err){
      console.log(err);
      return null;
    }

  }


  async guardarImagenEdu(nombre:string, imgBase64:any){

    try{
      let respuesta = await this.storageRef.child("educacion/"+nombre).putString(imgBase64, 'data_url')     
      return await respuesta.ref.getDownloadURL();
      
    }catch(err){
      console.log(err);
      return null;
    }

  }






}
