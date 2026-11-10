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
  var arr = [10, 25, 8, 42, 17];
  var idx = Number($('ex1-idx').value);
  var val = idx >= 0 && idx < arr.length ? arr[idx] : 'недопустимый индекс';
  console.log('arr[' + idx + '] =', val);
  var steps = [
    'Массив: [' + arr.join(', ') + ']',
    'Длина массива: ' + arr.length + ' элементов',
    'Запрошен индекс: ' + idx,
    idx >= 0 && idx < arr.length ? 'Элемент по индексу ' + idx + ': ' + arr[idx] : 'Индекс ' + idx + ' вне диапазона 0..' + (arr.length - 1)
  ];
  showTrace('ex1-trace', steps, val);
}

function ex2() {
  var arr = [];
  var steps = ['Создан пустой массив'];
  var items = [5, 12, 3, 8];
  for (var i = 0; i < items.length; i++) {
    var prev = arr.length;
    arr.push(items[i]);
    steps.push('push(' + items[i] + ') — длина была ' + prev + ', стала ' + arr.length + ' → [' + arr.join(', ') + ']');
  }
  var removed = arr.pop();
  steps.push('pop() — удалён элемент ' + removed + ', массив: [' + arr.join(', ') + ']');
  console.log('Итоговый массив:', arr);
  showTrace('ex2-trace', steps, '[' + arr.join(', ') + ']');
}

function ex3() {
  var arr = [3, 7, 1, 9, 4];
  var searchVal = Number($('ex3-val').value);
  var idx = -1;
  var steps = ['Массив: [' + arr.join(', ') + ']', 'Ищем значение: ' + searchVal];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === searchVal) { idx = i; break; }
  }
  if (idx !== -1) {
    steps.push('Индекс найденного значения: ' + idx);
    steps.push('Используйте arr.indexOf(' + searchVal + ') — будет ' + idx);
  } else {
    steps.push('Значение ' + searchVal + ' не найдено в массиве');
    steps.push('arr.indexOf(' + searchVal + ') вернёт -1');
  }
  showTrace('ex3-trace', steps, idx !== -1 ? 'найден на позиции ' + idx : 'не найден (-1)');
}

function ex4() {
  var arr = [3, 7, 1, 9, 4];
  var sum = 0;
  var steps = ['Массив: [' + arr.join(', ') + ']', 'Начальная сумма: 0'];
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
    steps.push('Шаг ' + i + ': arr[' + i + '] = ' + arr[i] + ', сумма = ' + sum);
  }
  steps.push('Конечная сумма: ' + sum);
  var avg = sum / arr.length;
  steps.push('Среднее арифметическое: ' + avg);
  console.log('Сумма:', sum, 'Среднее:', avg);
  showTrace('ex4-trace', steps, 'Сумма: ' + sum + ', Среднее: ' + avg);
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