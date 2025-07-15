import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrizeService } from '../../../services/prize-service/prize.service';
import { HeaderSidebarComponent } from '../../layout-pages/header-sidebar/header-sidebar.component';


@Component({
  selector: 'app-prize-management',
  standalone: true,
  imports: [CommonModule, FormsModule ,HeaderSidebarComponent],
  templateUrl: './prize-management.component.html',
  styleUrl: './prize-management.component.scss'
})
export class PrizeManagementComponent implements OnInit {
  prizes: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  form: any = {
    name: '',
    cardClass: '',
    brand: '',
    value: '',
    codePrefix: ''
  };
  selectedPrizeId: string | null = null;
  isSidebarCollapsed = false;
  constructor(private prizeService: PrizeService) {}

  ngOnInit(): void {
    this.loadPrizes();
  }
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  loadPrizes() {
    this.prizeService.getAllPrizes().subscribe({
      next: res => {
        this.prizes = res.data || [];
      },
      error: err => console.error('Error loading prizes:', err)
    });
  }

  savePrize() {
    const action = this.selectedPrizeId
      ? this.prizeService.updatePrize(this.selectedPrizeId, this.form)
      : this.prizeService.createPrize(this.form);

    action.subscribe({
      next: res => {
        alert(res.message);
        this.resetForm();
        this.loadPrizes();
      },
      error: err => console.error('Error saving prize:', err)
    });
  }

  editPrize(prize: any) {
    this.selectedPrizeId = prize._id;
    this.form = { ...prize };
  }

  deletePrize(id: string) {
    if (confirm('Are you sure you want to delete this prize?')) {
      this.prizeService.deletePrize(id).subscribe({
        next: res => {
          alert(res.message);
          this.loadPrizes();
        },
        error: err => console.error('Error deleting prize:', err)
      });
    }
  }

  resetForm() {
    this.selectedPrizeId = null;
    this.form = {
      name: '',
      cardClass: '',
      brand: '',
      value: '',
      codePrefix: ''
    };
  }
}
