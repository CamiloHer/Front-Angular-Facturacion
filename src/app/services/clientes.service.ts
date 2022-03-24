import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseUrl = 'https://localhost:44323/api'
  constructor(private http: HttpClient) { }

  getCliente(id){
    return this.http.get(`${this.baseUrl}/Clientes/GetClientes/${id}`);
  }
  getClientes(){
    return this.http.get(`${this.baseUrl}/Clientes/GetClientes`);
  }
  postCliente(cliente){
    return this.http.post(`${this.baseUrl}/Clientes/PostClientes`,cliente);
  }
  putCliente(id,cliente){
    return this.http.put(`${this.baseUrl}/Clientes/PutClientes/${id}`,cliente);
  }
  deleteCliente(id){
    return this.http.delete(`${this.baseUrl}/Clientes/DeleteClientes/${id}`)
  }
  getTipos(){
    return this.http.get(`${this.baseUrl}/Clientes/GetTipos`);
  }
}
