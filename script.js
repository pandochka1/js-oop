

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



function signOfNumber(n) {
  if (n > 0) {
    return "положительное";
  } else if (n < 0) {
    return "отрицательное";
  } else {
    return "ноль";
  }
}

function ex1() {
  var n = Number($('ex1-val').value);
  console.log('signOfNumber(' + n + ') →', signOfNumber(n));

  var steps = [];
  if (n > 0) {
    steps.push(n + ' > 0 → true → return "положительное"');
  } else if (n < 0) {
    steps.push(n + ' > 0 → false');
    steps.push(n + ' < 0 → true → return "отрицательное"');
  } else {
    steps.push(n + ' > 0 → false');
    steps.push(n + ' < 0 → false');
    steps.push('Все условия false → return "ноль"');
  }
  showTrace('ex1-trace', steps, signOfNumber(n));
}



function quadrant(x, y) {
  if (x === 0 && y === 0) {
    return "начало координат";
  } else if (x === 0) {
    return "на оси Y";
  } else if (y === 0) {
    return "на оси X";
  } else if (x > 0 && y > 0) {
    return "I четверть";
  } else if (x < 0 && y > 0) {
    return "II четверть";
  } else if (x < 0 && y < 0) {
    return "III четверть";
  } else {
    return "IV четверть";
  }
}

function ex2() {
  var x = Number($('ex2-x').value);
  var y = Number($('ex2-y').value);
  console.log('quadrant(' + x + ', ' + y + ') →', quadrant(x, y));

  var steps = [];
  if (x === 0 && y === 0) {
    steps.push('x=0 и y=0 → начало координат');
  } else if (x === 0) {
    steps.push('x=0, y≠0 → на оси Y');
  } else if (y === 0) {
    steps.push('y=0, x≠0 → на оси X');
  } else {
    steps.push('x=' + x + ', y=' + y + ' — ни одна не равна 0');
    if (x > 0 && y > 0) {
      steps.push('x>0 и y>0 → I четверть');
    } else if (x < 0 && y > 0) {
      steps.push('x<0 и y>0 → II четверть');
    } else if (x < 0 && y < 0) {
      steps.push('x<0 и y<0 → III четверть');
    } else {
      steps.push('x>0 и y<0 → IV четверть');
    }
  }
  showTrace('ex2-trace', steps, quadrant(x, y));
}



function calc(a, op, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) return "ошибка: деление на 0";
      return a / b;
    default:
      return "неизвестная операция";
  }
}

function ex3() {
  var a = Number($('ex3-a').value);
  var op = $('ex3-op').value;
  var b = Number($('ex3-b').value);
  console.log('calc(' + a + ', "' + op + '", ' + b + ') →', calc(a, op, b));

  var steps = [
    'Переменная op = "' + op + '"',
    'Проверяем case "' + op + '"'
  ];

  if (op === "/" && b === 0) {
    steps.push('Обнаружено деление на 0 → ошибка');
  } else if (op === "+" || op === "-" || op === "*" || op === "/") {
    steps.push('Найден подходящий case');
    steps.push('Вычисляем: ' + a + ' ' + op + ' ' + b + ' = ' + calc(a, op, b));
  } else {
    steps.push('Ни один case не совпал → default');
  }
  showTrace('ex3-trace', steps, calc(a, op, b));
}



function maxOfTwo(a, b) {
  return a > b ? a : b;
}

function ex4() {
  var a = Number($('ex4-a').value);
  var b = Number($('ex4-b').value);
  console.log('maxOfTwo(' + a + ', ' + b + ') →', maxOfTwo(a, b));

  var result = a > b ? a : b;
  var steps = [
    'Проверяем условие: ' + a + ' > ' + b + ' → ' + (a > b),
    a > b ? 'true → возвращаем a = ' + a : 'false → возвращаем b = ' + b,
    'Тернарный оператор: ' + a + ' > ' + b + ' ? ' + a + ' : ' + b + ' = ' + result
  ];
  showTrace('ex4-trace', steps, result);
}



// console.log(signOfNumber(-7));
// console.log(quadrant(3, -2));
// console.log(calc(10, "/", 2));
// console.log(maxOfTwo(15, 9));



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
        if (h) {
          title = h.textContent.trim();
          break;
        }
        el = el.parentNode;
      }
      if (!title) title = 'index.js';
    }

    var codeWindow = document.createElement('div');
    codeWindow.className = 'code-window';

    var bar = document.createElement('div');
    bar.className = 'code-bar';

    var dotR = document.createElement('span');
    dotR.className = 'dot r';
    var dotY = document.createElement('span');
    dotY.className = 'dot y';
    var dotG = document.createElement('span');
    dotG.className = 'dot g';

    var titleSpan = document.createElement('span');
    titleSpan.className = 'code-title';
    titleSpan.textContent = title;

    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Копировать';
    copyBtn.addEventListener('click', function(btn, code) {
      return function() {
        var text = code.textContent;
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = 'Скопировано';
          btn.classList.add('copied');
          setTimeout(function() {
            btn.textContent = 'Копировать';
            btn.classList.remove('copied');
          }, 2000);
        }).catch(function() {
          btn.textContent = 'Ошибка';
        });
      };
    }(copyBtn, pre));

    bar.appendChild(dotR);
    bar.appendChild(dotY);
    bar.appendChild(dotG);
    bar.appendChild(titleSpan);
    bar.appendChild(copyBtn);

    pre.parentNode.insertBefore(codeWindow, pre);
    codeWindow.appendChild(bar);
    codeWindow.appendChild(pre);
  }
})();