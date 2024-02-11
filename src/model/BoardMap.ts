import { GamePossibleStates } from "../utils/constants";
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
    this.#map = Array.from(Array(20), () => new Array(20).fill(0));
  }

  get currentMap(): Array<Array<number>> {
    return this.#map;
  }

  shoot(username: string, position: Coordinates): void {
    // checks if position is valid
    if (position.x > 19 || position.y > 19) return;
    if (position.y < 0 || position.y < 0) return;

    // 2 cells ship static
    this.#map[18][0] = 2;
    this.#map[19][0] = 2;

    // 3 cells ship static
    this.#map[14][10] = 3;
    this.#map[15][10] = 3;
  }
}
