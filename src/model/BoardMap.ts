import { GamePossibleStates } from "../utils/constants";

export default class BoardMap {
  #boardSize: number;
  #gameState: GamePossibleStates;
  #map: Array<Array<number>>;

  constructor(boardSize = 20) {
    this.#boardSize = boardSize;
    this.#gameState = GamePossibleStates.NOT_STARTED;
    this.#startMap();
  }

  #startMap() {
    const lines = new Array(20).fill(0);
    this.#map = new Array(20).fill([...lines]);
  }

  get currentMap(): Array<Array<number>> {
    return this.#map;
  }
}
