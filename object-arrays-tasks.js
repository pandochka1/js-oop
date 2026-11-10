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

var brands = [
  { name: "TyresPro", revenue: 245000, active: true },
  { name: "SecureCart", revenue: 312000, active: true },
  { name: "OldShop", revenue: 98000, active: false },
  { name: "DataWare", revenue: 156000, active: true }
];

function buildList(arr) {
  var res = '';
  for (var i = 0; i < arr.length; i++) {
    res += arr[i].name + ' (' + arr[i].revenue + ')';
    if (i < arr.length - 1) res += ', ';
  }
  return res;
}

function ex1() {
  var n = Number($('ex1-n').value);
  var arr = [];
  var steps = ['Пользовательская генерация: ввод ' + n + ' записей'];
  for (var i = 0; i < n; i++) {
    var name = 'User' + (i + 1);
    var score = Math.floor(Math.random() * 60) + 40;
    arr.push({ name: name, score: score });
    steps.push('Добавлена запись: { name: "' + name + '", score: ' + score + ' }');
  }
  var out = [];
  for (var i = 0; i < arr.length; i++) {
    out.push(arr[i].name + ' — ' + arr[i].score);
  }
  var result = 'Создано ' + arr.length + ' записей<br>' + out.join('<br>');
  console.log(`Список (${arr.length} записей):`);
  for (var i = 0; i < arr.length; i++) {
    console.log(`${arr[i].name} — ${arr[i].score} баллов`);
  }
  showTrace('ex1-trace', steps, result);
}

function ex2() {
  var arr = brands;
  var target = $('ex2-target').value;
  var found = -1;
  var steps = ['Массив: ' + buildList(arr), 'Ищем бренд: ' + target];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === target) {
      found = i;
      steps.push('Найдено на позиции ' + i);
      break;
    } else {
      steps.push(arr[i].name + ' — не совпадает');
    }
  }
  var result = found === -1 ? 'не найден' : `Найден: ${arr[found].name}, выручка ${arr[found].revenue}`;
  console.log(`Результат поиска: ${result}`);
  showTrace('ex2-trace', steps, result);
}

function ex3() {
  var arr = brands;
  var min = Number($('ex3-min').value);
  var filtered = [];
  var steps = ['Порог выручки: >= ' + min, 'Массив: ' + buildList(arr)];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].revenue >= min) {
      filtered.push(arr[i]);
      steps.push(arr[i].name + ' (' + arr[i].revenue + ') — подходит');
    } else {
      steps.push(arr[i].name + ' (' + arr[i].revenue + ') — отброшен');
    }
  }
  var result = 'Отобрано: ' + buildList(filtered);
  console.log(`Отфильтрованные бренды (${filtered.length}):`);
  for (var i = 0; i < filtered.length; i++) {
    console.log(`${filtered[i].name} — ${filtered[i].revenue} руб.`);
  }
  showTrace('ex3-trace', steps, result);
}

function ex4() {
  var arr = [
    { name: 'B', revenue: 200000 }, { name: 'A', revenue: 150000 },
    { name: 'D', revenue: 320000 }, { name: 'C', revenue: 80000 }
  ];
  var steps = ['Исходный порядок: ' + buildList(arr)];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j].revenue > arr[j + 1].revenue) {
        var t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
      }
    }
  }
  steps.push('После сортировки по revenue (по возрастанию): ' + buildList(arr));
  var result = buildList(arr);
  console.log(`Отсортировано по выручке:`);
  for (var i = 0; i < arr.length; i++) console.log(`${arr[i].name} — ${arr[i].revenue}`);
  showTrace('ex4-trace', steps, result);
}

function ex5() {
  var arr = brands;
  var sum = 0;
  var steps = ['Суммируем поле revenue по всем ' + arr.length + ' записям'];
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i].revenue;
    steps.push('  + ' + arr[i].revenue + ' (всего ' + sum + ')');
  }
  var avg = sum / arr.length;
  var result = 'Сумма: ' + sum + ', Среднее: ' + Math.round(avg);
  console.log(`Суммарная выручка: ${sum}`);
  console.log(`Средняя выручка: ${Math.round(avg)}`);
  showTrace('ex5-trace', steps, result);
}

