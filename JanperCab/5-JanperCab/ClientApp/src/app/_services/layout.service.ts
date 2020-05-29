import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private loadingPanel: Element;
  private loadingTextElement: Element;

  constructor() {
    this.initialLoadingPanel();
  }

  private initialLoadingPanel = () => {
    this.loadingPanel = document.createElement('div');
    const panel = document.createElement('div');
    this.loadingTextElement = document.createElement('div');
    const loadingIcon = document.createElement('i');

    this.loadingPanel.className = 'loading-panel';
    panel.className = 'loading-panel__panel';
    this.loadingTextElement.className = 'loading-panel__text';
    loadingIcon.className = 'fa fa-spinner fa-spin loading-panel__icon';

    this.loadingPanel.appendChild(panel);
    panel.appendChild(this.loadingTextElement);
    panel.appendChild(loadingIcon);
  };

  showLoadingPanel = (text: string = null) => {
    if (document.body.contains(this.loadingPanel)) {
      return;
    }

    this.loadingTextElement.innerHTML = text || 'Loading...';
    document.body.appendChild(this.loadingPanel);
  };

  closeLoadingPanel = () => {
    document.body.removeChild(this.loadingPanel);
  };

  toggleLeftNav = (force: boolean = null) => {
    const leftNav = document.getElementsByClassName('primary-left-nav')[0];

    if (!leftNav) {
      return;
    }

    if (force == null) {
      leftNav.classList.toggle('close');
    } else {
      leftNav.classList.toggle('close', force);
    }
  };
}
