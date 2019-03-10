import Food from './food';
import Snake from './snake';

const foodGenerator = (foods = [], ctx) => {
  const maxAmount = 200;
  let diff = maxAmount - foods.length;
  while (diff > 0) {
    const x = Math.round(15 + Math.random() * (990 - 15));
    const y = Math.round(15 + Math.random() * (490 - 15));
    const food = new Food({ x, y, ctx });
    foods.push(food);
    diff--;
  };
};

const findFoodCollisions = (foods, ctx, snake, onCollision) => {
  for (const food of foods) {
    if ((snake.x > food.x - 10 && snake.x < food.x + 10) &&
       (snake.y > food.y - 10 && snake.y < food.y + 10)
      ) {
        food.destroy(ctx);
        foods.splice(foods.indexOf(food), 1);
        snake.length++;
        onCollision(snake.length - Snake.INITIAL_LENGTH);
      };
  };
};;

export { foodGenerator, findFoodCollisions };