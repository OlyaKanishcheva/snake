import { degToRad } from './helper';

class Snake {
  constructor({ x, y, angle, length, game, mode }) {
    this.color = '#000';
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.mode = mode;
    this.game = game;
    this.ctx = game.ctx;
    this.coordinates = [];
  };

  draw() {
    const { ctx, color, x, y } = this;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, Snake.HEAD_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  running(canvasSize, that) {
    const radian = degToRad(that.angle);
    that.x += Snake.SPEED * Math.cos(radian);
    that.y += Snake.SPEED * Math.sin(radian);
    that.validationCoordinates(canvasSize);
    that.pushCoordinates();
    that.draw();
    that.findSnakeCollision();
  };

  validationCoordinates({ mapW, mapH }) {
    const { x, y } = this;
    if (
      (x < 0) || (x > mapW) ||
      (y < 0) || (y > mapH)
    ) {
      this.finishGame()
    };
  };

  pushCoordinates() {
    const { coordinates, x, y } = this;
    coordinates.push({ x, y });
    this.lengthControl();
  };

  lengthControl() {
    const { coordinates, length, ctx } = this;
    if (coordinates.length > length) {
      const {x, y} = coordinates[0];
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(x, y, Snake.HEAD_RADIUS + 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      this.coordinates.shift();
    };
  };

  findSnakeCollision() {
    this.coordinates.slice(0, -Snake.HEAD_RADIUS).forEach(({ x, y }) => {
      const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
      let condition = this.mode === 'flex' ? distance < Snake.HEAD_RADIUS + 2 : distance < 2;
      if (condition) {
        this.finishGame()
      };
    });
  };

  directionControl(e) {
    const { game, mode } = this;
    if (game.finished) return;
    if (mode === 'flex') {
      switch(e.keyCode) {
        case 37:
          this.turnLeftFlex();
          break;
        case 39:
          this.turnRightFlex();
          break;
        default:
      };
    } else if (mode === 'classic') {
      switch(e.keyCode) {
        case 37:
          this.turnLeftClassic();
          break;
        case 38:
          this.turnTop();
          break;
        case 39:
          this.turnRightClassic();
          break;
        case 40:
          this.turnDown();
          break;
        default:
      };
    };
  };

  turnLeftFlex() {
    this.angle -= Snake.ROTATION_SPEED;
    this.move(true);
  };

  turnLeftClassic() {
    if (this.angle !== 0) this.angle = 180;
    this.move(true);
  };

  turnRightFlex() {
    this.angle += Snake.ROTATION_SPEED;
    this.move(true);
  };

  turnRightClassic() {
    if (this.angle !== 180) this.angle = 0;
    this.move(true);
  };

  turnDown() {
    if (this.angle !== 270) this.angle = 90;
    this.move(true);
  };

  turnTop() {
    if (this.angle !== 90) this.angle = 270;
    this.move(true);
  };

  move(rotate = false) {
    const koef = rotate ? 0.8 : 1;
    const radian = degToRad(this.angle);
    this.x += koef * Snake.SPEED * Math.cos(radian);
    this.y += koef * Snake.SPEED * Math.sin(radian);
    this.pushCoordinates();
    this.draw();
  };

  finishGame() {
    const { game, ctx } = this;

    if (game.finished) return;
    game.finished = true;

    clearInterval(game.snakeInterval);
    clearInterval(game.foodInterval);

    alert('You lose 🙃');

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

};

Snake.HEAD_RADIUS = 5;
Snake.SPEED = 2;
Snake.INITIAL_LENGTH = 10;
Snake.ROTATION_SPEED = 10;

export default Snake;