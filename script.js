class AnnoyingButton {
  constructor() {
    this.clickCount = 0;
    this.isShaking = false;
    this.isHiding = false;
    this.showMeltdown = false;
    this.isDead = false;
    
    this.buttonMessages = [
      "Click me! 😊",
      "Ouch! 😮",
      "Seriously? Again? 😤",
      "Bro, stop! 😠",
      "This is getting annoying... 😑",
      "I'm starting to move now! 🏃‍♂️",
      "Can't catch me! 😂",
      "Please have mercy! 😭",
      "I'M MOVING FASTER NOW! 🏃‍♂️💨",
      "NOOOOOO! STOP! 😱",
      "I'M HAVING A BREAKDOWN! 🤯",
      "I QUIT! 💀"
    ];
    
    this.floatingEmojis = ['😭', '😱', '💔', '🆘', '😵'];
    
    this.initializeElements();
    this.bindEvents();
  }
  
  initializeElements() {
    this.button = document.getElementById('annoyingButton');
    this.counter = document.getElementById('clickCounter');
    this.mainContainer = document.getElementById('mainContainer');
    this.meltdownScreen = document.getElementById('meltdownScreen');
    this.deathScreen = document.getElementById('deathScreen');
    this.resetButton = document.getElementById('resetButton');
    this.floatingEmojisContainer = document.getElementById('floatingEmojis');
  }
  
  bindEvents() {
    this.button.addEventListener('click', () => this.handleButtonClick());
    this.resetButton.addEventListener('click', () => this.resetButton());
  }
  
  getRandomPosition() {
    const container = this.mainContainer.getBoundingClientRect();
    const buttonWidth = 200;
    const buttonHeight = 60;
    
    const maxX = Math.max(container.width - buttonWidth, 100);
    const maxY = Math.max(container.height - buttonHeight, 100);
    
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    };
  }
  
  handleButtonClick() {
    this.clickCount++;
    this.updateCounter();
    this.updateButtonText();
    this.addShakeEffect();
    this.handleMovement();
    this.addFloatingEmojis();
    this.checkForMeltdown();
  }
  
  updateCounter() {
    this.counter.textContent = `Clicks: ${this.clickCount} 🎯`;
  }
  
  updateButtonText() {
    if (this.clickCount < this.buttonMessages.length) {
      this.button.textContent = this.buttonMessages[this.clickCount];
    }
  }
  
  addShakeEffect() {
    this.button.classList.add('shaking');
    setTimeout(() => {
      this.button.classList.remove('shaking');
    }, 500);
  }
  
  handleMovement() {
    // Start moving after 5 clicks
    if (this.clickCount >= 5 && this.clickCount < 11) {
      setTimeout(() => {
        this.moveButton();
      }, 200);
      
      // Add fast moving class for quicker transitions
      if (this.clickCount >= 8) {
        this.button.classList.add('fast-moving');
        this.button.classList.add('pulsing');
        
        // Additional random movements
        setTimeout(() => this.moveButton(), 500);
        setTimeout(() => this.moveButton(), 1000);
      }
    }
  }
  
  moveButton() {
    const position = this.getRandomPosition();
    this.button.style.left = `${position.x}px`;
    this.button.style.top = `${position.y}px`;
    this.button.style.transform = 'none';
  }
  
  addFloatingEmojis() {
    if (this.clickCount > 0) {
      const numEmojis = Math.min(this.clickCount, 10);
      
      for (let i = 0; i < Math.min(numEmojis, 3); i++) {
        setTimeout(() => {
          this.createFloatingEmoji();
        }, i * 100);
      }
    }
  }
  
  createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = this.floatingEmojis[Math.floor(Math.random() * this.floatingEmojis.length)];
    
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${Math.random() * 100}%`;
    emoji.style.animationDelay = `${Math.random() * 2}s`;
    
    this.floatingEmojisContainer.appendChild(emoji);
    
    // Remove emoji after animation
    setTimeout(() => {
      if (emoji.parentNode) {
        emoji.parentNode.removeChild(emoji);
      }
    }, 4000);
  }
  
  checkForMeltdown() {
    if (this.clickCount >= 11) {
      this.triggerMeltdown();
    }
  }
  
  triggerMeltdown() {
    this.showMeltdown = true;
    this.meltdownScreen.classList.remove('hidden');
    
    setTimeout(() => {
      this.isHiding = true;
      this.button.classList.add('hiding');
    }, 2000);
    
    setTimeout(() => {
      this.triggerDeath();
    }, 3000);
  }
  
  triggerDeath() {
    this.isDead = true;
    this.meltdownScreen.classList.add('hidden');
    this.button.style.display = 'none';
    this.deathScreen.classList.remove('hidden');
  }
  
  resetButton() {
    // Reset all states
    this.clickCount = 0;
    this.isShaking = false;
    this.isHiding = false;
    this.showMeltdown = false;
    this.isDead = false;
    
    // Reset UI elements
    this.updateCounter();
    this.button.textContent = this.buttonMessages[0];
    this.button.style.left = '50%';
    this.button.style.top = '50%';
    this.button.style.transform = 'translate(-50%, -50%)';
    this.button.style.display = 'block';
    
    // Reset classes
    this.button.classList.remove('shaking', 'hiding', 'fast-moving', 'pulsing');
    
    // Hide screens
    this.meltdownScreen.classList.add('hidden');
    this.deathScreen.classList.add('hidden');
    
    // Clear floating emojis
    this.floatingEmojisContainer.innerHTML = '';
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AnnoyingButton();
});