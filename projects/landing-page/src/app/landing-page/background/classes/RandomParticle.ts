export class RandomParticle {
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
  