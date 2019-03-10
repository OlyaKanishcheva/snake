class Food {
  constructor({ x, y, color = '#5590a2', ctx }) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.draw(ctx);
  };

  draw(ctx) {
    const { color, x, y } = this;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, Food.RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  destroy(ctx) {
    const { x, y } = this;
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.arc(x, y, Food.RADIUS, 0, 2 * Math.PI)
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

};

Food.RADIUS = 6;

export default Food;