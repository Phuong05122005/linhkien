// Hệ thống đăng nhập
class LoginSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkRememberedUser();
    }

    setupEventListeners() {
        // Form đăng nhập
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');

        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        togglePassword.addEventListener('click', () => this.togglePasswordVisibility());

        // Modal
        const messageModal = document.getElementById('messageModal');
        const closeBtn = messageModal.querySelector('.close');
        const okBtn = document.getElementById('messageOkBtn');

        closeBtn.addEventListener('click', () => this.closeMessageModal());
        okBtn.addEventListener('click', () => this.closeMessageModal());

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === messageModal) {
                this.closeMessageModal();
            }
        });

        // Enter key to submit
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!username || !password) {
            this.showMessage('Vui lòng nhập đầy đủ thông tin đăng nhập!', 'error');
            return;
        }

        // Hiển thị loading
        this.showLoading(true);

        // Giả lập delay đăng nhập
        setTimeout(() => {
            if (this.authenticateUser(username, password)) {
                // Lưu thông tin đăng nhập nếu chọn "Ghi nhớ"
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Lưu thông tin người dùng hiện tại
                const users = this.getUsers();
                const user = users.find(u => u.username === username);
                localStorage.setItem('currentUser', user.displayName);
                localStorage.setItem('userRoles', JSON.stringify(user.roles));
                localStorage.setItem('isLoggedIn', 'true');

                this.showMessage('Đăng nhập thành công! Đang chuyển hướng...', 'success');
                
                // Chuyển hướng sau 1 giây
                setTimeout(() => {
                    window.location.href = 'app.html';
                }, 1000);
            } else {
                this.showMessage('Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
                this.showLoading(false);
            }
        }, 1000);
    }

    getUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        return users;
    }

    getDefaultUsers() {
        return [
            {
                username: 'admin',
                password: 'admin123',
                displayName: 'Quản trị viên',
                roles: ['admin'],
                createdAt: new Date('2024-01-01').toISOString()
            },
            {
                username: 'preparer1',
                password: 'prep123',
                displayName: 'Nguyễn Văn An',
                roles: ['preparer'],
                createdAt: new Date('2024-01-15').toISOString()
            },
            {
                username: 'inspector1',
                password: 'insp123',
                displayName: 'Trần Thị Bình',
                roles: ['inspector'],
                createdAt: new Date('2024-01-20').toISOString()
            },
            {
                username: 'manager1',
                password: 'mgr123',
                displayName: 'Lê Văn Cường',
                roles: ['preparer', 'inspector'],
                createdAt: new Date('2024-01-25').toISOString()
            }
        ];
    }

    authenticateUser(username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username);
        return user && user.password === password;
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.getElementById('togglePassword');
        const icon = toggleBtn.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    showLoading(show) {
        const loginBtn = document.querySelector('.login-btn');
        if (show) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }

    showMessage(message, type = 'info') {
        const modal = document.getElementById('messageModal');
        const title = document.getElementById('messageTitle');
        const text = document.getElementById('messageText');

        // Set title và icon theo loại message
        switch (type) {
            case 'success':
                title.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745;"></i> Thành công';
                break;
            case 'error':
                title.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #dc3545;"></i> Lỗi';
                break;
            case 'warning':
                title.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #ffc107;"></i> Cảnh báo';
                break;
            default:
                title.innerHTML = '<i class="fas fa-info-circle" style="color: #17a2b8;"></i> Thông báo';
        }

        text.textContent = message;
        modal.style.display = 'block';
    }

    closeMessageModal() {
        const modal = document.getElementById('messageModal');
        modal.style.display = 'none';
    }

    checkRememberedUser() {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            document.getElementById('username').value = rememberedUser;
            document.getElementById('rememberMe').checked = true;
        }
    }
}

// Hàm global để điền tài khoản demo (ẩn - chỉ dùng cho phát triển)
function fillDemoAccount(username, password) {
    // Ẩn chức năng này trong môi trường production
    console.log('Demo account function disabled for security');
}

// Khởi tạo hệ thống đăng nhập
let loginSystem;
document.addEventListener('DOMContentLoaded', () => {
    loginSystem = new LoginSystem();
}); 