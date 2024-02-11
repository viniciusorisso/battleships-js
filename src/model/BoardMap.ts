import { GamePossibleStates, ShipDirections } from "../utils/constants";
import Coordinates from "./Coordinates";

export default class BoardMap {
  #boardSize: number;
  #gameState: GamePossibleStates;
  #map: Array<Array<number>>;

  constructor(boardSize = 20) {
    this.#boardSize = boardSize;
    this.#gameState = GamePossibleStates.NOT_STARTED;
    this.#startMap();
  }

  #startMap(): void {
    if (this.#gameState !== GamePossibleStates.NOT_STARTED) {
      return;
    }
    this.#map = Array.from(Array(this.#boardSize), () =>
      new Array(this.#boardSize).fill(0)
    );

    this.setShip({ x: 18, y: 0 }, 2, ShipDirections.HORIZONTAL);

    this.setShip({ x: 14, y: 10 }, 3, ShipDirections.HORIZONTAL);

    this.setShip({ x: 5, y: 3 }, 4, ShipDirections.VERTICAL);
  }

  get currentMap(): Array<Array<number>> {
    return this.#map;
  }

  shoot(username: string, position: Coordinates): void {
    // checks if position is valid
    if (position.x > 19 || position.y > 19) return;
    if (position.x < 0 || position.y < 0) return;

    this.#destroyCell(position);
  }

  #hitsSomething({ x, y }: Coordinates): boolean {
    return this.#map[x][y] >= 0;
  }

  #destroyCell(position: Coordinates): void {
    if (!this.#hitsSomething(position)) {
      return;
    }

    if (this.#map[position.x][position.y] === 0) {
      this.#map[position.x][position.y] = -2;

      return;
    }

    this.#map[position.x][position.y] = -1;
  }

  setShip(
    position: Coordinates,
    size: number,
    direction: ShipDirections
  ): void {
    this.#gameState = GamePossibleStates.RUNNING;

    if (!this.#isShipFuturePlaceAllowed(position, size, direction)) {
      return;
    }

    if (direction === ShipDirections.HORIZONTAL)
      for (let i = position.y; i < position.y + size; i++)
        this.#map[position.x][i] = size;
    else
      for (let i = position.x; i < position.x + size; i++)
        this.#map[i][position.y] = size;
  }

  #isShipFuturePlaceAllowed(
    position: Coordinates,
    size: number,
    direction: ShipDirections
  ): boolean {
    let isValid = true;

    if (direction === ShipDirections.HORIZONTAL) {
      for (let i = position.y; i < position.x + size; i++)
        if (this.#map[position.x][i] !== 0) isValid = false;
    } else {
      for (let i = position.x; i < position.y + size; i++)
        if (this.#map[i][position.y] !== 0) isValid = false;
    }

    return isValid;
  }
}
