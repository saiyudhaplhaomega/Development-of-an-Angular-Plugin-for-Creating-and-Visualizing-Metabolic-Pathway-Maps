export class LongParticles {
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
      this.radius = 15 + Math.random() * 6;
      // Color
      this.color = "red";
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
  
      this.ctx.strokeStyle = 'blue';
      this.ctx.fillStyle = 'rgba(0, 0, 255, 0.01)';
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();
    }
  
    render() {
      // Create inside parts
      this.createOval(this.x, this.y, this.radius, 2.5);
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