import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { TiposDocumentos } from 'src/app/interfaces/tipos-documentos';
import { ClientesService } from 'src/app/services/clientes.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {
  formCliente: FormGroup;
  cliente: Cliente = {};
  clienteId: any;
  tipos: TiposDocumentos[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cliente_S: ClientesService
  ) { 
    this.formCliente = new FormGroup({
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30)
        ])
      ),
      tipoDocumento: new FormControl(
        null,
        Validators.required
      ),
      documento: new FormControl(
        null,
        Validators.required
      ),
      edad: new FormControl(
        null,
        Validators.required
      )
    })
  }

  ngOnInit(): void {
    const  id = this.route.snapshot.paramMap.get('id');
    this.clienteId= id;
    this.getTipos()
    if (id != "nuevo") {
      this.getCliente(parseInt(id));
    }
  }
  getCliente(id){
    this.cliente_S.getCliente(id).subscribe((data:any)=>{
      this.cliente = data.data;
      this.formCliente.get('nombre').setValue(this.cliente.nombre);
      this.formCliente.get('documento').setValue(this.cliente.documento);
      this.formCliente.get('tipoDocumento').setValue(this.cliente.tipoDocumento);
      this.formCliente.get('edad').setValue(this.cliente.edad);
    })
  }
  getTipos(){
    this.cliente_S.getTipos().subscribe((data:any)=>{
      this.tipos = data.data.$values
    })
  }
  guardarCliente(){
    if(this.formCliente.invalid){
      return;
    } 

    this.cliente.documento =  this.formCliente.get("documento").value;
    this.cliente.tipoDocumento =  parseInt(this.formCliente.get("tipoDocumento").value);
    this.cliente.nombre =  this.formCliente.get("nombre").value;
    this.cliente.edad =  this.formCliente.get("edad").value;

    if (this.clienteId == 'nuevo') {
      this.postCliente(this.cliente);
    }
    else{
      this.putCliente(this.cliente.documento,this.cliente);
    }
    console.log(this.cliente);
  }
  postCliente(cliente){
    this.cliente_S.postCliente(cliente).subscribe((data:any)=>{
      if (data.codigo == 0) {
        this.swalSucces('registrado');
      }
    })
  }
  putCliente(id,cliente){
    this.cliente_S.putCliente(id,cliente).subscribe((data:any)=>{
      if (data.codigo == 0) {
        this.swalSucces('actualizado')
      }
    })
  }
  swalSucces(type){
    swal.fire({
      icon: 'success',
      title: `Se ha ${type} correctamente`,
      confirmButtonText:'Ver clientes'
    }).then(result =>{
      this.router.navigate(['clientes'])
    })
  }

}
