import {
  Component,
  ComponentFactoryResolver,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { UserContactComponent } from './user-contact/user-contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'ContactApp';

  constructor(private _viewRef: ViewContainerRef) {}

  // addUserContact(): void {}

  // loadUserContactComponent(): void {
  //   this._viewRef.clear();
  //   this._viewRef.createComponent(UserContactComponent);
  // }
}
