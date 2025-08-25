// Cấu hình hệ thống
const CONFIG = {
    // Thông tin hệ thống
    SYSTEM_NAME: 'Hệ thống Quản lý Linh kiện',
    SYSTEM_VERSION: '2.1.0',
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
    },
    
    // Cấu hình giao diện
    UI: {
        theme: 'light',
        primaryColor: '#2563eb',
        secondaryColor: '#10b981',
        accentColor: '#f59e0b',
        borderRadius: '0.75rem',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
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
    },
    
    // Tạo gradient CSS
    createGradient: (startColor, endColor, direction = '135deg') => {
        return `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`;
    },
    
    // Tạo shadow CSS
    createShadow: (shadowType = 'md') => {
        return CONFIG.UI.shadows[shadowType] || CONFIG.UI.shadows.md;
    },
    
    // Format số
    formatNumber: (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },
    
    // Format ngày
    formatDate: (date) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('vi-VN', options);
    },
    
    // Tạo ID duy nhất
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Khởi tạo hệ thống
const SYSTEM = {
    init: () => {
        // Load font Inter
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        
        // Thêm CSS variables vào root
        document.documentElement.style.setProperty('--font-family', CONFIG.UI.fontFamily);
        document.documentElement.style.setProperty('--primary-color', CONFIG.UI.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', CONFIG.UI.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', CONFIG.UI.accentColor);
        document.documentElement.style.setProperty('--border-radius', CONFIG.UI.borderRadius);
        
        console.log(`${CONFIG.SYSTEM_NAME} v${CONFIG.SYSTEM_VERSION} đã được khởi tạo`);
    }
};

// Tự động khởi tạo khi DOM sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SYSTEM.init);
} else {
    SYSTEM.init();
}

// Export cho sử dụng
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, UTILS, SYSTEM };
} 