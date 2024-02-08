import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mdoa-team-page',
  templateUrl: './mdoa-team.component.html',
  styleUrls: ['./mdoa-team.component.scss'],
})
export class MdoaTeamComponent {
  private isScrolling: boolean = false;

  members = [
    {
      name: 'Prof. Dr.-Ing. Robert Heyer',
      role: 'Group Leader',
      email: 'robert.heyer@uni-​bielefeld.de',
      email2: 'robert.heyer@isas.de',
      picture: './assets/img/member-images/robert_h.jpeg',
    },
    {
      name: 'Kay',
      role: 'Developer',
      email: 'john@example.com',
      projects: 'Project A, Project B',
      picture: 'john.jpg',
    },
    {
      name: 'Manny',
      role: 'Developer',
      email: 'john@example.com',
      projects: 'Project A, Project B',
      picture: 'john.jpg',
    },
    {
      name: 'Daniel W',
      role: 'Designer',
      email: 'jane@example.com',
      projects: 'Project C, Project D',
      picture: 'jane.jpg',
    },
    {
      name: 'Max',
      role: 'Developer',
      email: 'john@example.com',
      projects: 'Project A, Project B',
      picture: 'john.jpg',
    },
    {
      name: 'Daniel K',
      role: 'PhD',
      email: 'jane@example.com',
      projects: 'Project C, Project D',
      picture: 'jane.jpg',
    },
    {
      name: 'John Doe',
      role: 'Developer',
      email: 'john@example.com',
      projects: 'Project A, Project B',
      picture: 'john.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Designer',
      email: 'jane@example.com',
      projects: 'Project C, Project D',
      picture: 'jane.jpg',
    },
    {
      name: 'John Doe',
      role: 'Developer',
      email: 'john@example.com',
      projects: 'Project A, Project B',
      picture: 'john.jpg',
    },
  ];

  scrollPosition: number = 0;
  cardWidth: number = 660; // Adjust this based on your card width
  scrollPercentage: number = 0;

  ngOnInit() {
    // Initialize members array with your data
    // e.g., this.members = yourMemberData;
  }

  leftScrollCounter = 0;
  rightScrollCounter = 0;

  scrollLeft() {
    this.isScrolling = true;
    const container = document.getElementById('member-container');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      this.scrollPosition -= this.cardWidth;

      if (this.leftScrollCounter === 1) {
        this.scrollPosition =
          this.scrollPosition < 0 ? maxScroll : this.scrollPosition;
        this.leftScrollCounter = 0;
        container.scrollTo({ left: this.scrollPosition, behavior: 'smooth' });
        this.uploadScrollProgress(); // Call the new function
        this.checkScrollBounds();
      } else if (this.scrollPosition < 0) {
        this.scrollPosition = 0;
        this.leftScrollCounter = 1;
      }
      this.rightScrollCounter = 0;
      container.scrollTo({ left: this.scrollPosition, behavior: 'smooth' });
      this.uploadScrollProgress(); // Call the new function
      this.checkScrollBounds();
    }
  }

  scrollRight(): void {
    this.isScrolling = true;
    const container = document.getElementById('member-container');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      this.scrollPosition += this.cardWidth;

      if (this.rightScrollCounter === 1) {
        this.scrollPosition =
          this.scrollPosition >= maxScroll ? 0 : this.scrollPosition;
        this.rightScrollCounter = 0;
        container.scrollTo({ left: this.scrollPosition, behavior: 'smooth' });
        this.uploadScrollProgress();
        this.checkScrollBounds();
      } else if (this.scrollPosition >= maxScroll) {
        this.scrollPosition = maxScroll;
        this.rightScrollCounter = 1;
      }
      this.leftScrollCounter = 0;
      container.scrollTo({ left: this.scrollPosition, behavior: 'smooth' });
      this.uploadScrollProgress(); // Call the new function
      this.checkScrollBounds();
    }
  }

  uploadScrollProgress() {
    const container = document.getElementById('member-container');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      this.scrollPercentage = (this.scrollPosition / maxScroll) * 100;
      const progressWidth = `${this.scrollPercentage}%`;
      document.documentElement.style.setProperty(
        '--scroll-progress-width',
        progressWidth
      );
    }
  }

  private checkScrollBounds() {
    const container = document.getElementById('member-container');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (this.scrollPosition < 0) {
        this.scrollPosition = maxScroll; // Reset to the end when scrolling left from the start
      } else if (this.scrollPosition > maxScroll) {
        this.scrollPosition = 0; // Reset to start when reaching the end
        this.scrollPercentage = 0;
      }

      container.scrollTo({ left: this.scrollPosition, behavior: 'smooth' });
      document.documentElement.style.setProperty(
        '--scroll-progress-width',
        this.scrollPercentage + '%'
      );
    }
  }
}
