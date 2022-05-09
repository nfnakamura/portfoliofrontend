import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
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
  load=false;
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

  
  userLogged=this.authService.getUserLogged();

  
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
    window.scrollBy(0,1000);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }

  agregaHabilidad(){
    this.datosPorfolio.DisparadorDeAgregaHab.emit();  
    window.scrollBy(0,2300);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }

  agregaEducacion(){
    this.datosPorfolio.DisparadorDeAgregaEdu.emit();  
    window.scrollBy(0,1600);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }

  agregaProyecto(){
    this.datosPorfolio.DisparadorDeAgregaProy.emit();  
    window.scrollBy(0,3500);
    this.agregaSeccion=false;
    this.muestraAgregaSeccion=true;  
  }



  editarInfo(){
    this.editaInfo=true;
    window.scrollBy(0,350);
  }


  cancelarEdicion(){
    this.editaInfo=false;
    window.scrollBy(0,-350);
  }

  aceptarEdicion(){    

    if(this.nombre =="" && this.apellido=="" && this.trabajos=="" && this.lugar=="" && this.imagen==""){
          this.mostrarAlert=true;
    }else{
      this.editaInfo=false;
      this.mostrarAlert=false;

          if(this.nombre !=""){
              this.miPorfolio.nombre = this.nombre; 

              this.datosPorfolio.guardarNombre(this.miPorfolio).subscribe(() =>{
              
              this.ngOnInit();  
              }
            )          
          }
          if(this.apellido !=""){            
            this.miPorfolio.apellido = this.apellido;

            this.datosPorfolio.guardarApellido(this.miPorfolio).subscribe(() =>{
            
            this.ngOnInit();  
            }
          )
          }
          if(this.trabajos!=""){   
            this.miPorfolio.position=this.trabajos;

            this.datosPorfolio.guardarTrabajo(this.miPorfolio).subscribe(() =>{
             
              this.ngOnInit();  
              }
            )     
          }              
          if(this.lugar!=""){
            this.miPorfolio.ubication=this.lugar;

            this.datosPorfolio.guardarUbicación(this.miPorfolio).subscribe(()=>{
              
              this.ngOnInit();  
              }

            )       
          }                         
            this.datosPorfolio.guardarImagen(this.miPorfolio).subscribe(()=>{
           
           })
           this.datosPorfolio.guardarBanner(this.miPorfolio).subscribe(()=>{
           
          })
           
         
          
    }   
     
  }


 cargarImagen(event:any){  
    console.log(event.target.files);   
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

  cargarBanner(event:any){  
    console.log(event.target.files);   
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
      title: 'Nahuel Nakamura',
      text: 'mail: nfn1991@hotmail.com',            
    })
  }


  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }

  ngOnInit(): void {

    this.datosPorfolio.cargarDatos().subscribe(data =>{
       this.miPorfolio=data;
       this.load=true;
    });
  }
}
