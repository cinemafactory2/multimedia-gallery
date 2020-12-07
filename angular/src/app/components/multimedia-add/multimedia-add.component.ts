import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MultimediasService } from 'src/app/services/multimedias/multimedias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multimedia-add',
  templateUrl: './multimedia-add.component.html',
  styleUrls: ['./multimedia-add.component.css']
})
export class MultimediaAddComponent implements OnInit {
  public multimedia = {
    title: '',
    author: '',
    city: '',
    country: '',
    url: '',
    category_id: -1,
    type_id: -1,
    username: '',
    creationDate: ''
  };

  public typesOption = [
    {
      name: 'Audio',
      id: 3
    },
    {
      name: 'Image',
      id: 1
    },
    {
      name: 'Video',
      id: 4
    }
  ];

  private username;

  public success = '#28a745';

  public multimediaSubmit = false;

  public categories;

  constructor(
    private authenticationService: AuthenticationService,
    private categoriesService: CategoriesService,
    private multimediasService: MultimediasService,
    private router: Router
  ) {
    this.username = this.authenticationService.isAuthenticated();
  }

  ngOnInit() {
    this.loadCategories();
  }

  onAddMultimediaSubmit() {
    this.multimediaSubmit = true;
    this.multimedia.username = this.username;
    const date = new Date();
    this.multimedia.creationDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.multimedia.category_id = Number(this.multimedia.category_id);
    this.multimedia.type_id = Number(this.multimedia.type_id);

    this.multimediasService
      .createMultimedia(this.multimedia)
      .then(data => {
        alert(data);
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert(err);
        this.multimediaSubmit = false;
      });
  }

  loadCategories() {
    this.categoriesService
      .getCategories()
      .then((data: any) => {
        this.categories = data.sort(this.compare);

        console.log(this.categories);
      })
      .catch(err => {
        alert(err);
      });
  }

  compare(a, b) {
    if (a.fields.name > b.fields.name) {
      return 1;
    }
    if (a.fields.name < b.fields.name) {
      return -1;
    }
    return 0;
  }
}
