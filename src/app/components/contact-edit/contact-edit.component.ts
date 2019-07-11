import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../models/contact';
import * as moment from 'moment';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private contactService: ContactService) { }

  contactForm: FormGroup;
  id: number;
  lastName: string;
  firstName: string;
  address: string;
  isProfessionnal: number;
  birthDate: Date;
  contact: Contact;
  checked = false;
  birthDateResult;

  myPatternName = new RegExp('^([A-Za-zéèêëçäà]+[,.]?[ ]?|[A-Za-zéèêëçäà]+[\'-]?)+$');


  ngOnInit() {
    this.getContact(this.route.snapshot.params.id);
    this.contactForm = this.formBuilder.group({
      lastName : [null, [Validators.required, Validators.minLength(2), Validators.pattern(this.myPatternName)]],
      firstName : [null, [Validators.required, Validators.minLength(2), Validators.pattern(this.myPatternName)]],
      address : [null, [Validators.required, Validators.minLength(2)]],
      isProfessionnal: ['', [Validators.required]],
      birthDate : [moment(), [Validators.required]]
    });
  }
  /* Méthode de récupération du contact à modifier*/
  getContact(id) {
    this.contactService.getContact(id).subscribe(data => {
      this.id = data.id;
      this.contactForm.setValue({
        lastName: data.lastName,
        firstName: data.firstName,
        address: data.address,
        isProfessionnal: data.isProfessionnal,
        birthDate: new Date(data.birthDate)
      });
    });
  }

  /* Méthode de modification du contact */
  onFormSubmit(contact: Contact) {
    contact = {} as Contact;
    contact.lastName = this.contactForm.get(['lastName']).value;
    contact.firstName = this.contactForm.get(['firstName']).value;
    contact.address = this.contactForm.get(['address']).value;
    contact.isProfessionnal = this.isProfessionnal;
    this.birthDateResult = new Date(this.contactForm.get(['birthDate']).value).setHours(12);
    contact.birthDate = this.birthDateResult;
    this.contactService.updateContact(this.id, contact).subscribe(data => data);
    this.gotoContactList();
  }
  /* Méthode pour retour au tableau après la modification du contact */
  gotoContactList() {
    this.router.navigate(['/']);
  }
  /* Permet de transformr le résultat du bouton de booléen à nombre
(car un nombre est stocké en BDD pour respecter le schéma UML fournit) */
  changedToogleResultToBoolInNumber() {
    if (this.checked === true) {
      return this.isProfessionnal = 1;
    } else {
      return this.isProfessionnal = 0;
    }
  }
}
