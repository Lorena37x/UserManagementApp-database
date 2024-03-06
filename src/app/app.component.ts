import { Component, OnInit} from '@angular/core';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserManagementApp';
}