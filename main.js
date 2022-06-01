const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;  // Setting position at "home" as the game starts
  }

  runGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.askQuestion();
      if (!this.isInBounds()) {
        console.log('instructions Not allowed');
        playing = false;
        break;  sa
      } else if (this.isHole()) {
        console.log('Sorry..!! you fell inside a hole.');
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log('Congratulations.. you found the hat!');
        playing = false;
        break;
      }
      this.field[this.locationY][this.locationX] = pathCharacter;  // Location updated inside the map.
    }
  }

                  // Movement of player using W,A,S,D keys.
  askQuestion() {
    const answer = prompt('Which way to go? /n W=up S=down A=left D=right').toUpperCase();
    switch (answer) {
      case 'W':
        this.locationY -= 1;
        break;
      case 'S':
        this.locationY += 1;
        break;
      case 'A':
        this.locationX -= 1;
        break;
      case 'D':
        this.locationX += 1;
        break;
      default:
        console.log('Enter W, S, A or D.');
        this.askQuestion();
        break;
    }
  }

  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  
  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  print() {
    const displayString = this.field.map(row => {
        return row.join('');
      }).join('\n');
    console.log(displayString);
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(width).fill(0).map(el => new Array(height));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }

                      // Setting the "hat" location.                          
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };


                            // To let know "hat" is not at the starting point.
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
}

const myfield = new Field(Field.generateField(20, 20, 0.1));
myfield.runGame();

