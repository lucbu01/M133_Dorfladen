import { Component, OnInit } from '@angular/core';
import { ContactData } from '../../../../models/ContactData';
import { ContactDataValidator, ContactDataValidatorState } from '../../../../models/ContactDataValidator';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  contactData : ContactData = { firstname: '', lastname: '', email: '' };
  messages : any = {
    OK: '',
    FIRSTNAME_REQUIRED: 'Vorname ist ein Pflichtfeld',
    LASTNAME_REQUIRED: 'Nachname ist ein Pflichtfeld',
    EMAIL_REQUIRED: 'E-Mail ist ein Pflichtfeld',
    EMAIL_FORMAT: 'Im Feld E-Mail muss eine gültige E-Mail-Adresse stehen'
  };
  validator : any = {
    firstname: {
      valid: true,
      message: 'OK'
    },
    lastname: {
      valid: true,
      message: 'OK'
    },
    email: {
      valid: true,
      message: 'OK'
    },
  };

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      if(cart.positions.length === 0) {
        this.router.navigate(['/']);
      }
    })
  }

  validateFirstname() : boolean {
    const state: ContactDataValidatorState = ContactDataValidator.validateFirstname(this.contactData.firstname);
    this.validator.firstname.valid = state === ContactDataValidatorState.OK;
    this.validator.firstname.message = state.toString();
    return this.validator.firstname.valid;
  }

  validateLastname() : boolean {
    const state: ContactDataValidatorState = ContactDataValidator.validateLastname(this.contactData.lastname);
    this.validator.lastname.valid = state === ContactDataValidatorState.OK;
    this.validator.lastname.message = state.toString();
    return this.validator.lastname.valid;
  }

  validateEmail() : boolean {
    const state: ContactDataValidatorState = ContactDataValidator.validateEmail(this.contactData.email);
    this.validator.email.valid = state === ContactDataValidatorState.OK;
    this.validator.email.message = state.toString();
    return this.validator.email.valid;
  }

  checkout() {
    if (this.validateFirstname() && this.validateLastname() && this.validateEmail()) {
      // service aufrufen
    }
  }
}
