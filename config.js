// Cấu hình hệ thống
const CONFIG = {
    // Thông tin hệ thống
    SYSTEM_NAME: 'Hệ thống Quản lý Linh kiện',
    SYSTEM_VERSION: '2.0.0',
    SYSTEM_DESCRIPTION: 'Quản lý và sắp xếp linh kiện một cách hiệu quả',
    
    // Đường link chính
    BASE_URL: window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, ''),
    LOGIN_URL: 'login.html',
    DASHBOARD_URL: 'app.html',
    
    // Cấu hình vai trò
    ROLES: {
        ADMIN: 'admin',
        PREPARER: 'preparer',
        INSPECTOR: 'inspector'
    },
    
    // Nhãn vai trò
    ROLE_LABELS: {
        'admin': 'Quản trị viên',
        'preparer': 'Người soạn linh kiện',
        'inspector': 'Người kiểm tra linh kiện'
    },
    
    // Màu sắc cho vai trò
    ROLE_COLORS: {
        'admin': '#dc3545',
        'preparer': '#007bff',
        'inspector': '#28a745'
    },
    
    // Cấu hình giao diện theo vai trò
    ROLE_INTERFACES: {
        'preparer': {
            title: 'Hệ thống Soạn Linh kiện',
            icon: 'fas fa-tools',
            description: 'Nhập và quản lý linh kiện cần soạn',
            showAddButtons: true,
            showEditButtons: true,
            showDeleteButtons: false
        },
        'inspector': {
            title: 'Hệ thống Kiểm tra Linh kiện',
            icon: 'fas fa-search',
            description: 'Kiểm tra và xác nhận linh kiện đã soạn',
            showAddButtons: false,
            showEditButtons: false,
            showDeleteButtons: false
        },
        'admin': {
            title: 'Hệ thống Quản lý Linh kiện',
            icon: 'fas fa-microchip',
            description: 'Quản lý và sắp xếp linh kiện một cách hiệu quả',
            showAddButtons: true,
            showEditButtons: true,
            showDeleteButtons: true
        }
    }
};

// Hàm tiện ích
const UTILS = {
    // Lấy thông tin vai trò
    getRoleInfo: (role) => {
        return {
            label: CONFIG.ROLE_LABELS[role] || role,
            color: CONFIG.ROLE_COLORS[role] || '#666',
            interface: CONFIG.ROLE_INTERFACES[role] || CONFIG.ROLE_INTERFACES.admin
        };
    },
    
    // Kiểm tra quyền
    hasRole: (userRoles, requiredRole) => {
        if (!userRoles) return false;
        if (Array.isArray(userRoles)) {
            return userRoles.includes(requiredRole);
        }
        return userRoles === requiredRole;
    },
    
    // Kiểm tra có bất kỳ vai trò nào
    hasAnyRole: (userRoles, requiredRoles) => {
        if (!userRoles) return false;
        if (Array.isArray(userRoles)) {
            return requiredRoles.some(role => userRoles.includes(role));
        }
        return requiredRoles.includes(userRoles);
    }
};

// Export cho sử dụng
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, UTILS };
} 