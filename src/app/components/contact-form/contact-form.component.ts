import { Component, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import * as moment from 'moment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService,
              private formBuilder: FormBuilder) {
    this.contact = new Contact();
  }

  contact: Contact;
  contactForm: FormGroup;
  isProfessionnal: number;
  checked = false;
  birthDateResult;

/* Permet d'accepter que certain caractère dans les champs à remplir lors de la création du contact */
  myPatternName = new RegExp('^([A-Za-zéèêëçäà]+[,.]?[ ]?|[A-Za-zéèêëçäà]+[\'-]?)+$');

/* Initialise le formulaire et fait la validation des champs de saisie utilisateur */
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.myPatternName)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.myPatternName)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      isProfessionnal: ['', Validators.required],
      birthDate: [moment(), Validators.required],
    });
  }

  /* Création d'un nouveau contact via le formulaire formGroup */
  onSubmit() {
    const contact = {} as Contact;
    contact.lastName = this.contactForm.get(['lastName']).value;
    contact.firstName = this.contactForm.get(['firstName']).value;
    contact.address = this.contactForm.get(['address']).value;
    contact.isProfessionnal = this.isProfessionnal;
    this.birthDateResult = new Date(this.contactForm.get(['birthDate']).value).setHours(12);
    contact.birthDate = this.birthDateResult;
    this.contactService.saveContact(contact).subscribe(data => data);
    this.gotoContactList();
  }

  /* Méthode pour retour au tableau après la création du contact */
  gotoContactList() {
    this.router.navigate(['/']);
  }

  /* Permet de transformer le résultat du bouton de booléen à nombre
  (car un nombre est stocké en BDD pour respecter le schéma UML fournit) */
  changedToogleResultToBoolInNumber() {
    if (this.checked === true) {
      return this.isProfessionnal = 1;
    } else {
      return this.isProfessionnal = 0;
    }
  }
}