function ex6() {
  var arr = brands;
  var max = arr[0];
  var steps = ['Начинаем с первой записи: ' + arr[0].name + ' (' + arr[0].revenue + ')'];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i].revenue > max.revenue) {
      steps.push(arr[i].name + ' (' + arr[i].revenue + ') — больше, обновляем max');
      max = arr[i];
    } else {
      steps.push(arr[i].name + ' (' + arr[i].revenue + ') — не больше');
    }
  }
  var result = `Бренд с максимальной выручкой: ${max.name}, ${max.revenue}`;
  console.log(`Максимум: ${max.name} — ${max.revenue}`);
  showTrace('ex6-trace', steps, result);
}

function ex7() {
  var arr = brands;
  var activeCount = 0;
  var steps = ['Считаем записи с active === true'];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].active) {
      activeCount++;
      steps.push(arr[i].name + ' — активен (итого ' + activeCount + ')');
    } else {
      steps.push(arr[i].name + ' — не активен');
    }
  }
  var result = 'Активных записей: ' + activeCount + ' из ' + arr.length;
  console.log(`Активных брендов: ${activeCount} из ${arr.length}`);
  showTrace('ex7-trace', steps, result);
}

function ex8() {
  var arr = [
    { name: 'Олег', role: 'user' }, { name: 'Мария', role: 'admin' },
    { name: 'Пётр', role: 'user' }, { name: 'Анна', role: 'viewer' }
  ];
  var role = $('ex8-role').value;
  var count = 0;
  var steps = ['Роль для подсчёта: ' + role, 'Массив: ' + arr.map(function(u){ return u.name + '(' + u.role + ')'; }).join(', ')];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].role === role) {
      count++;
      steps.push(arr[i].name + ' — подходит (итого ' + count + ')');
    } else {
      steps.push(arr[i].name + ' — роль ' + arr[i].role + ' не подходит');
    }
  }
  var result = 'Пользователей с ролью ' + role + ': ' + count;
  console.log(`Подсчёт по роли: ${role} → ${count}`);
  showTrace('ex8-trace', steps, result);
}

function ex9() {
  var arr = [
    { name: 'Олег', score: 85 }, { name: 'Мария', score: 92 }, { name: 'Пётр', score: 78 }
  ];
  var steps = ['Исходные баллы:'];
  for (var i = 0; i < arr.length; i++) steps.push('  ' + arr[i].name + ': ' + arr[i].score);
  var bonus = Number($('ex9-bonus').value);
  steps.push('Добавляем всем по ' + bonus + ' баллов:');
  for (var i = 0; i < arr.length; i++) {
    arr[i].score += bonus;
    steps.push('  ' + arr[i].name + ' теперь: ' + arr[i].score);
  }
  var result = 'После бонуса: ' + arr.map(function(u){ return u.name + '=' + u.score; }).join(', ');
  console.log(`Обновлённые баллы (бонус +${bonus}):`);
  for (var i = 0; i < arr.length; i++) console.log(`${arr[i].name} → ${arr[i].score}`);
  showTrace('ex9-trace', steps, result);
}

function ex10() {
  var arr = [
    { name: 'Олег', score: 85 }, { name: 'Мария', score: 92 },
    { name: 'Пётр', score: 40 }, { name: 'Анна', score: 60 }
  ];
  var threshold = Number($('ex10-threshold').value);
  var kept = [];
  var removed = [];
  var steps = ['Порог: оставляем score >= ' + threshold];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].score >= threshold) {
      kept.push(arr[i]);
      steps.push(arr[i].name + ' (' + arr[i].score + ') — оставляем');
    } else {
      removed.push(arr[i]);
      steps.push(arr[i].name + ' (' + arr[i].score + ') — удаляем');
    }
  }
  var result = 'Остались: ' + kept.map(function(u){ return u.name; }).join(', ') + '. Удалены: ' + (removed.length ? removed.map(function(u){ return u.name; }).join(', ') : 'никто');
  console.log(`Оставшиеся: ${kept.length} чел.`);
  for (var i = 0; i < kept.length; i++) console.log(`${kept[i].name} — ${kept[i].score}`);
  showTrace('ex10-trace', steps, result);
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
      if (!title) title = 'object-tasks.js';
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