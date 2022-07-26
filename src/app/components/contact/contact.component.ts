import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name: string;
  email: string;
  message: string;

  constructor(
    private contactService: ContactService,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const contact = new Contact(this.name, this.email, this.message);

    this.contactService.send(contact).subscribe(
      data => {
        this.iziToast.success({
          title: 'Mensaje enviado',
          message: data.message,
          position: 'bottomRight'
        });
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
        });
      }
    );
  }

}
