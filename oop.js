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

class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  canAccess(action) {
    var matrix = {
      admin: ['create', 'read', 'update', 'delete'],
      editor: ['create', 'read', 'update'],
      viewer: ['read']
    };
    var rights = matrix[this.role];
    return rights ? rights.includes(action) : false;
  }
  describe() {
    return this.name + ' (роль: ' + this.role + ')';
  }
}

function ex1() {
  var name = $('ex1-name').value || 'Олег';
  var role = $('ex1-role').value;
  var user = new User(name, role);
  var steps = [
    'Создаём объект: new User("' + name + '", "' + role + '")',
    'Конструктор выполнил: this.name = "' + name + '"; this.role = "' + role + '"',
    'Вызываем метод describe(): ' + user.describe(),
    'Объект хранит собственные поля name и role'
  ];
  var result = user.describe();
  console.log(result);
  showTrace('ex1-trace', steps, result);
}

class Session {
  #token;
  #expiresAt;
  constructor(user, ttlMin) {
    this.user = user;
    this.#token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    this.#expiresAt = Date.now() + ttlMin * 60000;
  }
  get token() {
    return this.#token;
  }
  isValid() {
    return Date.now() < this.#expiresAt;
  }
  expiresIn() {
    var ms = this.#expiresAt - Date.now();
    return Math.max(0, Math.round(ms / 6000) / 10) + ' мин';
  }
}

function ex2() {
  var ttl = Number($('ex2-ttl').value);
  var s = new Session('guest', ttl);
  var steps = [
    'new Session("guest", ' + ttl + ')',
    'Конструктор сгенерировал приватный токен (поле #token недоступно снаружи)',
    'Срок действия: сейчас + ' + ttl + ' минут (поле #expiresAt)',
    'Геттер token вернул бы строку: ' + s.token.slice(0, 8) + '… (но это секрет)',
    'isValid() → ' + s.isValid(),
    'expiresIn() → ' + s.expiresIn()
  ];
  console.log('Токен:', s.token, 'Действителен:', s.isValid(), 'Осталось:', s.expiresIn());
  showTrace('ex2-trace', steps, 'isValid: ' + s.isValid() + ', осталось: ' + s.expiresIn());
}

class Account {
  #password;
  constructor(login) {
    this.login = login;
    this.#password = '';
  }
  set password(value) {
    if (value.length < 8) {
      throw new Error('Пароль слишком короткий — минимум 8 символов');
    }
    this.#password = value;
  }
  get password() {
    return '***';
  }
  check(value) {
    return this.#password === value;
  }
}

function ex3() {
  var pwd = $('ex3-pwd').value;
  var acc = new Account('user1');
  var steps = [];
  try {
    acc.password = pwd;
    steps.push('Сеттер password принял значение длиной ' + pwd.length + ' символов');
    steps.push('Пароль хранится в приватном поле #password');
    steps.push('Геттер возвращает «***», а не сам пароль');
    var ok = acc.check(pwd);
    steps.push('Метод check() сравнивает и вернул ' + ok);
    var result = 'Пароль установлен. check() → ' + ok;
  } catch (e) {
    steps.push('Сеттер выбросил ошибку: ' + e.message);
    var result = 'Ошибка: ' + e.message;
  }
  console.log(result);
  showTrace('ex3-trace', steps, result);
}

class BaseUser {
  constructor(name) {
    this.name = name;
  }
  role() {
    return 'пользователь';
  }
}

class Admin extends BaseUser {
  constructor(name, department) {
    super(name);
    this.department = department;
  }
  role() {
    return 'администратор';
  }
  full() {
    return super.role() + ' → ' + this.role() + ' из отдела ' + this.department;
  }
}

function ex4() {
  var name = $('ex4-name').value || 'Мария';
  var dept = $('ex4-dept').value || 'ИБ';
  var admin = new Admin(name, dept);
  var steps = [
    'new Admin("' + name + '", "' + dept + '")',
    'Ключевое слово super(name) вызывает конструктор родителя BaseUser → this.name установлен',
    'После super() класс Admin добавляет this.department = "' + dept + '"',
    'Метод role() переопределён: родитель вернул бы «пользователь»',
    'Новый role() → ' + admin.role(),
    'full() через super.role() показывает обе строки: ' + admin.full()
  ];
  var result = admin.full();
  console.log(result);
  showTrace('ex4-trace', steps, result);
}

class AuditLog {
  constructor() {
    this.entries = [];
  }
  static format(entry) {
    return new Date(entry.time).toISOString() + ' [' + entry.level + '] ' + entry.message;
  }
  log(level, message) {
    this.entries.push({ time: Date.now(), level, message });
  }
  latest() {
    var last = this.entries[this.entries.length - 1];
    return last ? AuditLog.format(last) : 'записей нет';
  }
}

function ex5() {
  var message = $('ex5-message').value || 'Зафиксирована попытка входа';
  var level = $('ex5-level').value;
  var logger = new AuditLog();
  logger.log(level, message);
  logger.log('info', 'Сессия открыта');
  var steps = [
    'Создаём журнал: new AuditLog()',
    'Вызываем log("' + level + '", "' + message + '") — запись добавлена в entries',
    'Вызываем log("info", "Сессия открыта") — ещё одна запись',
    'Статический метод format() доступен через AuditLog.format(), а не через экземпляр',
    'latest() возвращает последнюю запись в виде строки'
  ];
  var result = logger.latest();
  console.log(result);
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
      if (!title) title = 'oop.js';
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