import { Component, OnInit } from '@angular/core';
import { MultimediasService } from 'src/app/services/multimedias/multimedias.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-multimedia-list',
  templateUrl: './multimedia-list.component.html',
  styleUrls: ['./multimedia-list.component.css']
})
export class MultimediaListComponent implements OnInit {
  private multimediaListOptions = [];

  private modal = null;

  public multimediaList = [];

  public loading = true;

  public mediaType = '';

  public category = '';

  public categories = [];

  public selectedMultimedia = null;

  public isAuthenticated = false;

  public username = '';

  public success = '#28a745';

  constructor(
    private authenticationService: AuthenticationService,
    private multimediasService: MultimediasService
  ) {}

  ngOnInit() {
    this.checkAuthentication();
    this.loadMultimedias();
  }

  checkAuthentication() {
    const authentication = this.authenticationService.isAuthenticated();
    if (authentication) {
      this.username = authentication;
      this.isAuthenticated = true;
    } else {
      this.username = '';
      this.isAuthenticated = false;
    }
  }

  logOut() {
    this.authenticationService.logOut();
  }

  loadMultimedias() {
    this.multimediasService
      .getMultimedias()
      .then((data: any) => {
        this.multimediaListOptions = data;
        this.multimediaListOptions.sort(this.compare);
        this.loadCategories();
        this.loading = false;
      })
      .catch(err => {
        alert(err);
      });
  }

  showFilter() {
    if (this.mediaType === '' && this.category === '') {
      this.multimediaList = this.multimediaListOptions;
    } else {
      this.multimediaList = this.multimediaListOptions.filter(multimedia => {
        const categoryBoolean =
          this.category === ''
            ? true
            : multimedia.category.name === this.category;

        const mediaBoolean =
          this.mediaType === ''
            ? true
            : multimedia.type.typeId === this.mediaType;

        return categoryBoolean && mediaBoolean;
      });
    }
  }

  loadCategories() {
    this.multimediaListOptions.map(multimedia => {
      const category = multimedia.category.name;
      if (this.categories.indexOf(category) === -1) {
        this.categories.push(category);
      }
    });
    this.multimediaList = this.multimediaListOptions;
  }

  selectMultimedia(multimedia, modal) {
    this.selectedMultimedia = multimedia;
    this.modal = modal;
    this.modal.show();
  }

  openLoginModal(modal) {
    this.modal = modal;
    this.modal.show();
  }

  openSignUpModal(modal) {
    this.modal = modal;
    this.modal.show();
  }

  closeModal(close) {
    this.modal.hide();
  }

  compare(a, b) {
    if (a.creationDate < b.creationDate) {
      return 1;
    }
    if (a.creationDate > b.creationDate) {
      return -1;
    }
    return 0;
  }
}
