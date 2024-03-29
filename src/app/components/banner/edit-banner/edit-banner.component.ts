import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { BannerService } from 'src/app/services/banner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {

  faCamera = faCamera;

  apiUrl: string = environment.apiUrl;
  bannerImage: File;
  bannerUrl: string = 'https://dummyimage.com/1920x1080';

  constructor(
    private bannerService: BannerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.bannerService.view(id).subscribe(
      data => {
        if (data != null && data.image != null) {
          this.bannerUrl = this.apiUrl + 'image/ver/' + data.image.name;
        }
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight',
        });
      }
    );
  }

  updateImage(event: any) {
    this.bannerImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.bannerUrl = reader.result as string;
    }
    reader.readAsDataURL(this.bannerImage);
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    const image = this.bannerImage;

    this.bannerService.update(id, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Sobre mi actualizado',
          message: data.message,
      });
      this.close();
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
        });
      }
    );
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }
}
