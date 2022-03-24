import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  baseUrl = 'https://localhost:44323/api'
  constructor(private http: HttpClient) { }
  getProducto(id){
    return this.http.get(`${this.baseUrl}/Productos/GetProducto/${id}`);
  }
  getProductos(){
    return this.http.get(`${this.baseUrl}/Productos/GetProductos`);
  }
  postProducto(producto){
    return this.http.post(`${this.baseUrl}/Productos/PostProductos`,producto);
  }
  putProducto(id,producto){
    return this.http.put(`${this.baseUrl}/Productos/PutProductos/${id}`,producto);
  }
  deleteProdcto(id){
    return this.http.delete(`${this.baseUrl}/Productos/DeleteProductos/${id}`)
  }
}
