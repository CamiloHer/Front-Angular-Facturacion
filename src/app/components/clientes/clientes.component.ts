import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { TiposDocumentos } from 'src/app/interfaces/tipos-documentos';
import { ClientesService } from 'src/app/services/clientes.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:Cliente[];
  tipos: TiposDocumentos[];
  constructor(
    private clientes_S:ClientesService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.traerClientes();
    this.getTipos()
  }
  traerClientes(){
    this.clientes_S.getClientes().subscribe((data:any)=>{
      this.clientes = data.data.$values;
    })
  }
  getTipos(){
    this.clientes_S.getTipos().subscribe((data:any)=>{
      this.tipos = data.data.$values
    })
  }

  irCliente(doc){
    this.router.navigate(['clientes','formulario-cliente',doc]),{
      relativeTo: this.route
    }
  }
  confirmacionEliminar(id){
    swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar este producto?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result)=>{
      if (result.value) {
        this.deleteCliente(id);
      }
    })
  }
  deleteCliente(id){
    this.clientes_S.deleteCliente(id).subscribe((data:any)=>{
      if (data.codigo == 0) {
        this.clientes = this.clientes.filter(p=>{
          return p.documento != id
        })
      }
    })
  }
  filtradoTipo(id){
    
    let nombre = this.tipos.find(t=>{t.id == id})
    console.log(nombre);
    
  }


}
