import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  storageRef = firebase.app().storage().ref();
 
  constructor(private http:HttpClient) { }

/*Obtener datos desde data.json
  obtenerDatos():Observable<any>{
    return this.http.get('./assets/data/data.json');    
  }
*/

  /*GET*/
  cargarDatos():Observable<any>{
      
     return this.http.get('http://localhost:8080/ver/personas/1');

 }

 /*DELETE*/
 
 eliminarDatos():Observable<any>{
   return this.http.delete('https://portfolio-7c37f-default-rtdb.firebaseio.com/.json')
 }


 eliminarProyecto(idProyecto:number): Observable<ProyectsComponent>{
  return this.http.delete<ProyectsComponent>(`http://localhost:8080/delete/persona/1/proyecto/${idProyecto}`);
}

 eliminarHabilidad(idHabilidad:number): Observable<SkillsComponent>{
   return this.http.delete<SkillsComponent>(`http://localhost:8080/delete/persona/1/habilidad/${idHabilidad}`);
 }

 eliminarExperiencia(idExperiencia:number): Observable<ExpEducationComponent>{
  return this.http.delete<ExpEducationComponent>(`http://localhost:8080/delete/persona/1/experiencia/${idExperiencia}`);
}

eliminarEducacion(idEducacion:number): Observable<ExpEducationComponent>{
  return this.http.delete<ExpEducationComponent>(`http://localhost:8080/delete/persona/1/educacion/${idEducacion}`);
}

  /*POST*/  

  guardarProyecto(proyecto:ProyectsComponent[]): Observable<ProyectsComponent>{                 
    return this.http.post<ProyectsComponent>('http://localhost:8080/new/persona/1/proyecto', proyecto, httpOptions);
}

  guardarHabilidad(habilidad:SkillsComponent[]): Observable<SkillsComponent>{      
      return this.http.post<SkillsComponent>('http://localhost:8080/new/persona/1/habilidad', habilidad, httpOptions);
  }

  guardarEducacion(educacion:ExpEducationComponent[]): Observable<ExpEducationComponent>{    
    return this.http.post<ExpEducationComponent>('http://localhost:8080/new/persona/1/educacion', educacion, httpOptions);
  }

  guardarExperiencia(experiencia:ExpEducationComponent[]): Observable<ExpEducationComponent>{
    return this.http.post<ExpEducationComponent>('http://localhost:8080/new/persona/1/experiencia', experiencia, httpOptions);
  }


  /*PATCH - PUT*/

  guardarAbout(about:AboutComponent[]): Observable<AboutComponent>{
    return this.http.patch<AboutComponent>('http://localhost:8080/edit/persona/1/about', about, httpOptions);
  }

  guardarNombre(nombre:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.patch<HeaderComponent>('http://localhost:8080/edit/persona/1/nombre', nombre, httpOptions);
  }

  guardarApellido(apellido:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.patch<HeaderComponent>('http://localhost:8080/edit/persona/1/apellido', apellido, httpOptions);
  }
  
  guardarTrabajo(position:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.patch<HeaderComponent>('http://localhost:8080/edit/persona/1/trabajo', position, httpOptions);
  }
  
  guardarUbicación(ubication:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.patch<HeaderComponent>('http://localhost:8080/edit/persona/1/ubicacion', ubication, httpOptions);
  }

/* Guardando en el storage*/
  async guardarImagenPerfil(nombre:string, imgBase64:any){

    try{

      let respuesta = await this.storageRef.child("users/"+nombre).putString(imgBase64, 'data_url')     
      return await respuesta.ref.getDownloadURL();
      
    }catch(err){
      console.log(err);
      return null;
    }

  }

  guardarImagenEnJson(image:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.put<HeaderComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/image.json', image, httpOptions);
  }



}
