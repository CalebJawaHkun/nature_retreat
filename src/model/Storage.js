export default class Storage {
    static GameData = {
        passIntro: false
    }

    static selectedCharacter = null;

    static didPassIntro() { this.GameData.passIntro = true; }
    static setSelectedCharacter(sc) {
        this.selectedCharacter = sc;
    }d
}

function XY(x,y) {
    this.x = x;
    this.y =y;
}
const mapBoundary = [
    new XY(4, 0),
    new XY(5, 0),
    new XY(4, 1),
    new XY(5, 1),
    new XY(4, 2),
    new XY(5, 2),
    new XY(6, 2),
    new XY(4, 3),
    new XY(5, 3),
    new XY(3, 3),
    new XY(3, 4),
    new XY(4, 4),
    new XY(5, 4),
    new XY(6, 3),
    new XY(7, 3),
    new XY(6, 4),
    new XY(7, 4),
    new XY(8, 3),
    new XY(8, 4),
    new XY(9, 4),
    new XY(9, 5),
    new XY(8, 5),
    new XY(9, 6),
    new XY(8, 6),
    new XY(8, 7),
    new XY(9, 7),
    new XY(9, 8),
    new XY(9, 9),
    new XY(9, 10),
    new XY(9, 11),
    new XY(7, 7),
    new XY(7, 6),
    new XY(7, 5),
    new XY(6, 5),
    new XY(6, 6),
    new XY(6, 7),
    new XY(5, 7),
    new XY(5, 6),
    new XY(5, 5),
    new XY(5, 8),
    new XY(5, 10),
    new XY(5, 9),
    new XY(5, 11),
    new XY(5, 12),
    new XY(5, 13),
    new XY(6, 13),
    new XY(8, 8),
    new XY(8, 9),
    new XY(8, 10),
    new XY(8, 11)
];


export { mapBoundary, XY };