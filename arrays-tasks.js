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

function buildArrayText(arr) {
  return '[' + arr.join(', ') + ']';
}

function randomArray(size, min, max) {
  var arr = [];
  for (var i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

function ex1() {
  var n = Number($('ex1-n').value);
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 90) + 10);
  }
  var sum = 0;
  var steps = ['Сгенерирован массив: ' + buildArrayText(arr), 'Начальная сумма: 0'];
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
    steps.push('arr[' + i + '] = ' + arr[i] + ', сумма = ' + sum);
  }
  var avg = sum / arr.length;
  steps.push('Среднее арифметическое = ' + sum + ' / ' + arr.length + ' = ' + avg.toFixed(2));
  console.log('Сумма:', sum, 'Среднее:', avg.toFixed(2));
  showTrace('ex1-trace', steps, 'Сумма: ' + sum + ', Среднее: ' + avg.toFixed(2));
}

function ex2() {
  var n = Number($('ex2-n').value);
  var arr = randomArray(n, 1, 50);
  var max = arr[0];
  var min = arr[0];
  var steps = ['Массив: ' + buildArrayText(arr), 'Начинаем: max = ' + max + ', min = ' + min];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      steps.push('arr[' + i + '] = ' + arr[i] + ' > max → max = ' + arr[i]);
      max = arr[i];
    } else {
      steps.push('arr[' + i + '] = ' + arr[i] + ' не больше max (' + max + ')');
    }
    if (arr[i] < min) {
      steps.push('arr[' + i + '] = ' + arr[i] + ' < min → min = ' + arr[i]);
      min = arr[i];
    }
  }
  console.log('Максимум:', max, 'Минимум:', min);
  showTrace('ex2-trace', steps, 'Максимум: ' + max + ', Минимум: ' + min);
}

function ex3() {
  var n = Number($('ex3-n').value);
  var arr = randomArray(n, 1, 20);
  var countEven = 0;
  var countOdd = 0;
  var steps = ['Массив: ' + buildArrayText(arr), 'Счётчики: чётных 0, нечётных 0'];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      countEven++;
      steps.push('arr[' + i + '] = ' + arr[i] + ' — чётное → чётных ' + countEven);
    } else {
      countOdd++;
      steps.push('arr[' + i + '] = ' + arr[i] + ' — нечётное → нечётных ' + countOdd);
    }
  }
  console.log('Чётных:', countEven, 'Нечётных:', countOdd);
  showTrace('ex3-trace', steps, 'Чётных: ' + countEven + ', Нечётных: ' + countOdd);
}

function ex4() {
  var n = Number($('ex4-n').value);
  var arr = randomArray(n, 1, 10);
  var target = Number($('ex4-target').value);
  var found = -1;
  var steps = ['Массив: ' + buildArrayText(arr), 'Ищем значение: ' + target];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      found = i;
      steps.push('Найдено! arr[' + i + '] = ' + arr[i] + ' — прерываем цикл');
      break;
    } else {
      steps.push('arr[' + i + '] = ' + arr[i] + ' — не подходит');
    }
  }
  if (found === -1) steps.push('Значение не найдено, результат -1');
  console.log('Индекс:', found);
  showTrace('ex4-trace', steps, found === -1 ? 'не найдено (-1)' : 'найдено на позиции ' + found);
}

function ex5() {
  var arr = [4, 7, 1, 9, 3, 8, 2, 6, 5, 0];
  var temp;
  var steps = ['Исходный массив: ' + buildArrayText(arr), 'Попарно меняем элементы: arr[i] ↔ arr[length-1-i]'];
  for (var i = 0; i < arr.length / 2; i++) {
    var j = arr.length - 1 - i;
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    steps.push('Меняем arr[' + i + '] и arr[' + j + ']: ' + buildArrayText(arr));
  }
  console.log('Развёрнутый:', arr);
  showTrace('ex5-trace', steps, buildArrayText(arr));
}

function ex6() {
  var n = Number($('ex6-n').value);
  var arr = randomArray(n, 1, 60);
  var steps = ['Массив: ' + buildArrayText(arr)];
  var swappedTotal = 0;
  for (var i = 0; i < arr.length - 1; i++) {
    var swaps = 0;
    steps.push('Проход ' + (i + 1) + ':');
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
        swaps++;
        steps.push('  Меняем arr[' + j + ']=' + arr[j] + ' и arr[' + (j + 1) + ']=' + t + ' → ' + buildArrayText(arr));
      }
    }
    if (swaps === 0) {
      steps.push('  Обменов не было — массив отсортирован, досрочно останавливаемся');
      break;
    }
  }
  console.log('Отсортированный:', arr);
  showTrace('ex6-trace', steps, buildArrayText(arr));
}

function ex7() {
  var arr = [5, 9, 3, 7, 1];
  var k = Number($('ex7-k').value);
  var steps = ['Исходный массив: ' + buildArrayText(arr), 'Сдвиг влево на ' + k + ' позиции'];
  var actual = k % arr.length;
  for (var shift = 0; shift < actual; shift++) {
    var first = arr[0];
    for (var i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    arr[arr.length - 1] = first;
    steps.push('Шаг ' + (shift + 1) + ': ' + buildArrayText(arr));
  }
  console.log('После сдвига:', arr);
  showTrace('ex7-trace', steps, buildArrayText(arr));
}

function ex8() {
  var n = Number($('ex8-n').value);
  var arr = randomArray(n, 1, 20);
  var threshold = Number($('ex8-threshold').value);
  var filtered = [];
  var steps = ['Массив: ' + buildArrayText(arr), 'Порог: больше ' + threshold];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > threshold) {
      filtered.push(arr[i]);
      steps.push('arr[' + i + '] = ' + arr[i] + ' > ' + threshold + ' — добавляем в результат');
    } else {
      steps.push('arr[' + i + '] = ' + arr[i] + ' — не проходит условие');
    }
  }
  steps.push('Итоговый массив: ' + buildArrayText(filtered));
  console.log('Отфильтрованный:', filtered);
  showTrace('ex8-trace', steps, buildArrayText(filtered));
}

function ex9() {
  var n = Number($('ex9-n').value);
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 6) + 1);
  }
  var value = Number($('ex9-value').value);
  var count = 0;
  var steps = ['Массив: ' + buildArrayText(arr), 'Считаем вхождения значения ' + value + ', начальный счётчик 0'];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      count++;
      steps.push('arr[' + i + '] = ' + arr[i] + ' — совпадение! Счётчик = ' + count);
    } else {
      steps.push('arr[' + i + '] = ' + arr[i] + ' — не подходит');
    }
  }
  console.log('Вхождений:', count);
  showTrace('ex9-trace', steps, 'Количество вхождений: ' + count);
}

function ex10() {
  var arr = [64, 34, 25, 12, 22];
  var steps = ['Исходный массив: ' + buildArrayText(arr)];
  for (var i = 0; i < arr.length - 1; i++) {
    var minIndex = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      var temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
      steps.push('Минимальный элемент на позиции ' + minIndex + ' (' + arr[i] + ') → ставим на место ' + i + ': ' + buildArrayText(arr));
    }
  }
  console.log('Отсортированный (выбором):', arr);
  showTrace('ex10-trace', steps, buildArrayText(arr));
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