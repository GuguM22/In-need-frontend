import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminPanelComponent } from "../admin-panel/admin-panel.component";

@Component({
  selector: 'app-admin-dash',
  imports: [CommonModule, AdminPanelComponent],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  isSidebarContentOpen = false;

  ngOnInit() {
    // Listen for changes in the URL or DOM to detect when sidebar content is open
    this.detectSidebarContent();
    
    // Set up a periodic check for sidebar content
    setInterval(() => {
      this.detectSidebarContent();
    }, 500);
  }

  private detectSidebarContent() {
    // Check if the current URL indicates sidebar content is open
    const currentUrl = window.location.href;
    const hasSidebarContent = currentUrl.includes('/admin') && 
                             (currentUrl.includes('pending') || 
                              currentUrl.includes('approved') || 
                              currentUrl.includes('rejected') ||
                              currentUrl.includes('queue') ||
                              currentUrl.includes('applications'));
    
    // Also check for DOM elements that indicate sidebar content is open
    const sidebarContentElements = document.querySelectorAll('[class*="sidebar-content"], [class*="tab-content"], .overlay, .modal');
    const hasVisibleSidebarContent = sidebarContentElements.length > 0;
    
    this.isSidebarContentOpen = hasSidebarContent || hasVisibleSidebarContent;
  }

  closeSidebarContent() {
    // Navigate back to dashboard
    window.history.pushState({}, '', '/admin');
    this.isSidebarContentOpen = false;
  }
}


