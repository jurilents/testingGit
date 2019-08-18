// Html canvas output
const canvas = document.getElementById('game-canvas');
const xxx = canvas.getContext('2d');

const Width = canvas.width;
const Height = canvas.height;

const Cols = 32;
const Rows = 32;
let tileSize = 1; // one tile size
let speed = 100;

// Поиск меньшей стороны
// По ней будем считать размер клетки
// ДИНАМИЧЕСКИ!!! (наверное ^-^)
if (Width / Cols < Height / Rows)
   tileSize = Width / Cols;
else
   tileSize = Height / Rows;

let snake = []; // Объявляем массив змейки
for (let i = 0; i < 3; i++) { // Цоклом заполняем её
   snake[i] = {
      x: (5 - i) * tileSize, // - i  --> для отступа
      y: (6) * tileSize // индекс ячейки * размер ячейки
   }
}

// СЧЁТ
const scoreField = document.getElementById('score-field');

// Для общего тоступа к еде из всехъ функций
let food = {};
// Массив текстур для еды
let foodImages = FillFoodImages();

function FillFoodImages() {
   let array = [];
   // Заполняем массив картинками
   for (let i = 1; i <= 2; i++) {
      let img = new Image(tileSize, tileSize);
      img.src = `img/0${i}.png`;
      array.push(img);
   }
   return array;
}



const delay = 1000; // Задержка перед проигрышем
let score = 0; // just a score! Really?) of course not!
// Флаги (наверное это кастылики, ну и пусть ^-^)
let PLAY = false;
let IsLose = false;

let GAME; // для интервала между перерисовками

/*************************************************/
// ТОЧКА ВХОДА В ИГРУ
function MainGame() {

   ReadData();

   food = genFood(foodImages[0], 4);


   $('.game-infopanel').on('click', function() {
      playGame();
   });

   // Like Update function in Unity
   // Перерисовка canvas
   GAME = setInterval(draw, speed);

}


// Рисуем, непосредственно, всё :)
function draw() {
   drawField(13);
   if (PLAY === true) {
      // Еда
      xxx.drawImage(food.img, food.x - food.add, food.y - food.add, tileSize + food.add * 2, tileSize + food.add * 2);
      // Змейка
      drawSnake(snake, food);
   }
}


function playGame() {
   if (IsLose === true) {
      document.location.reload(true);
   } else if (PLAY === true) {
      PLAY = false;
   } else {
      PLAY = true;
   }
   $('.pause-panel').toggleClass('hidden');

}

/*************************************************/

function SpeedSet() {

   let val = SpeedConvert(String(speedSlider.val()));

   speedText.html(val);

   SpeedSave(speedSlider.val());

   //Перезапуск игры с новой скоростью
   clearInterval(GAME);
   GAME = setInterval(draw, speed);
}


function SpeedConvert(sliderValue) {
   // Перезапись во временную переменную
   let val = "x?";

   switch (sliderValue) {
      case "-7":
         speed = 400;
         val = "2%";
         break;
      case "-6":
         speed = 300;
         val = "5%";
         break;
      case "-5":
         speed = 200;
         val = "10%";
         break;
      case "-4":
         speed = 175;
         val = "25%";
         break;
      case "-3":
         speed = 150;
         val = "50%";
         break;
      case "-2":
         speed = 125;
         val = "75%";
         break;
      case "-1":
         speed = 110;
         val = "90%";
         break;
      case "0":
         speed = 100;
         val = "100%";
         break;
      case "1":
         speed = 90;
         val = "110%";
         break;
      case "2":
         speed = 82;
         val = "125%";
         break;
      case "3":
         speed = 70;
         val = "150%";
         break;
      case "4":
         speed = 60;
         val = "175%";
         break;
      case "5":
         speed = 50;
         val = "200%";
         break;
      case "6":
         speed = 25;
         val = "300%";
         break;
      case "7":
         speed = 10;
         val = "410%";
         break;
   }
   return val;
}