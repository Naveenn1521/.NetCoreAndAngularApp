import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver ';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/MemberListComponent';

export const appRoutes: Routes = [
    { path: '', component : HomeComponent },
    { path: 'members', component : MemberListComponent, canActivate: [AuthGuard],
        resolve: {users: MemberListResolver} },
    { path: 'members/:id', component : MemberDetailComponent, canActivate: [AuthGuard],
        resolve: {user: MemberDetailResolver} },
    {path: 'member/edit', component: MemberEditComponent, canActivate: [AuthGuard],
        resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
    { path: 'messages', component : MessagesComponent, canActivate: [AuthGuard] },
    { path: 'lists', component : ListsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo : '', pathMatch: 'full' }
];
