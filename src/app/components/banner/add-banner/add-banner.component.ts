import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent{

  faCamera = faCamera;

  constructor(
    private bannerService: BannerService,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  uploadedImage: File;
  uploadImageUrl: string;

  uploadImage(event: any) {
    this.uploadedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadImageUrl = reader.result as string;
    }
    reader.readAsDataURL(this.uploadedImage);
  }

  onCreate(): void {
    const image = this.uploadedImage;

    this.bannerService.save(image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Banner creado',
          message: data.message,
          position: 'bottomRight'
        });
        this.close();
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
      });
    });
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }
}
