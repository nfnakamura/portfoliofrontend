import { Component, OnInit } from '@angular/core';
import { Informacion } from 'src/app/modelos/headerData.model';
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

      if(this.nombre !="" && this.apellido!=""){

        this.miPorfolio.nombre = this.nombre; 
       

        let nombreActualizado:any=[];
        nombreActualizado.push(this.miPorfolio.nombre);

       this.datosPorfolio.guardarNombre(nombreActualizado).subscribe((nombre) =>
            console.log(nombre)


      )
     
       
      }

      if(this.apellido !=""){
        
        this.miPorfolio.apellido = this.apellido;
        

        let apellidoActualizado:any=[];
        apellidoActualizado.push(this.miPorfolio.apellido);

       /*this.datosPorfolio.guardarApellido(nombreActualizado).subscribe((apellido) =>
        console.log(apellido)*/
      }

      if(this.trabajos!=""){   
        this.miPorfolio.position=this.trabajos;

        let trabajoActualizado:any=[];
        trabajoActualizado.push(this.miPorfolio.position);

        this.datosPorfolio.guardarTrabajo(trabajoActualizado).subscribe((position) =>
          console.log(position)
        )
      
      }

              
      if(this.lugar!=""){
        this.miPorfolio.ubication=this.lugar;

        let ubicacionActualizada:any=[];

        ubicacionActualizada.push(this.miPorfolio.ubication)

        this.datosPorfolio.guardarUbicación(ubicacionActualizada).subscribe((ubication)=>
        console.log(ubication)
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
