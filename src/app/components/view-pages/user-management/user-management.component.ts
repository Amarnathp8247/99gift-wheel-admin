import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';
import { HeaderSidebarComponent } from '../../layout-pages/header-sidebar/header-sidebar.component';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, HeaderSidebarComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isSidebarCollapsed = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.userService.getUsers(token).subscribe({
        next: (res: any) => {
          this.users = res.data;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  exportToExcel(): void {
    const exportData = this.users.map(user => ({
      Name: user.name,
      Email: user.email,
      Mobile: user.mobile,
      Gender: user.gender,
      City: user.city,
      Total_Wins: user.totalWins,
      Total_Losses: user.totalLoses,
      Wallet_Amount: user.walletAmount,
      Joined_Date: new Date(user.createdAt).toLocaleDateString()
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { Users: worksheet }, SheetNames: ['Users'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const fileName = `99Gift_Users_${new Date().toISOString().split('T')[0]}.xlsx`;
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, fileName);
  }
}

 
