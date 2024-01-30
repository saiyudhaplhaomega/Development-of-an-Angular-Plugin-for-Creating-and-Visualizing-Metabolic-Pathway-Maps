import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SmallParticle } from './models/SmallParticle';
import { RodsParticle } from './models/RodesParticle';
import { SphearicalParticle } from './models/SphearicalParticle';
import { RandomParticle } from './models/RandomParticle';
import { LongParticles } from './models/LongParticles';
@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private requestId: number;
  private particles: any[] = [];
  private max_particles = 400;
  private frequency = 20;
  private init_num = this.max_particles;
  private max_time = this.frequency * this.max_particles;
  private time_to_recreate = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.initCanvas();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
  }

  private initCanvas() {
    this.canvas = this.el.nativeElement.querySelector('#particlesCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    setTimeout(() => {
      this.time_to_recreate = true;
    }, this.max_time);

    this.populate(this.max_particles, 'SmallParticle');
    this.populate(this.max_particles, 'RodsParticle');
    this.populate(this.max_particles, 'RandomParticle');
    this.populate(this.max_particles, 'LongParticles');
    this.draw();
  }

  private populate(num: number, particleType: string = 'SmallParticle') {
    for (let i = 0; i < num; i++) {
        let particle;
  
        switch (particleType) {
          case 'SmallParticle':
            particle = new SmallParticle(this.ctx);
            break;
          case 'RodsParticle':
            particle = new RodsParticle(this.canvas);
            break;
          case 'RandomParticle':
            particle = new RandomParticle(this.canvas);
            break;
 case 'LongParticles':
        particle = new LongParticles(this.canvas);
        break;
          default:
            particle = new SmallParticle(this.ctx);
            break;
        }
  
        this.particles.push(particle);
      }
  }

  private clear() {
    const grd = this.ctx.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, 0, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width);
    grd.addColorStop(0, 'rgba(25,25,54,0.12)');
    grd.addColorStop(1, 'rgba(0,0,20,0.01)');
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private draw() {
    this.clear();
    this.particles = this.particles.filter(p => p.move());
    if (this.time_to_recreate && this.particles.length < this.init_num) {
      this.populate(1);
    }
    this.requestId = requestAnimationFrame(() => this.draw());
  }

  // !!! ONLY IF WE WANT IT RESIZEABLE !!!
  // ngOnInit() {
  //   this.initCanvas();
  //   window.addEventListener('resize', () => this.handleResize());
  // }
  
  // ngOnDestroy() {
  //   window.removeEventListener('resize', () => this.handleResize());
  //   cancelAnimationFrame(this.requestId);
  // }
  
  // private handleResize() {
  //   this.canvas.width = window.innerWidth;
  //   this.canvas.height = window.innerHeight;
  // }
}