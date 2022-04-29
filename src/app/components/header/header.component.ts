import { Component, OnInit } from '@angular/core';
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

  imagen:string="";
  nombre:string="";
  apellido:string="";
  trabajos:string="";
  lugar:string="";

  nombreApellido:any=[];
  
  imagenes:any=[];

 
  userLogged=this.authService.getUserLogged();
  

  editarInfo(){
    this.editaInfo=true;
  }


  cancelarEdicion(){
    this.editaInfo=false;

  }
  aceptarEdicion(){    

    if(this.nombre =="" && this.apellido=="" && this.trabajos=="" && this.lugar=="" && this.imagenes==""){
          this.mostrarAlert=true;
    }else{
      this.editaInfo=false;
      this.mostrarAlert=false;

          if(this.nombre !=""){
              this.miPorfolio.nombre = this.nombre; 
            
              let nombreActualizado:any=[];
              nombreActualizado.push(this.miPorfolio.nombre);

              this.datosPorfolio.guardarNombre(this.miPorfolio).subscribe(() =>{
              console.log("Nombre actualizado");
              this.ngOnInit();  
              }
            )          
          }
          if(this.apellido !=""){
            
            this.miPorfolio.apellido = this.apellido;
            
            let apellidoActualizado:any=[];
            apellidoActualizado.push(this.miPorfolio.apellido);

            this.datosPorfolio.guardarApellido(this.miPorfolio).subscribe(() =>{
            console.log("Apellido actualizado");
            this.ngOnInit();  
            }
          )
          }
          if(this.trabajos!=""){   

            this.miPorfolio.position=this.trabajos;

            let trabajoActualizado:any=[];
            trabajoActualizado.push(this.miPorfolio.position);

            this.datosPorfolio.guardarTrabajo(this.miPorfolio).subscribe(() =>{
              console.log("Trabajo actualizado");
              this.ngOnInit();  
              }
            )     
          }              
          if(this.lugar!=""){
            this.miPorfolio.ubication=this.lugar;

            let ubicacionActualizada:any=[];
            ubicacionActualizada.push(this.miPorfolio.ubication)

            this.datosPorfolio.guardarUbicación(this.miPorfolio).subscribe(()=>{
              console.log("Ubicacion actualizada");
              this.ngOnInit();  
              }
            )       
          }              
    }      
  }


  cargarImagen(event:any){    

    let archivos = event.target.files    
    let nombre = "Nahuel";

    for(let i = 0; i<archivos.length; i++){

      let reader = new FileReader();
      reader.readAsDataURL(archivos[0]);
      reader.onloadend= () => {
        
        this.imagenes.push(reader.result);
        this.datosPorfolio.guardarImagenPerfil(nombre+"_"+Date.now(), reader.result).then(urlImagen=>{
          let usuario={
            name:'Nahuel',
            imgProfile:urlImagen,
          }
          console.log(urlImagen);

         /*subiendo imagen al json de firebase*/
          let imagenActualizada:any=[];  
          imagenActualizada.push(urlImagen);            
          this.datosPorfolio.guardarImagenEnJson(imagenActualizada).subscribe((image)=>{
            this.ngOnInit();
            console.log(image)
        });
        });
      }
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
