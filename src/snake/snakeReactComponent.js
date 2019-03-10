import React, { Component } from 'react';
import Snake from './snake.js';
import './snake.css';
import { foodGenerator, findFoodCollisions } from './foods';

class SnakeReactComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score ? props.score : 0,
    };
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.onCollision = this.onCollision.bind(this);
  };

  componentDidMount() {
    this.game = null;
  };

  onCollision(score) {
    const { state } = this;
    this.setState({
      ...state,
      score: score,
    });
  };

  startGame() {
    const { onCollision, refs } = this;
    const canvas = refs.canvas;
    const ctx = canvas.getContext('2d');
    const game = { ctx };
    const canvasSize = {
      mapW: 1000,
      mapH: 500,
    };

    game.snake = new Snake({
      x: 100,
      y: 100,
      angle: 0,
      length: Snake.INITIAL_LENGTH,
      game: game,
    });

    game.foods = [];

    document.addEventListener('keydown', game.snake.directionControl.bind(game.snake));

    foodGenerator(game.foods, game.ctx);
    game.snakeInterval = setInterval(game.snake.running, 30, canvasSize, game.snake);
    game.foodInterval = setInterval(findFoodCollisions, 30, game.foods, game.ctx, game.snake, onCollision);

    this.game = game;
  };

  stopGame() {
    const { game, onCollision } = this;
    const { snake } = game;

    document.removeEventListener('keydown', snake.directionControl.bind(snake));
    snake.finishGame();
    
    this.game = null;
    onCollision(0);
  };

  render() {
    const { state } = this;
    return (
      <div className='snake__wrapper'>
        <div className='snake__header'>
          <div className='snake__btn-wrapper'>
            <button className='snake__btn' onClick={this.startGame}>Start</button>
            <button className='snake__btn' onClick={this.stopGame}>Stop</button>
          </div>
          <div className='snake__score'>{`Score: ${state.score}`}</div>
        </div>
        <canvas 
          ref='canvas' 
          className='snake__map' 
          id='snake__map' 
          width='1000' 
          height='500'>
        </canvas>
      </div>
    );
  };
};

export default SnakeReactComponent;