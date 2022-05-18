import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';


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
  isLoad=false;
  agregaSeccion=false;
  muestraAgregaSeccion=true;

  imagen:string="a";
  nombre:string="";
  apellido:string="";
  trabajos:string="";
  lugar:string="";

  expAceptada=false;

  nombreApellido:any=[];
  
  imagenes:any=[];
  
  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  ngOnInit(): void {

    this.datosPorfolio.cargarDatos().subscribe(data =>{
       this.miPorfolio=data;
       this.isLoad=true;
    });
  }
  
  userLogged=this.authService.getUserLogged();

  
  /*************************ELEGIR SECCION PARA AGREGAR*************************/

  agregarSeccion(){
    this.agregaSeccion=true;
    this.muestraAgregaSeccion=false;    
  }

  cancelaAgregar(){
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }
 
  agregarExperiencia(){ 
    this.datosPorfolio.DisparadorDeAgregaExp.emit();  
    window.scrollBy(0,600);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }

  agregaHabilidad(){
    this.datosPorfolio.DisparadorDeAgregaHab.emit();  
    window.scrollBy(0,1800);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }

  agregaEducacion(){
    this.datosPorfolio.DisparadorDeAgregaEdu.emit();  
    window.scrollBy(0,1000);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }

  agregaProyecto(){
    this.datosPorfolio.DisparadorDeAgregaProy.emit();  
    window.scrollBy(0,2500);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }

  /***************************EDIT INFO HEADER***************************************/

  editarInfo(){
    this.editaInfo=true;
  }  

  cancelarEdicion(){
    this.editaInfo=false;   
  }

  aceptarEdicion(){    

    if(this.nombre =="" && this.apellido=="" && this.trabajos=="" && this.lugar=="" && this.imagen==""){
          this.mostrarAlert=true;
    }else{
      this.editaInfo=false;
      this.mostrarAlert=false;
      
          if(this.nombre !=""){
              this.miPorfolio.nombre = this.nombre;   
          }
          if(this.apellido !=""){            
            this.miPorfolio.apellido = this.apellido;
          }
          if(this.trabajos!=""){   
            this.miPorfolio.position=this.trabajos;
          }              
          if(this.lugar!=""){
            this.miPorfolio.ubication=this.lugar;
          }                         
          this.datosPorfolio.guardarPersona(this.miPorfolio).subscribe(()=>{            
           })                
    }        
  }

/********************SUBIENDO IMAGEN A FIREBASE*********************************/

 cargarImagen(event:any){  
     
    let archivo = event.target.files  
    let nombre = "Nahuel";
    let reader = new FileReader();
    reader.readAsDataURL(archivo[0]);
    reader.onloadend=() =>{
      this.imagenes.push(reader.result);
      this.datosPorfolio.guardarImagenPerfil(nombre+"_"+Date.now(), reader.result).then(urlImagen=>{
        let usuario={
          name:'Nahuel',
          imgProfile: urlImagen,
        }       
        this.miPorfolio.image=urlImagen;
      })     
    }        
  }

/**********************SUBIENDO BANNER A FIREBASE****************************/

  cargarBanner(event:any){  
  
    let archivo = event.target.files  
    let nombre = "Banner";
    let reader = new FileReader();
    reader.readAsDataURL(archivo[0]);
    reader.onloadend=() =>{
      this.imagenes.push(reader.result);
      this.datosPorfolio.guardarImagenPerfil(nombre+"_"+Date.now(), reader.result).then(urlImagen=>{
        let usuario={
          name:'Banner',
          imgProfile: urlImagen,
        }       
        this.miPorfolio.backImage=urlImagen;
      })     
    }        
  }

  infoContacto(){
    Swal.fire({
      icon: 'info',
      title: `${this.miPorfolio.nombre} ${this.miPorfolio.apellido}`,
      text: 'mail: nfn1991@hotmail.com',            
    })
  }

}
