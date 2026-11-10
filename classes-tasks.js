function $(id) { return document.getElementById(id); }

function showTrace(containerId, steps, result) {
  var box = $(containerId);
  if (!box) return;
  var html = '<div class="trace-title">Пошаговый разбор</div><ol>';
  for (var i = 0; i < steps.length; i++) {
    html += '<li><span class="mono">' + steps[i] + '</span></li>';
  }
  html += '</ol><div class="result-box"><span class="out-label">Результат</span>' + result + '</div>';
  box.innerHTML = html;
}

class Fraction {
  constructor(numer, denom) {
    this.numer = numer;
    this.denom = denom;
  }
  toString() {
    return `${this.numer} / ${this.denom}`;
  }
  asDecimal() {
    return (this.numer / this.denom).toFixed(2);
  }
}

function ex1() {
  var n = Number($('ex1-n').value);
  var d = Number($('ex1-d').value);
  var f = new Fraction(n, d);
  var steps = [
    'new Fraction(' + n + ', ' + d + ')',
    'Поля: numer = ' + f.numer + ', denom = ' + f.denom,
    'toString() → ' + f.toString(),
    'asDecimal() → ' + f.asDecimal()
  ];
  var result = f.toString() + ' = ' + f.asDecimal();
  console.log(`Дробь: ${f.toString()}`);
  console.log(`Десятичная: ${f.asDecimal()}`);
  showTrace('ex1-trace', steps, result);
}

class ShoppingCart {
  constructor() {
    this.items = [];
    this.owner = 'гость';
  }
  add(name, price) {
    this.items.push({ name, price });
    return `Добавлено: ${name}, ${price} руб.`;
  }
  total() {
    var sum = 0;
    for (var i = 0; i < this.items.length; i++) sum += this.items[i].price;
    return sum;
  }
  count() {
    return this.items.length;
  }
}

function ex2() {
  var items = ['Монитор', 'Клавиатура', 'Мышь'];
  var prices = [15000, 3500, 1200];
  var cart = new ShoppingCart();
  var steps = ['Создана пустая корзина'];
  for (var i = 0; i < items.length; i++) {
    cart.add(items[i], prices[i]);
    steps.push('add("' + items[i] + '", ' + prices[i] + ') — ' + cart.add(items[i], prices[i]));
  }
  steps.push('count() → ' + cart.count());
  steps.push('total() → ' + cart.total());
  var result = 'Позиций: ' + cart.count() + ', сумма: ' + cart.total() + ' руб.';
  console.log(`В корзине позиций: ${cart.count()}`);
  console.log(`Сумма заказа: ${cart.total()} руб.`);
  showTrace('ex2-trace', steps, result);
}

class Cipher {
  #shift;
  constructor(shift) {
    this.#shift = shift;
  }
  encode(text) {
    var out = '';
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);
      out += String.fromCharCode(code + this.#shift);
    }
    return out;
  }
}

function ex3() {
  var text = $('ex3-text').value || 'Hello';
  var shift = Number($('ex3-shift').value);
  var c = new Cipher(shift);
  var encoded = c.encode(text);
  var steps = [
    'new Cipher(' + shift + ')',
    'Приватное поле #shift = ' + shift + ' (снаружи недоступно)',
    'encode("' + text + '") проходит по каждому символу',
    'Код каждого символа сдвигается на ' + shift + ': ' + text + ' → ' + encoded
  ];
  var result = encoded;
  console.log(`Зашифровано: ${encoded}`);
  showTrace('ex3-trace', steps, result);
}

class Transport {
  constructor(speed) {
    this.speed = speed;
  }
  describe() {
    return `Транспорт, скорость ${this.speed} км/ч`;
  }
}

class Car extends Transport {
  constructor(brand, speed) {
    super(speed);
    this.brand = brand;
  }
  describe() {
    return `${super.describe()} → автомобиль ${this.brand}`;
  }
}

function ex4() {
  var brand = $('ex4-brand').value || 'Lada';
  var speed = Number($('ex4-speed').value) || 120;
  var car = new Car(brand, speed);
  var steps = [
    'new Car("' + brand + '", ' + speed + ')',
    'super(speed) вызывает конструктор Transport → this.speed = ' + speed,
    'Затем Car добавляет this.brand = "' + brand + '"',
    'describe() переопределён и через super.describe() включает родительскую часть',
    'Результат: ' + car.describe()
  ];
  var result = car.describe();
  console.log(`Описание: ${result}`);
  showTrace('ex4-trace', steps, result);
}

class PasswordGenerator {
  static generate(length) {
    var symbols = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var out = '';
    for (var i = 0; i < length; i++) {
      out += symbols[Math.floor(Math.random() * symbols.length)];
    }
    return out;
  }
}

function ex5() {
  var len = Number($('ex5-len').value);
  var pwd = PasswordGenerator.generate(len);
  var steps = [
    'Вызов статического метода: PasswordGenerator.generate(' + len + ')',
    'Внутри — строка symbols из букв и цифр',
    'Цикл в ' + len + ' раз берёт случайный символ через Math.random() и Math.floor()',
    'Итоговая строка длиной ' + pwd.length + ': ' + pwd
  ];
  var result = pwd;
  console.log(`Сгенерирован пароль: ${pwd}`);
  showTrace('ex5-trace', steps, result);
}

(function() {
  var pres = document.querySelectorAll('pre.code');
  for (var i = 0; i < pres.length; i++) {
    var pre = pres[i];
    if (pre.parentNode.classList.contains('code-window')) continue;
    var title = pre.getAttribute('data-title');
    if (!title) {
      var el = pre.parentNode;
      while (el && el !== document.body) {
        var h = el.querySelector('.example-head h3, details.theory > summary');
        if (h) { title = h.textContent.trim(); break; }
        el = el.parentNode;
      }
      if (!title) title = 'classes-tasks.js';
    }
    var codeWindow = document.createElement('div');
    codeWindow.className = 'code-window';
    var bar = document.createElement('div');
    bar.className = 'code-bar';
    var dotR = document.createElement('span'); dotR.className = 'dot r';
    var dotY = document.createElement('span'); dotY.className = 'dot y';
    var dotG = document.createElement('span'); dotG.className = 'dot g';
    var titleSpan = document.createElement('span');
    titleSpan.className = 'code-title';
    titleSpan.textContent = title;
    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Копировать';
    copyBtn.addEventListener('click', function(btn, code) {
      return function() {
        navigator.clipboard.writeText(code.textContent).then(function() {
          btn.textContent = 'Скопировано';
          btn.classList.add('copied');
          setTimeout(function() { btn.textContent = 'Копировать'; btn.classList.remove('copied'); }, 2000);
        }).catch(function() { btn.textContent = 'Ошибка'; });
      };
    }(copyBtn, pre));
    bar.appendChild(dotR); bar.appendChild(dotY); bar.appendChild(dotG);
    bar.appendChild(titleSpan); bar.appendChild(copyBtn);
    pre.parentNode.insertBefore(codeWindow, pre);
    codeWindow.appendChild(bar);
    codeWindow.appendChild(pre);
  }
})();