export class SphearicalParticle {
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
    this.radius = 5 + Math.random() * 2;
    // Color
    this.color = "#35d838";
    // Setting
    this.variantx1 = Math.random() * 50;
    this.variantx2 = Math.random() * 80;
    this.varianty1 = Math.random() * 70;
    this.varianty2 = Math.random() * 100;
  }

  render() {
    this.ctx.save();

    // Move the registration point to the center of the particle
    this.ctx.translate(this.x, this.y);

    // Rotate based on the progress
    const rotationAngle = (this.progress % 360) * Math.PI / 180;
    this.ctx.rotate(rotationAngle);

    // Random variations for control points
    const controlPointX = this.radius * (0.5 + Math.random() * 0.5);
    const controlPointY = this.radius * (0.2 + Math.random() * 0.6);

    // Create tilde (~) with variations
    this.ctx.beginPath();
    this.ctx.moveTo(-this.radius, -this.radius / 2);
    this.ctx.quadraticCurveTo(-controlPointX, -controlPointY, 0, -this.radius / 2);
    this.ctx.quadraticCurveTo(controlPointX, controlPointY, this.radius, -this.radius / 2);

    this.ctx.strokeStyle = '#35d838';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  move() {
    this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2)) / 4;
    this.y += (Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2)) / 4;

    if (this.x < 0 || this.x > this.w - this.radius || this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}
