import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './../../service/loader.service';
import { LoaderState } from '../loader/loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit {

  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        /* setTimeout(() => {
          this.show = state.show;
        }, 5000); */
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
