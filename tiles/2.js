import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();
let ball = tile.ball;
let game = tile.game;

tile.ballStart.position = { x: 0, y: 0 };
tile.ballStart.velocity = { x: 10, y: 0 };

tile.ballEnd.position = { x: 0, y: 0 };
tile.ballEnd.velocity = { x: 0, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  tile.createRamp(10, tile.height - 40, tile.width, tile.height - 200);

  const tri = tile.createTriangle(100, 400, 500, 400, 300, 200);
  tri.color = "green";

  const eye = tile.createCircle(300, 350, 50);
  eye.color = "black";
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};

// This function will run once every tick, even if the ball is not in your tile
tile.onTickBackground = function () {};
