import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:8085/api/cart';

  constructor(private http: HttpClient) {}

  getCart(userId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`);
  }

  clearCart(userId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${userId}`);
  }

  addToCart(userId: any, productId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct`, {
      userId,
      productId,
    });
  }

  removeFromCart(userId: any, productId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/removeProduct`, {
      params: { userId, productId },
    });
  }

  updateCart(userId: any, productId: any, quantity: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}?userId=${userId}&productId=${productId}&quantity=${quantity}`,
      {}
    );
  }

  checkout(userId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/checkout?userId=${userId}`, {});
  }
}
