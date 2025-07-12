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
    },
    
    // Cấu hình chia sẻ
    SHARE: {
        title: 'Hệ thống Quản lý Linh kiện',
        description: 'Quản lý và sắp xếp linh kiện một cách hiệu quả',
        url: window.location.href,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY3ZWVhO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTI7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2ZyB4PSI1MDAiIHk9IjMwMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LTggMC00LjQxIDMuNTktOCA4LTggNC40MSAwIDggMy41OSA4IDggMCA0LjQxLTMuNTkgOC04IDh6bTAtMTRjLTMuMzEgMC02IDIuNjktNiA2czIuNjkgNiA2IDYgNi0yLjY5IDYtNi0yLjY5LTYtNi02em0wIDEwYy0yLjIxIDAtNC0xLjc5LTQtNHMxLjc5LTQgNC00IDQgMS43OSA0IDQtMS43OSA0LTQgNHoiLz4KPC9zdmc+Cjwvc3ZnPgo='
    }
};

// Hàm tiện ích
const UTILS = {
    // Tạo URL chia sẻ
    createShareUrl: (path = '') => {
        const baseUrl = CONFIG.BASE_URL;
        return path ? `${baseUrl}/${path}` : baseUrl;
    },
    
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
    
    // Tạo meta tags cho chia sẻ
    createMetaTags: () => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.setAttribute('content', CONFIG.SHARE.title);
        document.head.appendChild(meta);
        
        const metaDesc = document.createElement('meta');
        metaDesc.setAttribute('property', 'og:description');
        metaDesc.setAttribute('content', CONFIG.SHARE.description);
        document.head.appendChild(metaDesc);
        
        const metaUrl = document.createElement('meta');
        metaUrl.setAttribute('property', 'og:url');
        metaUrl.setAttribute('content', CONFIG.SHARE.url);
        document.head.appendChild(metaUrl);
        
        const metaImage = document.createElement('meta');
        metaImage.setAttribute('property', 'og:image');
        metaImage.setAttribute('content', CONFIG.SHARE.image);
        document.head.appendChild(metaImage);
    }
};

// Export cho sử dụng
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, UTILS };
} 