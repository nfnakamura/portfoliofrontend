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
   
   private apiUrl = 'https://portfolio-7c37f-default-rtdb.firebaseio.com/.json';

  constructor(private http:HttpClient) { }

/*Obtener datos desde data.json
  obtenerDatos():Observable<any>{
    return this.http.get('./assets/data/data.json');    
  }
*/

  /*TRAER DESDE FIREBASE*/
  cargarDatos():Observable<any>{
      return this.http.get('https://portfolio-7c37f-default-rtdb.firebaseio.com/.json');
 }

 /*ELIMINAR EN FIREBASE*/
 
 eliminarDatos():Observable<any>{
   return this.http.delete('https://portfolio-7c37f-default-rtdb.firebaseio.com/.json')
 }



 eliminarProyecto(indiceProyecto:number): Observable<ProyectsComponent>{
    return this.http.delete<ProyectsComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/achivements/'+indiceProyecto+'.json');
 }

 eliminarHabilidad(indiceHabilidad:number): Observable<SkillsComponent>{
   return this.http.delete<SkillsComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/aptitudes/'+indiceHabilidad+'.json');
 }

 eliminarExperiencia(indiceExperiencia:number): Observable<ExpEducationComponent>{
  return this.http.delete<ExpEducationComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/experience/'+indiceExperiencia+'.json');
}

eliminarEducacion(indiceEducacion:number): Observable<ExpEducationComponent>{
  return this.http.delete<ExpEducationComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/education/'+indiceEducacion+'.json');
}



  /*LLEVAR A FIREBASE*/ 
    
  guardarProyecto(proyecto:ProyectsComponent[]): Observable<ProyectsComponent>{
        return this.http.put<ProyectsComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/achivements.json', proyecto, httpOptions);
  }

  guardarHabilidad(habilidad:SkillsComponent[]): Observable<SkillsComponent>{
      return this.http.put<SkillsComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/aptitudes.json', habilidad, httpOptions);
  }

  guardarEducacion(educacion:ExpEducationComponent[]): Observable<ExpEducationComponent>{
    return this.http.put<ExpEducationComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/education.json', educacion, httpOptions);
  }

  guardarExperiencia(experiencia:ExpEducationComponent[]): Observable<ExpEducationComponent>{
    return this.http.put<ExpEducationComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/experience.json', experiencia, httpOptions);
  }

  guardarAbout(about:AboutComponent[]): Observable<AboutComponent>{
    return this.http.put<AboutComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/.json', about, httpOptions);
  }
/* INVESTIGAR POR QUE NO SE ESTÁ GUARDANDO ERROR 400*/
  guardarNombre(name:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.put<HeaderComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/name.json', name, httpOptions);
  }
  
  guardarTrabajo(position:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.put<HeaderComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/position.json', position, httpOptions);
  }
  
  guardarUbicación(ubication:HeaderComponent[]): Observable<HeaderComponent>{
    return this.http.put<HeaderComponent>('https://portfolio-7c37f-default-rtdb.firebaseio.com/ubication.json', ubication, httpOptions);
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
