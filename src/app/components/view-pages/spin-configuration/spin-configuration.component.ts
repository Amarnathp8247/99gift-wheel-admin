import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinService } from '../../../services/spin-service/spin.service';
import { HeaderSidebarComponent } from '../../layout-pages/header-sidebar/header-sidebar.component';

@Component({
  selector: 'app-spin-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderSidebarComponent],
  templateUrl: './spin-configuration.component.html',
  styleUrls: ['./spin-configuration.component.scss']
})
export class SpinConfigurationComponent {
  isSidebarCollapsed = false;

  // Form model
  configForm = {
    winProbability: 0.4,
    maxDailySpins: 200,
    maxDailyWinners: 50,
    selectedPrizes: [] as string[],
  };

  allPrizes: any[] = [];
  spinConfigs: any[] = [];
  successMessage = '';
  errorMessage = '';

  showModal = false;
  editingConfigId: string | null = null;

  constructor(private spinService: SpinService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.loadPrizes(token);
      this.loadConfigs(token);
    }
  }

  loadPrizes(token: string) {
    this.spinService.getPrizes(token).subscribe({
      next: (res: any) => {
        this.allPrizes = res.data || [];
      },
      error: () => {
        this.errorMessage = 'Failed to load prizes';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  get isEditing(): boolean {
    return !!this.editingConfigId;
  }

  loadConfigs(token: string) {
    this.spinService.getConfigs(token).subscribe({
      next: (res: any) => {
        this.spinConfigs = res.data || [];
      },
      error: () => {
        this.errorMessage = 'Failed to load configurations';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  openModal(config: any = null) {
    this.showModal = true;
    if (config) {
      this.editingConfigId = config._id;
      this.configForm = {
        winProbability: config.winProbability,
        maxDailySpins: config.maxDailySpins,
        maxDailyWinners: config.maxDailyWinners,
        selectedPrizes: config.prizes.map((p: any) => p._id),
      };
    } else {
      this.editingConfigId = null;
      this.configForm = {
        winProbability: 0.4,
        maxDailySpins: 200,
        maxDailyWinners: 50,
        selectedPrizes: [],
      };
    }
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.showModal = false;
    this.editingConfigId = null;
    document.body.classList.remove('modal-open');
  }

  submitConfig() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const payload = {
      winProbability: this.configForm.winProbability,
      maxDailySpins: this.configForm.maxDailySpins,
      maxDailyWinners: this.configForm.maxDailyWinners,
      prizes: this.configForm.selectedPrizes,
    };

    const request = this.editingConfigId
      ? this.spinService.updateConfig({ ...payload, id: this.editingConfigId }, token)
      : this.spinService.createConfig(payload, token);

    request.subscribe({
      next: () => {
        this.successMessage = 'Configuration saved successfully';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 3000);
        this.closeModal();
        this.loadConfigs(token);
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err?.error?.message || 'Failed to save config';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  editConfig(config: any) {
    this.openModal(config);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}