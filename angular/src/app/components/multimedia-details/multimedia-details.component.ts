import { ClipsService } from 'src/app/services/clips/clips.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-multimedia-details',
  templateUrl: './multimedia-details.component.html',
  styleUrls: ['./multimedia-details.component.css']
})
export class MultimediaDetailsComponent implements OnInit, OnChanges {
  @Input() multimedia;

  @Input() authenticated;

  @Output() private closeModal = new EventEmitter<boolean>();

  constructor(
    private clipsService: ClipsService,
    private authenticationService: AuthenticationService
  ) {}

  public clip = {
    name: '',
    initialSec: 0,
    finalSec: 0
  };

  public selectedClip = null;

  public clipLoadingForm = false;

  public clipFormErrorMessage = '';

  public clipFormError = false;

  public duration = 0;

  public loadedMetadata = false;

  public success = '#28a745';

  public clipSubmitSuccess = false;

  public clips = null;

  public startTime = 0;
  public endTime = Number.MAX_VALUE;

  private clipsOptions = [];

  public urlToPlay = '';

  private originalUrl = '';

  public loadingClips = true;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.multimedia.currentValue) {
      this.originalUrl = changes.multimedia.currentValue.url;
      this.urlToPlay = this.originalUrl;
      this.loadClips();
    }
  }

  loadClips() {
    console.log(this.multimedia);
    this.clipsService
      .getClips(this.multimedia)
      .then((data: any) => {
        console.log(data);

        this.clipsOptions = data;
        this.clipsOptions.sort(this.compare);
        this.clips = this.clipsOptions;
        this.loadingClips = false;
      })
      .catch(err => {
        this.clips = [];
        this.loadingClips = false;
        alert(err);
      });
  }

  compare(a, b) {
    if (a.fields.name < b.fields.name) {
      return 1;
    }
    if (a.fields.name > b.fields.name) {
      return -1;
    }
    return 0;
  }

  setDuration(media) {
    this.duration = Math.floor(media.duration);
    this.clip.finalSec = this.duration;
    this.loadedMetadata = true;
    this.clips = this.clipsOptions;
  }

  onSubmit() {
    this.clipFormErrorMessage = '';
    this.clipFormError = false;
    this.clipSubmitSuccess = false;
    this.clipLoadingForm = true;
    const username = this.authenticationService.isAuthenticated();
    this.clipsService
      .addClips(
        this.clip.name,
        this.clip.initialSec,
        this.clip.finalSec,
        username,
        this.multimedia.id,
        this.duration
      )
      .then(data => {
        this.clip.name = '';
        this.clip.initialSec = 0;
        this.clip.finalSec = this.duration;
        this.clipSubmitSuccess = true;
        this.clipLoadingForm = false;
        this.loadClips();
      })
      .catch(err => {
        this.clipFormErrorMessage = 'Error creando el clip';
        this.clipFormError = true;
        this.clipLoadingForm = false;
      });
  }

  removeClip() {
    if (this.selectedClip) {
      this.selectedClip = null;
    }
  }

  playClip(clip) {
    console.log(clip);
    this.selectedClip = clip;
    this.urlToPlay =
      this.originalUrl +
      '#t=' +
      clip.fields.initialSec +
      ',' +
      clip.fields.finalSec;
    document.getElementById('mediaBody').scrollIntoView();
  }

  close() {
    if (this.multimedia.type.typeId === 'Video') {
      const video = document.getElementById('mediaPlayer') as HTMLVideoElement;
      video.pause();
    } else if (this.multimedia.type.typeId === 'Audio') {
      const audio: HTMLMediaElement = document.getElementById(
        'mediaPlayer'
      ) as HTMLAudioElement;
      audio.pause();
    }

    this.clipSubmitSuccess = false;
    this.clipLoadingForm = false;
    this.clipFormError = false;
    this.clipFormErrorMessage = '';
    this.clipLoadingForm = false;
    this.selectedClip = false;
    this.closeModal.emit(true);
  }
}
