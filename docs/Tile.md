# Tile

Tile is...

## Coordinate System

Most `create` method described by `Tile` will take in the 4 (four) parameters
`x`, `y`, `width` and `height`. It is important to note that **`x` and `y`
coordinates describe the middle point** of a shape.

For example, a square with `(x, y) = (20, 20)` and `width = height = 20` means,
on the coordinate grid, a square with its 4 corners at `(10, 10)`, `(30, 10)`,
`(10, 30)`, and `(30, 30)`.

The coordinates are also relative to each tile. This means that regardless of
what or where your tile is, you will always have `0 <= x <= tile.width` and `0 <= y <= tile.height`.

## Properties

### `width`

`width` is the width of the tile. It is always 500.

### `height`

`height` is the height of the tile. It is always 500.

#### Example: Printing the width and height of the tile

```ts
console.log(`${tile.width} x ${tile.height}`);
// Output:
// 500 x 500
```

## Methods

Below are `Tile`'s different methods. To use them, use e.g.
`tile.createRectangle` in your tile.

### `createRectangle`

`createRectangle` creates a rectangle shape on your Tile. It is the most basic
shape that you can put on a tile.

```ts
createRectangle(x: number, y: number, width: number, height: number, moveable = false): Rectangle
```

#### Parameters

- `x`: the middle point of the rectangle to be created relative to the
  horizontal x-axis.
- `y`: the middle point of the rectangle to be created relative to the vertical
  y-axis.
- `width`: the width of the rectangle.
- `height`: the height of the rectangle.
- `moveable`: whether the rectangle is affected by the gravity. The default is
  false, meaning that the created rectangle stays in place throughout the game.

#### Example: Making a basic rectangle at the middle of the tile with the dimensions 100x100

This example makes a new rectangle into the variable called `rect`.

```ts
let rect = tile.createRectangle(
  // Dividing the width and height by 2 gets us the point right on the middle
  // of the tile. Placement of the rectangle is done at the center of the
  // shape (see Coordinate System).
  tile.width / 2,
  tile.height / 2,
  // Width and height.
  100,
  100
);
```

#### Example: Create a small box that drops from the top-middle

```ts
tile.createRectangle(tile.width / 2, 10, 10, 10, true);
```

### `createLine`

`createLine` creates a line connecting 2 points on the grid.

```ts
createLine(x1: number, y1: number, x2: number, y2: number, thickness: number, moveable = false): Line
```

#### Parameters

- `x1`: the X value of the first point.
- `y1`: the Y value of the first point.
- `x2`: the X value of the second point.
- `y2`: the Y value of the second point.
- `thickness`: the thickness of the line.
- `moveable`: whether the line is affected by the gravity. The default is
  false, meaning that the created line stays in place throughout the game.

#### Example: Make a platform spanning the bottom of the tile

```js
tile.createLine(0, 480, 500, 480, 10);
```

#### Example: Make a thin red line from the top-left corner to the bottom-right corner of the tile

```js
let diagonal = tile.createLine(0, 0, 500, 500, 8);
diagonal.color = "red";
```

### `createTriangle`

```ts
createTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, moveable = false): Triangle
```

### `createRamp`

```ts
createRamp(x1: number, y1: number, x2: number, y2: number): Ramp
```

### `createCircle`

`createCircle` creates a circle on the tile.

```ts
createCircle(x: number, y: number, radius: number, moveable = false): Circle
```

#### Parameters

- `x`: the center of the circle to be created relative to the
  horizontal x-axis.
- `y`: the center of the circle to be created relative to the vertical
  y-axis.
- `radius`: the radius of the circle.
- `moveable`: whether the circle is affected by the gravity. The default is
  false, meaning that the created circle stays in place throughout the game.

#### Example: Make a circle at the top-left corner

```ts
tile.createCircle(60, 60, 40);
```

#### Example: Make a fake ball that drops from the top-middle

```ts
let fakeBall = tile.createCircle(tile.width / 2, 20, 20, true);
fakeBall.color = "#f99"; // salmon-ish color
```

### `createConveyorBelt`

```ts
createConveyorBelt(x: number, y: number, width: number, height: number, speed: number): ConveyorBelt
```

### `createPortals`

```ts
createPortals(x1: number, y1: number, x2: number, y2: number): Portal[]
```

### `createButton`

`createButton` creates a button, which is a square that calls the given function
if anything (including the ball) touches it.

```ts
createButton(x: number, y: number, width: number, height: number, callback: function, endCallback = (_) => {}): Button
```

#### Parameters

- `x`: the middle point of the button to be created relative to the
  horizontal x-axis.
- `y`: the middle point of the button to be created relative to the vertical
  y-axis.
- `width`: the width of the button.
- `height`: the height of the button.
- `callback`: the function to be called when the button is pressed.
- `endCallback`: the function to be called when the button is no longer pressed.

#### Example: Change the color of a circle once the ball hits a button

This example permanently changes the color of a square from green to red once
the ball (or anything) hits the button.

```ts
let square = tile.createCircle(tile.width - 40, 40, 20);
square.color = "green"; // green by default

// Tip: to test this, change your `ballStart.position` so that the ball falls
// onto the button.
tile.createButton(tile.width / 2, 400, 200, 8, () => {
  square.color = "red";
});
```

#### Example: Change the color of a circle as long as the ball is on a button

This example, unlike the top one, changes the color back as soon as the ball
stops touching the button.

```ts
let square = tile.createCircle(tile.width - 40, 40, 20);
square.color = "green"; // green by default

// Tip: to test this, change your `ballStart.position` so that the ball falls
// onto the button.
tile.createButton(
  tile.width / 2,
  400,
  200,
  8,
  () => {
    // This function is called when the button is pressed.
    square.color = "red";
  },
  () => {
    // This function is called when the button is no longer pressed.
    square.color = "green";
  }
);
```

The code can be made slightly better by using `sleep` within an `async` function
to add a delay before the color changes back. The code below only sets the color
back after the ball has left for exactly 1 second.

```ts
tile.createButton(
  tile.width / 2,
  400,
  200,
  8,
  () => {
    square.color = "red";
  },
  // !!!
  async () => {
    await sleep(1000); // sleep for 1 second or 1000 milliseconds.
    square.color = "green";
  }
);
```

### `createSpring`

```ts
createSpring(x, y, width, height, vx, vy): Spring
```

### `createRope`

```ts
createRope(x: number, y: number, length: number): Rope
```
