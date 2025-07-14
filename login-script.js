// Hệ thống đăng nhập nhiều tài khoản trên một máy
class LoginSystem {
    constructor() {
        this.init();
    }

    init() {
        this.renderLoginForm();
    }

    // Hiển thị form đăng nhập
    renderLoginForm() {
        const loginForm = document.getElementById('loginForm');
        loginForm.innerHTML = `
            <div class="form-group">
                <div class="input-icon">
                    <i class="fas fa-user"></i>
                    <input type="text" id="username" placeholder="Tên đăng nhập" required autofocus>
                </div>
            </div>
            <div class="form-group">
                <div class="input-icon">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="password" placeholder="Mật khẩu" required>
                </div>
            </div>
            <button type="button" class="login-btn" id="loginBtn">Đăng nhập</button>
            <button type="button" class="login-btn" id="showRegisterBtn" style="background: #fff; color: #4a4a4a; border: 1px solid #bbb; margin-top: 8px;">Đăng ký tài khoản mới</button>
        `;
        document.getElementById('loginBtn').addEventListener('click', () => this.handleLogin());
        document.getElementById('showRegisterBtn').addEventListener('click', () => this.renderRegisterForm());
    }

    // Hiển thị form đăng ký
    renderRegisterForm() {
        const loginForm = document.getElementById('loginForm');
        loginForm.innerHTML = `
            <div class="form-group">
                <div class="input-icon">
                    <i class="fas fa-user"></i>
                    <input type="text" id="newUsername" placeholder="Tên đăng nhập" required autofocus>
                </div>
            </div>
            <div class="form-group">
                <div class="input-icon">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="newPassword" placeholder="Mật khẩu" required>
                </div>
            </div>
            <div class="form-group">
                <div class="input-icon">
                    <i class="fas fa-id-card"></i>
                    <input type="text" id="newDisplayName" placeholder="Tên hiển thị" required>
                </div>
            </div>
            <button type="button" class="login-btn" id="registerBtn">Đăng ký</button>
            <button type="button" class="login-btn" id="backToLoginBtn" style="background: #fff; color: #4a4a4a; border: 1px solid #bbb; margin-top: 8px;">Quay lại đăng nhập</button>
        `;
        document.getElementById('registerBtn').addEventListener('click', () => this.handleRegister());
        document.getElementById('backToLoginBtn').addEventListener('click', () => this.renderLoginForm());
    }

    // Xử lý đăng nhập
    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        if (!username || !password) {
            this.showMessage('Vui lòng nhập đầy đủ thông tin!', 'error');
            return;
        }
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === username);
        const user = users[userIndex];
        if (!user || user.password !== password) {
            this.showMessage('Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
            return;
        }
        // Lưu lịch sử đăng nhập
        const now = new Date().toISOString();
        if (!user.firstLogin) user.firstLogin = now;
        user.lastLogin = now;
        user.loginCount = (user.loginCount || 0) + 1;
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', user.displayName);
        localStorage.setItem('userRoles', JSON.stringify(user.roles || ['admin']));
        this.showMessage('Đăng nhập thành công! Đang chuyển hướng...', 'success');
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 1000);
    }

    // Xử lý đăng ký
    handleRegister() {
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const displayName = document.getElementById('newDisplayName').value.trim();
        if (!username || !password || !displayName) {
            this.showMessage('Vui lòng nhập đầy đủ thông tin!', 'error');
            return;
        }
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.username === username)) {
            this.showMessage('Tên đăng nhập đã tồn tại!', 'error');
            return;
        }
        const user = {
            username,
            password,
            displayName,
            roles: ['admin'],
            createdAt: new Date().toISOString()
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        this.showMessage('Đăng ký thành công! Bạn có thể đăng nhập.', 'success');
        setTimeout(() => this.renderLoginForm(), 800);
    }

    showMessage(msg, type) {
        const messageModal = document.getElementById('messageModal');
        const messageTitle = document.getElementById('messageTitle');
        const messageText = document.getElementById('messageText');
        messageTitle.textContent = type === 'error' ? 'Lỗi' : 'Thông báo';
        messageText.textContent = msg;
        messageModal.style.display = 'block';
        document.getElementById('messageOkBtn').onclick = () => {
            messageModal.style.display = 'none';
        };
    }
}

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwWKWkD3qiPxmsJ9Z8TUfonC_SMxyJIMef1PkwYQAPU5co6fglt2DtPDAG0b2JOwsnhIg/exec';

// Hàm đăng ký tài khoản
function register(username, password) {
  fetch(`${SCRIPT_URL}?action=register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Đăng ký thành công!');
    } else {
      alert('Lỗi: ' + data.message);
    }
  })
  .catch(err => alert('Lỗi kết nối: ' + err));
}

// Hàm đăng nhập
function login(username, password) {
  fetch(`${SCRIPT_URL}?action=login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Đăng nhập thành công!');
      // Thực hiện chuyển trang hoặc lưu trạng thái đăng nhập tại đây nếu muốn
    } else {
      alert('Sai tài khoản hoặc mật khẩu!');
    }
  })
  .catch(err => alert('Lỗi kết nối: ' + err));
}

// Gắn sự kiện submit cho form đăng ký
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    register(username, password);
  });
}

// Gắn sự kiện submit cho form đăng nhập
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    login(username, password);
  });
}

// Khởi tạo hệ thống đăng nhập nhiều tài khoản
let loginSystem;
document.addEventListener('DOMContentLoaded', () => {
    loginSystem = new LoginSystem();
}); 