// Hệ thống đăng nhập duy nhất cho mỗi máy
class LoginSystem {
    constructor() {
        this.init();
    }

    init() {
        this.uniqueUser = JSON.parse(localStorage.getItem('uniqueUser'));
        this.renderForm();
    }

    renderForm() {
        const loginForm = document.getElementById('loginForm');
        loginForm.innerHTML = '';
        if (!this.uniqueUser) {
            // Hiển thị form tạo tài khoản + nút Đăng nhập
            loginForm.innerHTML = `
                <div id="registerSection">
                    <div class="form-group">
                        <div class="input-icon">
                            <i class="fas fa-user"></i>
                            <input type="text" id="newUsername" placeholder="Tên đăng nhập" required>
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
                    <div style="display: flex; gap: 10px;">
                        <button type="button" class="login-btn" id="createAccountBtn" style="flex:1;">Tạo tài khoản</button>
                        <button type="button" class="login-btn" id="showLoginBtn" style="flex:1; background: #fff; color: #4a4a4a; border: 1px solid #bbb;">Đăng nhập</button>
                    </div>
                </div>
            `;
            document.getElementById('createAccountBtn').addEventListener('click', () => this.handleCreateAccount());
            document.getElementById('showLoginBtn').addEventListener('click', () => this.renderLoginFormForExisting());
        } else {
            // Đã có tài khoản, chỉ hiển thị form đăng nhập (không cho tạo lại)
            loginForm.innerHTML = `
                <div class="form-group">
                    <div class="input-icon">
                        <i class="fas fa-user"></i>
                        <input type="text" id="username" value="${this.uniqueUser.username}" disabled>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-icon">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="password" placeholder="Mật khẩu" required autofocus>
                    </div>
                </div>
                <button type="button" class="login-btn" id="loginBtn">Đăng nhập</button>
            `;
            document.getElementById('loginBtn').addEventListener('click', () => this.handleLogin());
        }
    }

    renderLoginFormForExisting() {
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
            <button type="button" class="login-btn" id="backToRegisterBtn" style="background: #fff; color: #4a4a4a; border: 1px solid #bbb; margin-top: 8px;">Quay lại tạo tài khoản</button>
        `;
        document.getElementById('loginBtn').addEventListener('click', () => this.handleLoginForExisting());
        document.getElementById('backToRegisterBtn').addEventListener('click', () => this.renderForm());
    }

    handleLoginForExisting() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        // Kiểm tra trong localStorage (uniqueUser)
        const user = JSON.parse(localStorage.getItem('uniqueUser'));
        if (!user) {
            this.showMessage('Không tìm thấy tài khoản trên máy này. Vui lòng tạo tài khoản mới!', 'error');
            return;
        }
        if (username === user.username && password === user.password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', user.displayName);
            localStorage.setItem('userRoles', JSON.stringify(['admin']));
            this.showMessage('Đăng nhập thành công! Đang chuyển hướng...', 'success');
            setTimeout(() => {
                window.location.href = 'app.html';
            }, 1000);
        } else {
            this.showMessage('Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
        }
    }

    handleCreateAccount() {
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const displayName = document.getElementById('newDisplayName').value.trim();
        if (!username || !password || !displayName) {
            this.showMessage('Vui lòng nhập đầy đủ thông tin!', 'error');
            return;
        }
        const user = {
            username,
            password,
            displayName,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('uniqueUser', JSON.stringify(user));
        this.uniqueUser = user;
        this.showMessage('Tạo tài khoản thành công! Vui lòng đăng nhập.', 'success');
        setTimeout(() => this.renderForm(), 800);
    }

    handleLogin() {
        const password = document.getElementById('password').value;
        if (!password) {
            this.showMessage('Vui lòng nhập mật khẩu!', 'error');
            return;
        }
        if (password === this.uniqueUser.password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', this.uniqueUser.displayName);
            localStorage.setItem('userRoles', JSON.stringify(['admin']));
            this.showMessage('Đăng nhập thành công! Đang chuyển hướng...', 'success');
            setTimeout(() => {
                window.location.href = 'app.html';
            }, 1000);
        } else {
            this.showMessage('Mật khẩu không đúng!', 'error');
        }
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

// Khởi tạo hệ thống đăng nhập duy nhất
let loginSystem;
document.addEventListener('DOMContentLoaded', () => {
    loginSystem = new LoginSystem();
}); 