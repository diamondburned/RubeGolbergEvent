import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 215.23 };
tile.ballStart.velocity = { x: 9.61, y: 0 };

tile.ballEnd.position = { x: 500, y: 111.82 };
tile.ballEnd.velocity = { x: 8, y: -5.39 };

let trampoline;
let multiple = 1;
let dawarudo;

let script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js";
script.onload = () => {
  dawarudo = new Howl({
    src: [dawarudo_bytes],
  });
};

document.head.appendChild(script);

let stop = false;
let once = false;

tile.setup = function () {
  trampoline = tile.createSpring(30, 318, 50, 8, 1.5, -10);

  // MAGIC!
  let sensorBody = trampoline.body.parts[2];
  // EVEN MORE MAGIC!
  let oldCallback = sensorBody.callback;
  sensorBody.callback = (o) => {
    if (once) {
      oldCallback(o);
      return;
    }

    once = true;

    Matter.Body.set(tile.ball.body, { isStatic: true });
    stop = true;

    (async function () {
      document.body.style.transition = "linear 100ms filter";
      document.body.style.filter = "invert()";

      dawarudo.play();

      await sleep(3000);

      Matter.Body.set(tile.ball.body, { isStatic: false });
      stop = false;

      oldCallback(o);

      document.body.style.filter = "";

      setTimeout(() => {
        document.body.style.transition = "";
      }, 100);
    })();
  };

  let trampoline2 = tile.createSpring(430, 450, 100, 8, -10, -14);
  trampoline2.angle = -45;

  tile.createLine(300, 0, 300, 325, 20);
  tile.createLine(192, 418, 258, 483, 5);
};

tile.onTick = function () {
  if (stop) return;

  // Rotate by 1.5deg every tick. With 60 TPS, this means rotating 90deg a
  // second.
  // translate tile
  this.matter.Body.translate(trampoline.body, { x: 7 * multiple, y: 0 });
  if (trampoline.position.x > 280) {
    multiple = -1;
  }
  if (trampoline.position.x < 20) {
    multiple = 1;
  }
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// LOOL WHAT THE FUCK?!
const dawarudo_bytes = `data:audio/opus;base64,
T2dnUwACAAAAAAAAAACdhzENAAAAAK7EKXYBE09wdXNIZWFkAQE4AYC7AAAAAABPZ2dTAAAAAAAAAAAAAJ2HMQ0BAAAA+aoGAwE2
T3B1c1RhZ3MNAAAATGF2ZjU4Ljc2LjEwMAEAAAAVAAAAZW5jb2Rlcj1MYXZmNTguNzYuMTAwT2dnUwAAuLwAAAAAAACdhzENAgAA
AA2vyLxkGBcWFxYbGBgbEhEPEBEREhEQEBQQEg8QDxEREREUFBEUERQSEBAUFBASFQ8OERYWFRYSEg4SEhAREBUUEhYREhQPDhUS
EBEREA8SERIUDxUREhMPExIOEBEUExMTDxISDRERE2CFKtR8ciafmmKXl9IZvhn3R7hE7P+Y+mCXeq+15ehGeZJzdL/2oQ4U8YUW
CYyxYJeVqjtevhO6d7ITXYnrPmJUGRiQe2CXm690Z/xrcw77N+vW8NuVpeJjHBF1YLyaPLIETko2aC7V26WStEN3XFYS7GC8oGaO
ZnrGNk/Wvq5uN05XcHxkSN9NVVR0uWC/8c3Ad71k7ZU6Jn+Ijdr7YnrYhqebzWC8ybTe+lpg32DqdqgMLqwOhMO1DYzunmC/9D6f
rSJJ02PwKkqsqMEy8u1g3hqHOhW9yWAGfIgC/rJxImoUnvjIxyMLOGAGezg9nENYhakYnQIcUV0QYD/IGpHpflv3IDvdfxQjYAZ4
iOqOXhjmxQUNfVhtyWAGea76xJSQ+hRAFbaFQSzzYD/OW+OLIrRd6tlq1kYiFoRgBnqLQ1x87WgECEDq3HEKBnlgBnlKRxQoqvUS
kJBZACIQyWAGebcFfXyv3vtreU1/5W5gBnv1Bspc2ikItUJKligYYD/I6+DAL8T0w1wOFAtvLv1vCDJgBnlG4/L15mgVCweOelUj
YD/IGLWXTsgu+T96aNYaxyrzYAZ5sZGIOoB28pj3tWKoYD/LuP75NRf/Yzeg1/Yc2WAGellFUwp6rTl+m74XEmAGea/21+glykO4
ajhIZ4r/YAZ6J+O1Nu2+CzhTIY9oFRFgBntTxs7J9pfMEkxo01WlI2A/1qoGHj+Plw4LmOylemmEYD/IKQRG8D7bVy4yGSSGb5Xe
YklgP8cSU+3TMEgB15WkJZX8SsAKo2AGeoBFSxRGdpKv4LzBiJE+YD++Gi7jOgsa+EYUS9jq53wq+05gBnmvOaTg7ys7ro81fyga
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
`.replace("\n", "");
