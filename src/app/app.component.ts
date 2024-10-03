import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoaderComponent } from 'src/app/features/global-loader/global-loader.component';
import { UsersService } from 'src/app/features/users/services/users.service';
import { UsersApiService } from 'src/app/features/users/services/users.api.service';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly loaderService = inject(GlobalLoaderService);

  ngOnInit() {
    const stream$ = this.usersApiService.getUser$();

    this.loaderService
      .showUntilCompleted$(stream$)
      .pipe(finalize(() => this.usersService.initialize()))
      .subscribe({
        next: user => {
          this.usersService.setUser(user);
        },
        error: (error: HttpErrorResponse) => {
          this.usersService.setError(error.error.message);
        },
      });
  }
}
