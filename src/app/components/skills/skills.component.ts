import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/modelos/skill.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{

  
  listaAptitudes:any=[];

  aceptaHabilidad=false;
  agregaHabilidad=false;

  mostrarAlert=false;
  alertPorcentaje=false;
  isLoad=false;

  habilidad:string="";
  porcentaje:string="";


  constructor(private datosPorfolio:PorfolioService, private authService:AuthService) { }  
  
  ngOnInit(): void { 
    this.obtenerHabilidad().subscribe(habilidades =>{   
      
      habilidades.sort((hab1:any, hab2:any)=> {
        if (hab1.id < hab2.id){
          return -1;
        }else {
          return 1;
        }
      })
      this.listaAptitudes=habilidades;
      this.isLoad=true;
    });
    this.datosPorfolio.DisparadorDeAgregaHab.subscribe(()=>{
      this.agregarHabilidad();
    })
  }


  userLogged=this.authService.getUserLogged();

  /*********************GET HABILIDAD***************************/

  obtenerHabilidad(){
    return this.datosPorfolio.cargarHabilidades();
  }

  /*******************AGREGAR HABILIDAD*************************/

  agregarHabilidad(){
    this.agregaHabilidad=true;    
  }

  aceptarHabilidad(){
    if(this.habilidad=="" || this.porcentaje==""){
      this.mostrarAlert=true;
      this.alertPorcentaje=false;
    }else if (parseInt(this.porcentaje)>100 || parseInt(this.porcentaje)<0){
      this.alertPorcentaje=true;
      this.mostrarAlert=false;
    }
    else{
      this.mostrarAlert=false;
      this.aceptaHabilidad=true;
      this.agregaHabilidad=false;

      let miHabilidad = new Habilidad(this.habilidad, parseInt(this.porcentaje), this.habilidad.toLowerCase());
      
      this.listaAptitudes.push(miHabilidad);

      let habilidadPost = this.listaAptitudes.slice(-1)[0];

      this.datosPorfolio.guardarHabilidad(habilidadPost).subscribe(() =>{        
      })          
    }    
  }
  
  cancelarHabilidad(){
    this.agregaHabilidad=false;
    this.alertPorcentaje=false;
    this.mostrarAlert=false;
  }

  /*******************EDIT HABILIDAD***************************/

  editarHabilidad(indice:number){
    Swal.fire({
      title: `Editar Habilidad #${indice + 1}`,
      html: `
      <label class="label-edit"">Habilidad</label>      
      <input type="text" id="habilidad" class="form-control">      
      <label class="label-edit"">%</label>      
      <input type="text" id="porcentaje" class="form-control">
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
      showClass:{        
        popup: 'swal2-noanimation',
      },
      preConfirm: () => {
        const habilidad = (<HTMLInputElement>document.querySelector('#habilidad')).value 
        const porcentaje = (<HTMLInputElement>document.querySelector('#porcentaje')).value     
     
        if(habilidad!=""){
          this.listaAptitudes[indice].name=habilidad;
        }
        if(porcentaje!=""){
          this.listaAptitudes[indice].progress=parseInt(porcentaje);
        }

        if (!habilidad && !porcentaje) {
          Swal.showValidationMessage(`Debe editar al menos un campo para aceptar!`)
        }   
                                
        this.datosPorfolio.editarHabilidad(this.listaAptitudes[indice], this.listaAptitudes[indice].id).subscribe(()=>{ 
      })
      }  
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Editada!',
          'Habilidad editada.',
          'success'
        )              
      }
    })


/********************DELETE HABILIDAD*********************/
  }  

  borrarHabilidad(indice:number){    
    Swal.fire({
      title: `Borrar Habilidad #${indice + 1}`,
      text: "??Desea borrar definitivamente la habilidad seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick:false,  
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      showClass:{        
        popup: 'swal2-noanimation',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrada!',
          'Habilidad borrada con ??xito.',
          'success'
        )
        this.datosPorfolio.eliminarHabilidad(this.listaAptitudes[indice].id).subscribe(()=>{
          this.listaAptitudes.splice(indice, 1);
     })
      }
    })

  }
}
