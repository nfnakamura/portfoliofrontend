import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';
import { callbackify } from 'util';
import { ExpEducationComponent } from '../exp-education/exp-education.component';

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
  }

 
  agregarExperiencia(){ 
    this.datosPorfolio.DisparadorDeAgregaExp.emit();  
    window.scrollBy(0,500);
    this.agregaSeccion=false;
  }

  agregaHabilidad(){
    this.datosPorfolio.DisparadorDeAgregaHab.emit();  
    window.scrollBy(0,1500);
    this.agregaSeccion=false;
  }

  agregaEducacion(){
    this.datosPorfolio.DisparadorDeAgregaEdu.emit();  
    window.scrollBy(0,800);
    this.agregaSeccion=false;
  }

  agregaProyecto(){
    this.datosPorfolio.DisparadorDeAgregaProy.emit();  
    window.scrollBy(0,1800);
    this.agregaSeccion=false;
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
    


    // for(let i = 0; i<archivos.length; i++){

    //   let reader = new FileReader();
    //   reader.readAsDataURL(archivos[0]);
    //   reader.onloadend= () => {
        
    //     this.imagenes.push(reader.result);
    //     this.datosPorfolio.guardarImagenPerfil(nombre+"_"+Date.now(), reader.result).then(urlImagen=>{
    //       let usuario={
    //         name:'Nahuel',
    //         imgProfile:urlImagen,
    //       }
    //       console.log(urlImagen);

    //      /*subiendo imagen al json de firebase*/
    //       let imagenActualizada:any=[];  
    //       imagenActualizada.push(urlImagen);            
    //       this.datosPorfolio.guardarImagenEnJson(imagenActualizada).subscribe((image)=>{
    //         this.ngOnInit();
    //         console.log(image)
    //     });
    //     });
    //   }
    // }



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
