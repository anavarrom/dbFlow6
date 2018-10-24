import { RouterModule, Routes } from '@angular/router';

// Project Componentes
import { MainComponent                      } from './main/main.component';
// import { SearchComponent                    } from './search/search.component';
// import { CollectionMessagesComponent        } from './messages/collection-messages/collection-messages.component';
import { CollectionNotificationsComponent   } from './notifications/collection-notifications/collection-notifications.component';
// import { CollectionAppointmentsComponent    } from './appointments/collection-appointments/collection-appointments.component';
// import { NotificationDetailComponent        } from './notifications/notification-detail/notification-detail.component';

export const SECURE_ROUTES: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    // { path: 'messages', component: CollectionMessagesComponent },
    { path: 'notifications', component: CollectionNotificationsComponent },
    // { path: 'appointments', component: CollectionAppointmentsComponent },
    // { path: 'search', component: SearchComponent },
    // { path: 'search/:searchText', component: SearchComponent },
    // { path: 'search/:searchText/:searchType', component: SearchComponent },
];
