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

function creditMonths(amount, rate, payment) {
  var m = 0;
  while (amount > 0) {
    amount += amount * rate / 100;
    amount -= payment;
    m++;
  }
  return m;
}

function ex1() {
  var amount = Number($('ex1-amount').value);
  var rate = Number($('ex1-rate').value);
  var payment = Number($('ex1-payment').value);
  var months = creditMonths(amount, rate, payment);
  console.log('creditMonths(' + amount + ', ' + rate + ', ' + payment + ') →', months);
  var steps = [
    'Начальная сумма долга: ' + amount,
    'Ежемесячная ставка: ' + rate + '%',
    'Ежемесячный платёж: ' + payment,
    'Запускаем while (amount > 0)…'
  ];
  var a = amount;
  var m = 0;
  while (a > 0) {
    a += a * rate / 100;
    a -= payment;
    m++;
  }
  steps.push('Цикл завершён. Потребовалось месяцев: ' + m);
  showTrace('ex1-trace', steps, months + ' месяцев');
}

function ex2() {
  var a = Number($('ex2-a').value);
  var b = Number($('ex2-b').value);
  var r1, r2;
  r1 = Math.random() * (b - a + 1) + a;
  r1 = Math.floor(r1);
  do {
    r2 = Math.random() * (b - a + 1) + a;
    r2 = Math.floor(r2);
  } while (r2 === r1);
  console.log('randomPair — первое: ' + r1 + ', второе: ' + r2);
  var steps = [
    'Диапазон: от ' + a + ' до ' + b,
    'Первое число: ' + r1,
    'Запускаем do…while (r2 === r1)',
    'Второе число: ' + r2,
    r2 !== r1 ? 'Числа разные — выход из цикла' : 'Числа совпали — повтор…'
  ];
  showTrace('ex2-trace', steps, r1 + ' и ' + r2);
}

function ex3() {
  var n = Number($('ex3-n').value);
  var result = [];
  for (var i = 1; i <= 10; i++) {
    result.push(n + ' × ' + i + ' = ' + (n * i));
  }
  console.log('Таблица умножения для ' + n + ':', result);
  var steps = [
    'Начало цикла for: i = 1',
    'Условие: i <= 10 → true на старте',
    'Шаг: i++ после каждой итерации'
  ];
  for (var i = 1; i <= 10; i++) {
    steps.push('i=' + i + ': ' + n + ' × ' + i + ' = ' + (n * i));
  }
  steps.push('Цикл завершён (i=11 → условие false)');
  showTrace('ex3-trace', steps, result.join('<br>'));
}

function ex4() {
  var numbers = [];
  var i = 0;
  while (numbers.length < 10) {
    var r = Math.floor(Math.random() * 20) + 1;
    if (r % 4 === 0) {
      i++;
      continue;
    }
    numbers.push(r);
    i++;
  }
  console.log('randomNoMod4 →', numbers);
  var steps = [
    'Генерируем числа от 1 до 20, пока не наберём 10',
    'Если число кратно 4 — continue (пропускаем)',
    'Всего итераций: ' + i
  ];
  steps.push('Результат: ' + numbers.join(', '));
  showTrace('ex4-trace', steps, numbers.join(', '));
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
      if (!title) title = 'index.js';
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