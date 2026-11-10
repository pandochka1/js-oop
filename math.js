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

function ex1() {
  var n = Number($('ex1-n').value);
  var floorVal = Math.floor(n);
  var roundVal = Math.round(n);
  var ceilVal = Math.ceil(n);
  console.log('floor(' + n + ') =', floorVal, 'round(' + n + ') =', roundVal, 'ceil(' + n + ') =', ceilVal);
  var steps = [
    'Число: ' + n,
    'Math.floor(' + n + ') = ' + floorVal + ' — отбрасывает дробную часть',
    'Math.round(' + n + ') = ' + roundVal + ' — округляет по правилам арифметики',
    'Math.ceil(' + n + ') = ' + ceilVal + ' — округляет вверх до целого',
    n > 0 ? 'Для положительных чисел разница нагляднее' : 'Для отрицательных — ceil двигается к нулю, floor — от нуля'
  ];
  showTrace('ex1-trace', steps, 'floor: ' + floorVal + ', round: ' + roundVal + ', ceil: ' + ceilVal);
}

function ex2() {
  var min = Number($('ex2-min').value);
  var max = Number($('ex2-max').value);
  var count = 5;
  var randoms = [];
  for (var i = 0; i < count; i++) {
    randoms.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  console.log('Случайные числа от ' + min + ' до ' + max + ':', randoms);
  var steps = [
    'Диапазон: от ' + min + ' до ' + max,
    'Формула: Math.floor(Math.random() * (' + max + ' - ' + min + ' + 1)) + ' + min,
    'Сгенерировано ' + count + ' чисел'
  ];
  for (var i = 0; i < randoms.length; i++) {
    steps.push((i + 1) + ': ' + randoms[i]);
  }
  showTrace('ex2-trace', steps, randoms.join(', '));
}

function ex3() {
  var a = Number($('ex3-a').value);
  var operation = $('ex3-op').value;
  var b = Number($('ex3-b').value);
  var result;
  var opName = '';

  switch (operation) {
    case 'min': result = Math.min(a, b); opName = 'Меньшее'; break;
    case 'max': result = Math.max(a, b); opName = 'Большее'; break;
    case 'pow': result = Math.pow(a, b); opName = a + ' в степени ' + b; break;
  }

  console.log('Math.' + operation + '(' + a + ', ' + b + ') =', result);
  var steps = [
    'Вызвана функция Math.' + operation + '()',
    'Аргументы: ' + a + ' и ' + b,
    opName + ' = ' + result
  ];
  showTrace('ex3-trace', steps, result);
}

function ex4() {
  var n = Number($('ex4-n').value);
  var absVal = Math.abs(n);
  var sqrtVal = n >= 0 ? Math.sqrt(n) : 'Ошибка: корень из отрицательного';
  console.log('Math.abs(' + n + ') =', absVal, 'Math.sqrt(' + n + ') =', n >= 0 ? Math.sqrt(n) : 'NaN');
  var steps = [
    'Число: ' + n,
    'Math.abs(' + n + ') = ' + absVal + ' — модуль числа',
    n >= 0 ? 'Math.sqrt(' + n + ') = ' + Math.sqrt(n) + ' — квадратный корень' : 'Math.sqrt(' + n + ') — невозможно (отрицательное число)'
  ];
  showTrace('ex4-trace', steps, '|' + n + '| = ' + absVal + (n >= 0 ? ', √' + n + ' = ' + Math.sqrt(n) : ', корень не определён'));
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