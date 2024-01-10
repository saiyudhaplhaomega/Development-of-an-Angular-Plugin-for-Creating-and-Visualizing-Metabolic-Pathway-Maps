export class SmallParticle {
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