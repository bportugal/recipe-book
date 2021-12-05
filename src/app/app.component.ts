import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataStorageService} from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isSavingSpinner = false;
  createSub = new Subscription();

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.createSub = this.dataStorageService.storeSubject.subscribe(value => {
      this.isSavingSpinner = value;
    });

    this.dataStorageService.fetchRecipes().subscribe();

  }

  ngOnDestroy(): void {
    this.createSub.unsubscribe();
  }



}
