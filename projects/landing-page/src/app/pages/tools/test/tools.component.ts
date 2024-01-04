import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private requestId: number;
  private particles: any[] = [];
  private max_particles = 500;
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

    this.populate(this.max_particles, 'smallOnes');
    this.populate(this.max_particles, 'Rods');
    this.populate(this.max_particles, 'Sphearical');
    this.draw();
  }

  private populate(num: number, particleType: string = 'smallOnes') {
    for (let i = 0; i < num; i++) {
        let particle;
  
        switch (particleType) {
          case 'smallOnes':
            particle = new smallOnes(this.ctx);
            break;
          case 'Rods':
            particle = new Rods(this.canvas);
            break;
          case 'Sphearical':
            particle = new SpiralParticle(this.canvas);
            break;
          default:
            particle = new smallOnes(this.ctx); // Default to FishLarva
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
}

class smallOnes {
  private progress = 0;
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private radius: number;
  private color: string;
  private variantx1: number;
  private variantx2: number;
  private varianty1: number;
  private varianty2: number;

  constructor(private canvas: CanvasRenderingContext2D) {
    const random = Math.random();
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.radius = random * 1.3;
    this.color = "#f89a34";
    this.variantx1 = Math.random() * 1000;
    this.variantx2 = Math.random() * 1000;
    this.varianty1 = Math.random() * 1000;
    this.varianty2 = Math.random() * 1000;
  }

  private render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    this.x += Math.cos(this.progress / this.variantx1) * Math.sin(this.progress / this.variantx2) / 2;
    this.y += Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2) / 2;

    if (this.x < 0 || this.x > this.w - this.radius || this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

class Rods {
  private ctx: CanvasRenderingContext2D;
  private progress: number;
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private rotation: number;
  private radius: number;
  private color: string;
  private variantx1: number;
  private variantx2: number;
  private varianty1: number;
  private varianty2: number;

  constructor(private canvas: HTMLCanvasElement) {
    const random = Math.random();
    this.progress = 0;
    this.ctx = canvas.getContext('2d');
    // Set position
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    // Get viewport size
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.rotation = (random * 180) * Math.PI / 180;
    // Dimension
    this.radius = 12 + Math.random() * 6;
    // Color
    this.color = "#35d838";
    // Setting
    this.variantx1 = Math.random() * 100;
    this.variantx2 = Math.random() * 100;
    this.varianty1 = Math.random() * 100;
    this.varianty2 = Math.random() * 100;
  }

  createOval(x: number, y: number, w: number, h: number) {
    const kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

    this.ctx.save();

    this.ctx.translate(this.w / 2, this.h / 2);

    // Rotate 1 degree
    this.ctx.rotate(this.rotation);

    // Move registration point back to the top left corner of the canvas
    this.ctx.translate(-this.w / 2, -this.h / 2);

    this.ctx.beginPath();
    this.ctx.moveTo(x, ym);
    this.ctx.quadraticCurveTo(x, y, xm, y);
    this.ctx.quadraticCurveTo(xe, y, xe, ym);
    this.ctx.quadraticCurveTo(xe, ye, xm, ye);
    this.ctx.quadraticCurveTo(x, ye, x, ym);

    this.ctx.strokeStyle = '#35d838';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  render() {
    // Create inside parts
    this.createOval(this.x, this.y, 12, 4);
  }

  move() {
    this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2)) / 4;
    this.y += (Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2)) / 4;

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }

    if (this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }
    this.render();
    this.progress++;
    return true;
  }
}

class Sphearical {
  private progress = 0;
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private radius: number;
  private color: string;
  private variantx1: number;
  private variantx2: number;
  private varianty1: number;
  private varianty2: number;

  constructor(private canvas: CanvasRenderingContext2D) {
    const random = Math.random();
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.radius = random * 8; 
    this.color = "#800080"
    this.variantx1 = Math.random() * 1000;
    this.variantx2 = Math.random() * 1000;
    this.varianty1 = Math.random() * 1000;
    this.varianty2 = Math.random() * 1000;
  }

  private render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.strokeStyle = this.color; // Purple color for the stroke
    this.canvas.lineWidth = 2; // Adjust the line width as needed
    this.canvas.stroke();
    this.canvas.closePath();
  }

  move() {
    this.x += Math.cos(this.progress / this.variantx1) * Math.sin(this.progress / this.variantx2) / 2;
    this.y += Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2) / 2;

    if (this.x < 0 || this.x > this.w - this.radius || this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}
class SpiralParticle {
  private progress = 0;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private radius: number;
  private rotation: number;
  private color: string;
  private variantx1: number;
  private variantx2: number;
  private varianty1: number;
  private varianty2: number;

  constructor(private canvas: HTMLCanvasElement) {
    const random = Math.random();
    this.ctx = canvas.getContext('2d');
    // Set position
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    // Get viewport size
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.rotation = (random * 180) * Math.PI / 180;
    // Dimension
    this.w = 2 + Math.random() * 2;
    this.h = 4 + Math.random() * 4;
    // Color
    this.color = "#3498db";
    // Setting
    this.variantx1 = Math.random() * 100;
    this.variantx2 = Math.random() * 100;
    this.varianty1 = Math.random() * 100;
    this.varianty2 = Math.random() * 100;
  }

  createLOval(x: number, y: number, width: number, height: number, radius: number) {
    const r = x + width;
    const b = y + height;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = "purple";
    this.ctx.lineWidth = 2;

    // L-shape path
    this.ctx.moveTo(x, y + height);
    this.ctx.arcTo(x, y, r, y, radius);
    this.ctx.arcTo(r, y, r, b, radius);
    this.ctx.arcTo(r, b, x, b, radius);

    this.ctx.fill();
    this.ctx.stroke();
  }

  render() {
    // Create L-shaped ovals
    this.createLOval(this.x, this.y, this.w, this.h, 3);
  }

  move() {
    this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2)) / 4;
    this.y += (Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2)) / 4;

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }

    if (this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }
    this.render();
    this.progress++;
    return true;
  }
}
