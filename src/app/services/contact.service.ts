import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl: string;
  private apiUrlForUpdate: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:9001/api/contact/';
    this.apiUrlForUpdate = 'http://localhost:9001/api/contact/update/';
  }

  /* Méthode pour récupération des données stockées en BDD via l'api*/
  public getContactsList(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }
  /* Méthode pour récupération d'un contact stocké en BDD via l'api*/
  getContact(id: number): Observable<Contact> {
    return this.http.get(this.apiUrl + id);
  }
  /* Méthode pour récupération une liste de contacts professionnel stocké en BDD via l'api*/
  public getContactsProfessionnel(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + 'getAllPro');
  }
  /* Méthode pour récupération une liste de contacts non professionnel stocké en BDD via l'api*/
  public getContactsNonProfessionnel(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + 'getAllNoPro');
  }
  /* Méthode de création d'un contact en BDD via l'api*/
  public saveContact(contact: Contact) {
    return this.http.post<Contact>(this.apiUrl + 'add', contact);
  }
  /* Méthode de modification d'un contact en BDD via l'api*/
  public updateContact(id, contact: Contact) {
    return this.http.put(this.apiUrlForUpdate + id, contact);
  }
  /* Méthode de suppression d'un contact en BDD via l'api*/
  public deleteContact(id: number): Observable<string> {
    return this.http.delete(this.apiUrl + id, {responseType: 'text'});
  }
}
