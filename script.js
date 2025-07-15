// Khởi tạo ứng dụng
class ComponentManager {
    constructor() {
        this.components = JSON.parse(localStorage.getItem('components')) || [];
        this.categories = JSON.parse(localStorage.getItem('categories')) || [
            'Điện tử', 'Cơ khí', 'Máy tính', 'Điện thoại', 'Khác'
        ];
        this.currentEditId = null;
        this.currentDeleteId = null;
        this.currentStatusTab = 'pending'; // Tab hiện tại: pending, checked, all
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.updateCategoryDropdowns(); // Cập nhật dropdown chủ đề
        this.renderComponents();
        this.updateStats();
        this.updateUserDisplay();
        this.loadSampleData();
        this.checkUserRoles();
        
        // Ẩn bảng linh kiện mặc định vì tab mặc định là 'pending'
        document.getElementById('componentsGrid').style.display = 'none';
    }

    checkAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return;
        }
    }

    setupEventListeners() {
        // Modal controls
        const addBtn = document.getElementById('addComponentBtn');
        const quickAddBtn = document.getElementById('quickAddBtn');
        const modal = document.getElementById('componentModal');
        const quickAddModal = document.getElementById('quickAddModal');
        const closeBtn = modal.querySelector('.close');
        const quickCloseBtn = quickAddModal.querySelector('.close');
        const cancelBtn = document.getElementById('cancelBtn');
        const cancelQuickBtn = document.getElementById('cancelQuickBtn');
        const form = document.getElementById('componentForm');
        const quickForm = document.getElementById('quickAddForm');

        addBtn.addEventListener('click', () => this.openModal());
        quickAddBtn.addEventListener('click', () => this.openQuickAddModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        quickCloseBtn.addEventListener('click', () => this.closeQuickAddModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        cancelQuickBtn.addEventListener('click', () => this.closeQuickAddModal());
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        quickForm.addEventListener('submit', (e) => this.handleQuickFormSubmit(e));

        // Image upload functionality
        this.setupImageUpload();

        // User setup modal
        const userSetupCard = document.getElementById('userSetupCard');
        const userSetupModal = document.getElementById('userSetupModal');
        const userSetupCloseBtn = userSetupModal.querySelector('.close');
        const cancelUserSetupBtn = document.getElementById('cancelUserSetupBtn');
        const userSetupForm = document.getElementById('userSetupForm');

        userSetupCard.addEventListener('click', () => this.openUserSetupModal());
        userSetupCloseBtn.addEventListener('click', () => this.closeUserSetupModal());
        cancelUserSetupBtn.addEventListener('click', () => this.closeUserSetupModal());
        userSetupForm.addEventListener('submit', (e) => this.handleUserSetupSubmit(e));

        // Delete modal
        const deleteModal = document.getElementById('deleteModal');
        const deleteCloseBtn = deleteModal.querySelector('.close');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

        deleteCloseBtn.addEventListener('click', () => this.closeDeleteModal());
        cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
        confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());

        // Search and filter
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');

        searchInput.addEventListener('input', () => this.filterComponents());
        
        // Search clear functionality
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            this.filterComponents();
        });
        
        // Show/hide search clear button
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                searchClear.classList.add('show');
            } else {
                searchClear.classList.remove('show');
            }
        });

        // Multi-category filter as modal
        const categoryFilterBtn = document.getElementById('categoryFilterBtn');
        const categoryFilterModal = document.getElementById('categoryFilterModal');
        const closeCategoryFilterModal = document.getElementById('closeCategoryFilterModal');
        const applyCategoryFilter = document.getElementById('applyCategoryFilter');
        const cancelCategoryFilter = document.getElementById('cancelCategoryFilter');
        const selectAllCategories = document.getElementById('selectAllCategories');
        const categoryCheckboxes = document.getElementById('categoryCheckboxes');

        categoryFilterBtn.addEventListener('click', () => {
            categoryFilterModal.style.display = 'block';
        });
        closeCategoryFilterModal.addEventListener('click', () => {
            categoryFilterModal.style.display = 'none';
        });
        cancelCategoryFilter.addEventListener('click', () => {
            categoryFilterModal.style.display = 'none';
        });
        // Select all logic
        selectAllCategories.addEventListener('click', () => {
            const checkboxes = categoryCheckboxes.querySelectorAll('input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
            });
            selectAllCategories.textContent = allChecked ? 'Chọn tất cả' : 'Bỏ chọn tất cả';
        });
        // Áp dụng filter
        applyCategoryFilter.addEventListener('click', () => {
            this.applyMultiCategoryFilter();
            categoryFilterModal.style.display = 'none';
        });
        // Đóng modal khi click ra ngoài
        window.addEventListener('click', (e) => {
            if (e.target === categoryFilterModal) categoryFilterModal.style.display = 'none';
        });

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', () => this.logout());

        // User management
        const manageUsersBtn = document.getElementById('manageUsersBtn');
        const userManagementModal = document.getElementById('userManagementModal');
        const userFormModal = document.getElementById('userFormModal');
        const addUserBtn = document.getElementById('addUserBtn');
        const userForm = document.getElementById('userForm');
        const cancelUserFormBtn = document.getElementById('cancelUserFormBtn');

        manageUsersBtn.addEventListener('click', () => this.openUserManagementModal());
        addUserBtn.addEventListener('click', () => this.openUserFormModal());
        userForm.addEventListener('submit', (e) => this.handleUserFormSubmit(e));
        cancelUserFormBtn.addEventListener('click', () => this.closeUserFormModal());

        // Password generation
        const generateAllPasswordsBtn = document.getElementById('generateAllPasswordsBtn');
        const generateAllPasswordsModal = document.getElementById('generateAllPasswordsModal');
        const passwordResultsModal = document.getElementById('passwordResultsModal');
        const cancelGeneratePasswordsBtn = document.getElementById('cancelGeneratePasswordsBtn');
        const confirmGeneratePasswordsBtn = document.getElementById('confirmGeneratePasswordsBtn');
        const closePasswordResultsBtn = document.getElementById('closePasswordResultsBtn');
        const copyPasswordsBtn = document.getElementById('copyPasswordsBtn');
        const downloadPasswordsBtn = document.getElementById('downloadPasswordsBtn');

        generateAllPasswordsBtn.addEventListener('click', () => this.openGenerateAllPasswordsModal());
        cancelGeneratePasswordsBtn.addEventListener('click', () => this.closeGenerateAllPasswordsModal());
        confirmGeneratePasswordsBtn.addEventListener('click', () => this.generateAllPasswords());
        closePasswordResultsBtn.addEventListener('click', () => this.closePasswordResultsModal());
        copyPasswordsBtn.addEventListener('click', () => this.copyPasswordsList());
        downloadPasswordsBtn.addEventListener('click', () => this.downloadPasswordsCSV());

        // Category management
        const manageCategoriesBtn = document.getElementById('manageCategoriesBtn');
        const categoryManagementModal = document.getElementById('categoryManagementModal');
        const addCategoryBtn = document.getElementById('addCategoryBtn');
        const newCategoryName = document.getElementById('newCategoryName');

        manageCategoriesBtn.addEventListener('click', () => this.openCategoryManagementModal());
        addCategoryBtn.addEventListener('click', () => this.addCategory());
        newCategoryName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addCategory();
            }
        });

        // Close modals
        const userManagementCloseBtn = userManagementModal.querySelector('.close');
        const userFormCloseBtn = userFormModal.querySelector('.close');
        const categoryManagementCloseBtn = categoryManagementModal.querySelector('.close');
        const generateAllPasswordsCloseBtn = generateAllPasswordsModal.querySelector('.close');
        const passwordResultsCloseBtn = passwordResultsModal.querySelector('.close');

        userManagementCloseBtn.addEventListener('click', () => this.closeUserManagementModal());
        userFormCloseBtn.addEventListener('click', () => this.closeUserFormModal());
        categoryManagementCloseBtn.addEventListener('click', () => this.closeCategoryManagementModal());
        generateAllPasswordsCloseBtn.addEventListener('click', () => this.closeGenerateAllPasswordsModal());
        passwordResultsCloseBtn.addEventListener('click', () => this.closePasswordResultsModal());

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
            if (e.target === quickAddModal) this.closeQuickAddModal();
            if (e.target === userSetupModal) this.closeUserSetupModal();
            if (e.target === userManagementModal) this.closeUserManagementModal();
            if (e.target === userFormModal) this.closeUserFormModal();
            if (e.target === categoryManagementModal) this.closeCategoryManagementModal();
            if (e.target === generateAllPasswordsModal) this.closeGenerateAllPasswordsModal();
            if (e.target === passwordResultsModal) this.closePasswordResultsModal();
            if (e.target === deleteModal) this.closeDeleteModal();
        });

        // Share functionality
        const shareBtn = document.getElementById('shareBtn');
        const shareModal = document.getElementById('shareModal');
        const shareCloseBtn = shareModal.querySelector('.close');

        shareBtn.addEventListener('click', () => this.showShareModal());
        shareCloseBtn.addEventListener('click', () => this.closeShareModal());

        // Share buttons
        document.getElementById('copyLinkBtn').addEventListener('click', () => this.copyShareLink());
        document.getElementById('shareFacebookBtn').addEventListener('click', () => this.shareToFacebook());
        document.getElementById('shareTwitterBtn').addEventListener('click', () => this.shareToTwitter());
        document.getElementById('shareLinkedInBtn').addEventListener('click', () => this.shareToLinkedIn());
        document.getElementById('shareEmailBtn').addEventListener('click', () => this.shareViaEmail());

        // Close share modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === shareModal) this.closeShareModal();
        });

        // Status tabs
        const pendingTab = document.getElementById('pendingTab');
        const checkedTab = document.getElementById('checkedTab');
        const allTab = document.getElementById('allTab');

        pendingTab.addEventListener('click', () => this.switchToTab('pending'));
        checkedTab.addEventListener('click', () => this.switchToTab('checked'));
        allTab.addEventListener('click', () => this.switchToTab('all'));

        // Mobile navigation
        this.setupMobileNavigation();

        // Quản lý tài khoản đăng nhập
        const accountManagerBtn = document.getElementById('accountManagerBtn');
        const accountManagerModal = document.getElementById('accountManagerModal');
        const closeAccountManagerModal = document.getElementById('closeAccountManagerModal');
        if (accountManagerBtn && accountManagerModal && closeAccountManagerModal) {
            accountManagerBtn.addEventListener('click', () => this.openAccountManagerModal());
            closeAccountManagerModal.addEventListener('click', () => accountManagerModal.style.display = 'none');
        }

        // Sự kiện thêm chủ đề
        if (addCategoryBtn) {
            addCategoryBtn.addEventListener('click', () => this.addCategory());
        }
    }

    openModal(component = null) {
        const modal = document.getElementById('componentModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('componentForm');

        if (component) {
            // Edit mode
            this.currentEditId = component.id;
            modalTitle.textContent = 'Sửa Linh kiện';
            this.fillForm(component);
        } else {
            // Add mode
            this.currentEditId = null;
            modalTitle.textContent = 'Thêm Linh kiện Mới';
            this.resetForm();
            this.updateComponentInfo();
        }

        modal.style.display = 'block';
        document.getElementById('componentName').focus();
    }

    closeModal() {
        const modal = document.getElementById('componentModal');
        modal.style.display = 'none';
        this.currentEditId = null;
        this.resetImageUpload();
    }

    setupImageUpload() {
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imageInput = document.getElementById('componentImage');
        const imagePreview = document.getElementById('imagePreview');
        const uploadPlaceholder = document.getElementById('uploadPlaceholder');
        const imageControls = document.getElementById('imageControls');
        const changeImageBtn = document.getElementById('changeImageBtn');
        const removeImageBtn = document.getElementById('removeImageBtn');

        // Click to upload
        imageUploadArea.addEventListener('click', () => {
            if (!imageInput.files.length) {
                imageInput.click();
            }
        });

        // File input change
        imageInput.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0]);
        });

        // Drag and drop
        imageUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadArea.classList.add('dragover');
        });

        imageUploadArea.addEventListener('dragleave', () => {
            imageUploadArea.classList.remove('dragover');
        });

        imageUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageUpload(file);
            }
        });

        // Image controls
        changeImageBtn.addEventListener('click', () => {
            imageInput.click();
        });

        removeImageBtn.addEventListener('click', () => {
            this.removeImage();
        });
    }

    handleImageUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showMessage('Vui lòng chọn file hình ảnh hợp lệ!', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            this.showMessage('Kích thước file không được vượt quá 5MB!', 'error');
            return;
        }

        const reader = new FileReader();
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imagePreview = document.getElementById('imagePreview');
        const uploadPlaceholder = document.getElementById('uploadPlaceholder');
        const imageControls = document.getElementById('imageControls');

        imageUploadArea.classList.add('loading');

        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            imageControls.style.display = 'flex';
            imageUploadArea.classList.remove('loading');
            
            // Store image data
            this.currentImageData = e.target.result;
        };

        reader.onerror = () => {
            imageUploadArea.classList.remove('loading');
            this.showMessage('Không thể đọc file hình ảnh!', 'error');
        };

        reader.readAsDataURL(file);
    }

    removeImage() {
        const imagePreview = document.getElementById('imagePreview');
        const uploadPlaceholder = document.getElementById('uploadPlaceholder');
        const imageControls = document.getElementById('imageControls');
        const imageInput = document.getElementById('componentImage');

        imagePreview.style.display = 'none';
        uploadPlaceholder.style.display = 'block';
        imageControls.style.display = 'none';
        imageInput.value = '';
        this.currentImageData = null;
    }

    resetImageUpload() {
        this.removeImage();
    }

    resetForm() {
        const form = document.getElementById('componentForm');
        form.reset();
        this.resetImageUpload();
        this.currentImageData = null;
    }

    updateComponentInfo() {
        const creationDate = document.getElementById('creationDate');
        const componentCode = document.getElementById('componentCode');
        
        creationDate.textContent = new Date().toLocaleDateString('vi-VN');
        componentCode.textContent = 'LK' + Date.now().toString().slice(-6);
    }

    openQuickAddModal() {
        const modal = document.getElementById('quickAddModal');
        const form = document.getElementById('quickAddForm');
        
        // Reset form
        form.reset();
        
        // Tự động điền tên người dùng hiện tại nếu có
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            document.getElementById('quickComponentPreparer').value = currentUser;
        }
        
        modal.style.display = 'block';
        document.getElementById('quickComponentName').focus();
    }

    closeQuickAddModal() {
        const modal = document.getElementById('quickAddModal');
        modal.style.display = 'none';
    }

    openUserSetupModal() {
        const modal = document.getElementById('userSetupModal');
        const userNameInput = document.getElementById('userName');
        
        // Điền tên hiện tại nếu có
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            userNameInput.value = currentUser;
        }
        
        modal.style.display = 'block';
        userNameInput.focus();
    }

    closeUserSetupModal() {
        const modal = document.getElementById('userSetupModal');
        modal.style.display = 'none';
    }

    handleUserSetupSubmit(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        localStorage.setItem('currentUser', userName);
        
        // Cập nhật hiển thị
        this.updateUserDisplay();
        this.closeUserSetupModal();
        this.showMessage('Tên người dùng đã được lưu thành công!', 'success');
    }

    fillForm(component) {
        document.getElementById('componentName').value = component.name;
        document.getElementById('componentCategory').value = component.category;
        document.getElementById('componentQuantity').value = component.quantity;
        document.getElementById('componentPriority').value = component.priority || 'Trung bình';
        document.getElementById('componentPreparer').value = component.preparer;
        document.getElementById('componentInspector').value = component.inspector;
        document.getElementById('componentDescription').value = component.description || '';
        document.getElementById('componentLocation').value = component.location || '';

        // Load image if exists
        if (component.image) {
            this.currentImageData = component.image;
            const imagePreview = document.getElementById('imagePreview');
            const uploadPlaceholder = document.getElementById('uploadPlaceholder');
            const imageControls = document.getElementById('imageControls');
            
            imagePreview.src = component.image;
            imagePreview.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            imageControls.style.display = 'flex';
        } else {
            this.resetImageUpload();
        }

        // Update component info
        const creationDate = document.getElementById('creationDate');
        const componentCode = document.getElementById('componentCode');
        
        creationDate.textContent = component.createdAt ? new Date(component.createdAt).toLocaleDateString('vi-VN') : 'Hôm nay';
        componentCode.textContent = component.id || 'LK' + Date.now().toString().slice(-6);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('componentName').value.trim(),
            category: document.getElementById('componentCategory').value,
            quantity: parseInt(document.getElementById('componentQuantity').value),
            priority: document.getElementById('componentPriority').value,
            preparer: document.getElementById('componentPreparer').value.trim(),
            inspector: document.getElementById('componentInspector').value.trim(),
            description: document.getElementById('componentDescription').value.trim(),
            location: document.getElementById('componentLocation').value.trim(),
            image: this.currentImageData || null
        };

        if (this.currentEditId) {
            this.updateComponent(this.currentEditId, formData);
        } else {
            this.addComponent(formData);
        }

        this.closeModal();
    }

    handleQuickFormSubmit(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('quickComponentName').value.trim(),
            category: document.getElementById('quickComponentCategory').value,
            quantity: parseInt(document.getElementById('quickComponentQuantity').value),
            preparer: document.getElementById('quickComponentPreparer').value.trim(),
            inspector: document.getElementById('quickComponentInspector').value.trim(),
            description: '' // Không có mô tả trong form thêm nhanh
        };

        // Lưu tên người dùng hiện tại để sử dụng lần sau
        localStorage.setItem('currentUser', formData.preparer);

        this.addComponent(formData);
        this.closeQuickAddModal();
    }

    addComponent(data) {
        const component = {
            id: Date.now().toString(),
            ...data,
            status: 'pending', // Trạng thái: pending (chờ kiểm tra), checked (đã kiểm tra)
            checkedAt: null, // Thời gian kiểm tra
            checkedBy: null, // Người kiểm tra
            createdAt: new Date().toISOString()
        };

        this.components.push(component);
        this.saveToStorage();
        this.renderComponents();
        this.updateStats();
        this.showMessage('Linh kiện đã được thêm thành công!', 'success');
    }

    updateComponent(id, data) {
        const index = this.components.findIndex(c => c.id === id);
        if (index !== -1) {
            this.components[index] = {
                ...this.components[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage();
            this.renderComponents();
            this.updateStats();
            this.showMessage('Linh kiện đã được cập nhật thành công!', 'success');
        }
    }

    deleteComponent(id) {
        const component = this.components.find(c => c.id === id);
        if (component) {
            document.getElementById('deleteComponentName').textContent = component.name;
            this.currentDeleteId = id;
            document.getElementById('deleteModal').style.display = 'block';
        }
    }

    confirmDelete() {
        if (this.currentDeleteId) {
            this.components = this.components.filter(c => c.id !== this.currentDeleteId);
            this.saveToStorage();
            this.renderComponents();
            this.updateStats();
            this.showMessage('Linh kiện đã được xóa thành công!', 'success');
            this.closeDeleteModal();
        }
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        this.currentDeleteId = null;
    }

    filterComponents() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        let filtered = this.components.filter(component => {
            const matchesSearch = component.name.toLowerCase().includes(searchTerm) ||
                                component.preparer.toLowerCase().includes(searchTerm) ||
                                component.inspector.toLowerCase().includes(searchTerm) ||
                                (component.description && component.description.toLowerCase().includes(searchTerm));
            
            const matchesCategory = !this.selectedCategories || 
                                  this.selectedCategories.length === 0 || 
                                  this.selectedCategories.includes(component.category);

            return matchesSearch && matchesCategory;
        });

        // Lọc theo trạng thái hiện tại
        filtered = this.filterByStatus(filtered);

        this.renderComponents(filtered);
    }

    filterByStatus(components) {
        switch (this.currentStatusTab) {
            case 'pending':
                return components.filter(c => c.status === 'pending' || !c.status);
            case 'checked':
                return components.filter(c => c.status === 'checked');
            case 'all':
                return components;
            default:
                return components;
        }
    }

    switchToTab(status) {
        this.currentStatusTab = status;
        
        // Cập nhật active tab
        document.querySelectorAll('.status-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        switch (status) {
            case 'pending':
                document.getElementById('pendingTab').classList.add('active');
                document.getElementById('componentsGrid').style.display = 'none';
                break;
            case 'checked':
                document.getElementById('checkedTab').classList.add('active');
                document.getElementById('componentsGrid').style.display = 'none';
                break;
            case 'all':
                document.getElementById('allTab').classList.add('active');
                document.getElementById('componentsGrid').style.display = 'block';
                break;
        }
        
        this.updateStatusCounts();
        this.filterComponents();
    }

    updateStatusCounts() {
        const pendingCount = this.components.filter(c => c.status === 'pending' || !c.status).length;
        const checkedCount = this.components.filter(c => c.status === 'checked').length;
        const allCount = this.components.length;

        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('checkedCount').textContent = checkedCount;
        document.getElementById('allCount').textContent = allCount;
    }

    renderComponents(componentsToRender = null) {
        const grid = document.getElementById('componentsGrid');
        const components = componentsToRender || this.components;

        if (components.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-microchip"></i>
                    <h3>Chưa có linh kiện nào</h3>
                    <p>Hãy thêm linh kiện đầu tiên để bắt đầu quản lý!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = components.map(component => this.createComponentCard(component)).join('');
    }

    createComponentCard(component) {
        const createdDate = new Date(component.createdAt).toLocaleDateString('vi-VN');
        const updatedDate = component.updatedAt ? 
            new Date(component.updatedAt).toLocaleDateString('vi-VN') : '';
        const checkedDate = component.checkedAt ? 
            new Date(component.checkedAt).toLocaleDateString('vi-VN') : '';

        const status = component.status || 'pending';
        const statusText = status === 'checked' ? 'Đã kiểm tra' : 'Chờ kiểm tra';
        const statusClass = status === 'checked' ? 'checked' : 'pending';

        const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
        const canCheck = userRoles.includes('inspector') || userRoles.includes('admin');
        const currentUser = localStorage.getItem('currentUser');

        const priority = component.priority || 'Trung bình';
        const priorityClass = this.getPriorityClass(priority);

        return `
            <div class="component-card">
                ${component.image ? `
                <div class="component-image">
                    <img src="${component.image}" alt="${this.escapeHtml(component.name)}" onclick="app.showImageModal('${component.image}', '${this.escapeHtml(component.name)}')">
                </div>
                ` : `
                <div class="component-image no-image">
                    <i class="fas fa-image"></i>
                </div>
                `}
                
                <div class="component-header">
                    <div>
                        <div class="component-name">
                            <span class="status-indicator ${statusClass}"></span>
                            ${this.escapeHtml(component.name)}
                        </div>
                        <div class="component-category">${this.escapeHtml(component.category)}</div>
                    </div>
                    <div class="header-badges">
                        <div class="status-badge ${statusClass}">${statusText}</div>
                        <div class="priority-badge ${priorityClass}">${priority}</div>
                    </div>
                </div>
                
                <div class="component-info">
                    <div class="info-row">
                        <span class="info-label">Số lượng:</span>
                        <span class="info-value">
                            <span class="quantity-badge">${component.quantity}</span>
                        </span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Người soạn:</span>
                        <span class="info-value">${this.escapeHtml(component.preparer)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Người kiểm tra:</span>
                        <span class="info-value">${this.escapeHtml(component.inspector)}</span>
                    </div>
                    ${component.location ? `
                    <div class="info-row">
                        <span class="info-label">Vị trí:</span>
                        <span class="info-value">${this.escapeHtml(component.location)}</span>
                    </div>
                    ` : ''}
                    <div class="info-row">
                        <span class="info-label">Ngày tạo:</span>
                        <span class="info-value">${createdDate}</span>
                    </div>
                    ${updatedDate ? `
                    <div class="info-row">
                        <span class="info-label">Cập nhật:</span>
                        <span class="info-value">${updatedDate}</span>
                    </div>
                    ` : ''}
                    ${checkedDate ? `
                    <div class="info-row">
                        <span class="info-label">Kiểm tra:</span>
                        <span class="info-value">${checkedDate} bởi ${this.escapeHtml(component.checkedBy || 'N/A')}</span>
                    </div>
                    ` : ''}
                </div>
                
                ${component.description ? `
                <div class="component-description">
                    "${this.escapeHtml(component.description)}"
                </div>
                ` : ''}
                
                <div class="component-actions">
                    ${status === 'pending' && canCheck ? `
                    <button class="btn-check" onclick="app.checkComponent('${component.id}')" ${currentUser === component.inspector ? '' : 'disabled'}>
                        <i class="fas fa-check"></i> Kiểm tra
                    </button>
                    ` : ''}
                    <button class="btn btn-edit" onclick="app.editComponent('${component.id}')">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button class="btn btn-delete" onclick="app.deleteComponent('${component.id}')">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `;
    }

    editComponent(id) {
        const component = this.components.find(c => c.id === id);
        if (component) {
            this.openModal(component);
        }
    }

    getPriorityClass(priority) {
        switch (priority) {
            case 'Thấp': return 'low';
            case 'Trung bình': return 'medium';
            case 'Cao': return 'high';
            case 'Khẩn cấp': return 'urgent';
            default: return 'medium';
        }
    }

    showImageModal(imageSrc, imageAlt) {
        // Tạo modal hiển thị hình ảnh lớn
        const modal = document.createElement('div');
        modal.className = 'modal image-modal';
        modal.innerHTML = `
            <div class="modal-content image-modal-content">
                <div class="modal-header">
                    <h3>${imageAlt}</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <img src="${imageSrc}" alt="${imageAlt}" class="full-size-image">
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';

        // Xử lý đóng modal
        const closeBtn = modal.querySelector('.close');
        const closeModal = () => {
            document.body.removeChild(modal);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    setupMobileNavigation() {
        const fab = document.getElementById('fab');
        const quickActions = document.getElementById('quickActions');
        const actionButtons = document.getElementById('actionButtons');
        
        // FAB click handler
        fab.addEventListener('click', () => {
            quickActions.classList.toggle('show');
            fab.style.transform = quickActions.classList.contains('show') ? 'rotate(45deg)' : 'rotate(0deg)';
        });
        
        // Quick action buttons
        const quickAddBtnMobile = document.getElementById('quickAddBtnMobile');
        const addComponentBtnMobile = document.getElementById('addComponentBtnMobile');
        const manageCategoriesBtnMobile = document.getElementById('manageCategoriesBtnMobile');
        
        quickAddBtnMobile.addEventListener('click', () => {
            this.openQuickAddModal();
            this.closeQuickActions();
        });
        
        addComponentBtnMobile.addEventListener('click', () => {
            this.openModal();
            this.closeQuickActions();
        });
        
        manageCategoriesBtnMobile.addEventListener('click', () => {
            this.openCategoryManagementModal();
            this.closeQuickActions();
        });
        
        // Close quick actions when clicking outside
        document.addEventListener('click', (e) => {
            if (!fab.contains(e.target) && !quickActions.contains(e.target)) {
                this.closeQuickActions();
            }
        });
        
        // Close quick actions when scrolling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            this.closeQuickActions();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Re-enable FAB after scroll stops
            }, 100);
        });
    }
    
    closeQuickActions() {
        const quickActions = document.getElementById('quickActions');
        const fab = document.getElementById('fab');
        
        quickActions.classList.remove('show');
        fab.style.transform = 'rotate(0deg)';
    }
    
    showLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);
        
        return overlay;
    }
    
    hideLoadingOverlay(overlay) {
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }

    // Bỏ setupMultiCategoryFilter khỏi init

    populateCategoryCheckboxes() {
        const categoryCheckboxes = document.getElementById('categoryCheckboxes');
        const categoryCounts = this.getCategoryCounts();
        
        categoryCheckboxes.innerHTML = '';
        
        this.categories.forEach(category => {
            const count = categoryCounts[category] || 0;
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'category-checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="cat_${category}" value="${category}">
                <label for="cat_${category}">
                    ${category}
                    <span class="category-count">${count}</span>
                </label>
            `;
            categoryCheckboxes.appendChild(checkboxItem);
        });
    }

    getCategoryCounts() {
        const counts = {};
        this.components.forEach(component => {
            counts[component.category] = (counts[component.category] || 0) + 1;
        });
        return counts;
    }

    getSelectedCategories() {
        const checkboxes = document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    applyMultiCategoryFilter() {
        const selectedCategories = this.getSelectedCategories();
        const categoryFilterText = document.getElementById('categoryFilterText');
        
        if (selectedCategories.length === 0) {
            categoryFilterText.textContent = 'Tất cả chủ đề';
            this.selectedCategories = [];
        } else if (selectedCategories.length === 1) {
            categoryFilterText.textContent = selectedCategories[0];
            this.selectedCategories = selectedCategories;
        } else {
            categoryFilterText.textContent = `${selectedCategories.length} chủ đề đã chọn`;
            this.selectedCategories = selectedCategories;
        }

        this.filterComponents();
        this.updateMergedComponents();
    }

    clearMultiCategoryFilter() {
        const checkboxes = document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
        
        const categoryFilterText = document.getElementById('categoryFilterText');
        categoryFilterText.textContent = 'Tất cả chủ đề';
        
        this.selectedCategories = [];
        this.filterComponents();
        this.hideMergedComponents();
    }

    updateMergedComponents() {
        if (!this.selectedCategories || this.selectedCategories.length < 2) {
            this.hideMergedComponents();
            return;
        }

        const mergedComponents = this.getMergedComponents();
        this.displayMergedComponents(mergedComponents);
    }

    getMergedComponents() {
        const filteredComponents = this.components.filter(component => 
            this.selectedCategories.includes(component.category)
        );

        // Group by component name and merge quantities
        const mergedMap = new Map();
        
        filteredComponents.forEach(component => {
            const key = component.name.toLowerCase().trim();
            if (mergedMap.has(key)) {
                const existing = mergedMap.get(key);
                existing.totalQuantity += component.quantity;
                existing.components.push(component);
            } else {
                mergedMap.set(key, {
                    name: component.name,
                    totalQuantity: component.quantity,
                    components: [component],
                    categories: new Set([component.category])
                });
            }
        });

        // Convert to array and add category information
        return Array.from(mergedMap.values()).map(item => ({
            ...item,
            categories: Array.from(item.categories)
        }));
    }

    displayMergedComponents(mergedComponents) {
        const mergedSection = document.getElementById('mergedComponentsSection');
        const mergedList = document.getElementById('mergedComponentsList');
        const mergedCount = document.getElementById('mergedComponentsCount');

        if (mergedComponents.length === 0) {
            mergedList.innerHTML = `
                <div class="merged-empty-state">
                    <i class="fas fa-search"></i>
                    <h4>Không tìm thấy linh kiện trùng lặp</h4>
                    <p>Không có linh kiện nào trùng tên trong các chủ đề đã chọn</p>
                </div>
            `;
        } else {
            mergedList.innerHTML = mergedComponents.map(item => `
                <div class="merged-component-item">
                    <div class="merged-component-info">
                        <div class="merged-component-name">${this.escapeHtml(item.name)}</div>
                        <div class="merged-component-details">
                            Chủ đề: ${item.categories.join(', ')} | 
                            ${item.components.length} phiên bản | 
                            Tổng: ${item.totalQuantity} cái
                        </div>
                    </div>
                    <div class="merged-component-total">${item.totalQuantity}</div>
                </div>
            `).join('');
        }

        mergedCount.textContent = mergedComponents.length;
        mergedSection.style.display = 'block';
    }

    hideMergedComponents() {
        const mergedSection = document.getElementById('mergedComponentsSection');
        mergedSection.style.display = 'none';
    }

    updateStats() {
        const totalComponents = this.components.length;
        const totalCategories = this.categories.length;
        const staff = new Set([
            ...this.components.map(c => c.preparer),
            ...this.components.map(c => c.inspector)
        ]);

        document.getElementById('totalComponents').textContent = totalComponents;
        document.getElementById('totalCategories').textContent = totalCategories;
        document.getElementById('totalStaff').textContent = staff.size;
        
        // Cập nhật số lượng theo trạng thái
        this.updateStatusCounts();
    }

    checkComponent(id) {
        const component = this.components.find(c => c.id === id);
        if (!component) return;

        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            this.showMessage('Vui lòng đăng nhập để kiểm tra linh kiện!', 'error');
            return;
        }

        // Kiểm tra xem người dùng hiện tại có phải là người kiểm tra không
        if (component.inspector !== currentUser) {
            this.showMessage('Chỉ người kiểm tra được chỉ định mới có thể kiểm tra linh kiện này!', 'error');
            return;
        }

        // Cập nhật trạng thái
        component.status = 'checked';
        component.checkedAt = new Date().toISOString();
        component.checkedBy = currentUser;
        component.updatedAt = new Date().toISOString();

        this.saveToStorage();
        this.renderComponents();
        this.updateStats();
        this.showMessage(`Linh kiện "${component.name}" đã được kiểm tra thành công!`, 'success');
    }

    updateUserDisplay() {
        const currentUser = localStorage.getItem('currentUser');
        const userNameElement = document.getElementById('currentUserName');
        const userDisplayElement = document.getElementById('currentUserDisplay');
        
        if (currentUser) {
            userNameElement.textContent = currentUser;
            userDisplayElement.textContent = currentUser;
        } else {
            userNameElement.textContent = 'Thiết lập';
            userDisplayElement.textContent = 'Người dùng';
        }
    }

    logout() {
        // Xóa thông tin đăng nhập
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRoles');
        
        // Chuyển hướng về trang đăng nhập
        window.location.href = 'login.html';
    }

    checkUserRoles() {
        const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
        const manageUsersBtn = document.getElementById('manageUsersBtn');
        const manageCategoriesBtn = document.getElementById('manageCategoriesBtn');
        const generateAllPasswordsBtn = document.getElementById('generateAllPasswordsBtn');
        const addComponentBtn = document.getElementById('addComponentBtn');
        const quickAddBtn = document.getElementById('quickAddBtn');
        
        // Hiển thị nút quản lý tài khoản cho admin
        if (userRoles.includes('admin')) {
            manageUsersBtn.style.display = 'inline-flex';
            generateAllPasswordsBtn.style.display = 'inline-flex';
        } else {
            generateAllPasswordsBtn.style.display = 'none';
        }
        
        // Hiển thị nút quản lý chủ đề cho người soạn linh kiện và admin
        if (userRoles.includes('preparer') || userRoles.includes('admin')) {
            manageCategoriesBtn.style.display = 'inline-flex';
        } else {
            manageCategoriesBtn.style.display = 'none';
        }
        
        // Hiển thị nút thêm linh kiện cho người có quyền soạn
        if (userRoles.includes('preparer') || userRoles.includes('admin')) {
            addComponentBtn.style.display = 'inline-flex';
            quickAddBtn.style.display = 'inline-flex';
        } else {
            addComponentBtn.style.display = 'none';
            quickAddBtn.style.display = 'none';
        }
        
        // Tùy chỉnh giao diện theo vai trò
        this.customizeInterfaceByRole(userRoles);
    }

    customizeInterfaceByRole(userRoles) {
        const header = document.querySelector('.header h1');
        const description = document.querySelector('.header p');
        
        // Tìm vai trò chính để hiển thị giao diện
        let primaryRole = 'admin';
        if (userRoles.includes('preparer') && !userRoles.includes('inspector')) {
            primaryRole = 'preparer';
        } else if (userRoles.includes('inspector') && !userRoles.includes('preparer')) {
            primaryRole = 'inspector';
        } else if (userRoles.includes('preparer') && userRoles.includes('inspector')) {
            primaryRole = 'preparer'; // Ưu tiên hiển thị giao diện người soạn
        }
        
        const interfaceConfig = CONFIG.ROLE_INTERFACES[primaryRole];
        header.innerHTML = `<i class="${interfaceConfig.icon}"></i> ${interfaceConfig.title}`;
        description.textContent = interfaceConfig.description;
        
        // Ẩn/hiện các nút theo quyền
        const addComponentBtn = document.getElementById('addComponentBtn');
        const quickAddBtn = document.getElementById('quickAddBtn');
        const manageCategoriesBtn = document.getElementById('manageCategoriesBtn');
        const generateAllPasswordsBtn = document.getElementById('generateAllPasswordsBtn');
        const editButtons = document.querySelectorAll('.btn-edit');
        const deleteButtons = document.querySelectorAll('.btn-delete');
        
        if (interfaceConfig.showAddButtons) {
            addComponentBtn.style.display = 'inline-flex';
            quickAddBtn.style.display = 'inline-flex';
        } else {
            addComponentBtn.style.display = 'none';
            quickAddBtn.style.display = 'none';
        }
        
        // Hiển thị nút quản lý chủ đề cho người soạn và admin
        if (userRoles.includes('preparer') || userRoles.includes('admin')) {
            manageCategoriesBtn.style.display = 'inline-flex';
        } else {
            manageCategoriesBtn.style.display = 'none';
        }
        
        // Hiển thị nút tạo mật khẩu chỉ cho admin
        if (userRoles.includes('admin')) {
            generateAllPasswordsBtn.style.display = 'inline-flex';
        } else {
            generateAllPasswordsBtn.style.display = 'none';
        }
        
        editButtons.forEach(btn => {
            btn.style.display = interfaceConfig.showEditButtons ? 'inline-flex' : 'none';
        });
        
        deleteButtons.forEach(btn => {
            btn.style.display = interfaceConfig.showDeleteButtons ? 'inline-flex' : 'none';
        });
    }

    openUserManagementModal() {
        const modal = document.getElementById('userManagementModal');
        this.loadUsers();
        modal.style.display = 'block';
    }

    closeUserManagementModal() {
        const modal = document.getElementById('userManagementModal');
        modal.style.display = 'none';
    }

    openUserFormModal(user = null) {
        const modal = document.getElementById('userFormModal');
        const title = document.getElementById('userFormTitle');
        const form = document.getElementById('userForm');

        if (user) {
            // Edit mode
            title.textContent = 'Sửa Tài khoản';
            this.currentEditUsername = user.username; // Lưu username hiện tại
            this.fillUserForm(user);
        } else {
            // Add mode
            title.textContent = 'Thêm Tài khoản Mới';
            form.reset();
            this.currentEditUsername = null;
        }

        modal.style.display = 'block';
        document.getElementById('newUsername').focus();
    }

    closeUserFormModal() {
        const modal = document.getElementById('userFormModal');
        modal.style.display = 'none';
        document.getElementById('userForm').reset();
    }

    // Category management methods
    openCategoryManagementModal() {
        const modal = document.getElementById('categoryManagementModal');
        this.renderCategories();
        modal.style.display = 'block';
        document.getElementById('newCategoryName').focus();
    }

    closeCategoryManagementModal() {
        const modal = document.getElementById('categoryManagementModal');
        modal.style.display = 'none';
        document.getElementById('newCategoryName').value = '';
    }

    addCategory() {
        const newCategoryName = document.getElementById('newCategoryName').value.trim();
        
        if (!newCategoryName) {
            this.showMessage('Vui lòng nhập tên chủ đề', 'error');
            return;
        }

        if (this.categories.includes(newCategoryName)) {
            this.showMessage('Chủ đề này đã tồn tại', 'error');
            return;
        }

        this.categories.push(newCategoryName);
        this.saveCategories();
        this.updateCategoryDropdowns();
        this.renderCategories();
        document.getElementById('newCategoryName').value = '';
        this.showMessage(`Đã thêm chủ đề "${newCategoryName}"`, 'success');
    }

    deleteCategory(categoryName) {
        // Kiểm tra xem có linh kiện nào đang sử dụng chủ đề này không
        const componentsUsingCategory = this.components.filter(comp => comp.category === categoryName);
        
        if (componentsUsingCategory.length > 0) {
            this.showMessage(`Không thể xóa chủ đề "${categoryName}" vì có ${componentsUsingCategory.length} linh kiện đang sử dụng`, 'error');
            return;
        }

        if (confirm(`Bạn có chắc chắn muốn xóa chủ đề "${categoryName}" không?`)) {
            this.categories = this.categories.filter(cat => cat !== categoryName);
            this.saveCategories();
            this.updateCategoryDropdowns();
            this.renderCategories();
            this.showMessage(`Đã xóa chủ đề "${categoryName}"`, 'success');
        }
    }

    renderCategories() {
        const categoriesList = document.getElementById('categoriesList');
        categoriesList.innerHTML = '';

        this.categories.forEach(category => {
            // Đếm số linh kiện trong chủ đề này
            const componentCount = this.components.filter(comp => comp.category === category).length;
            // Tạo phần tử chủ đề với style mới
            const categoryItem = document.createElement('div');
            categoryItem.className = 'topic-card';
            categoryItem.innerHTML = `
                <span>${this.escapeHtml(category)}</span>
                <span class="topic-badge">${componentCount} linh kiện</span>
                <button class="topic-delete-btn" onclick="app.deleteCategory('${this.escapeHtml(category)}')">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            `;
            categoriesList.appendChild(categoryItem);
        });
    }

    updateCategoryDropdowns() {
        // Cập nhật dropdown trong modal thêm linh kiện
        const componentCategory = document.getElementById('componentCategory');
        const quickComponentCategory = document.getElementById('quickComponentCategory');

        const updateDropdown = (dropdown) => {
            const currentValue = dropdown.value;
            dropdown.innerHTML = '<option value="">Chọn chủ đề</option>';
            
            this.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                dropdown.appendChild(option);
            });
            
            // Giữ lại giá trị hiện tại nếu vẫn tồn tại
            if (this.categories.includes(currentValue)) {
                dropdown.value = currentValue;
            }
        };

        updateDropdown(componentCategory);
        updateDropdown(quickComponentCategory);
        
        // Cập nhật multi-category filter
        this.populateCategoryCheckboxes();
    }

    saveCategories() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }

    // Password generation methods
    openGenerateAllPasswordsModal() {
        const modal = document.getElementById('generateAllPasswordsModal');
        modal.style.display = 'block';
    }

    closeGenerateAllPasswordsModal() {
        const modal = document.getElementById('generateAllPasswordsModal');
        modal.style.display = 'none';
    }

    closePasswordResultsModal() {
        const modal = document.getElementById('passwordResultsModal');
        modal.style.display = 'none';
    }

    generateAllPasswords() {
        const users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        const passwordLength = parseInt(document.getElementById('passwordLength').value);
        const passwordPattern = document.getElementById('passwordPattern').value;
        
        const passwordResults = [];
        
        users.forEach(user => {
            if (user.username === 'admin') {
                // Không đổi mật khẩu admin, giữ mặc định admin123
                user.password = 'admin123';
                // Không thêm vào passwordResults (không xuất hiện trong bảng)
                return;
            }
            const newPassword = this.generatePassword(passwordLength, passwordPattern);
            passwordResults.push({
                username: user.username,
                displayName: user.displayName,
                password: newPassword,
                roles: user.roles
            });
            user.password = newPassword;
        });
        // Lưu danh sách người dùng với mật khẩu mới
        localStorage.setItem('users', JSON.stringify(users));
        // Đăng xuất tất cả người dùng
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRoles');
        // Hiển thị kết quả (không có admin)
        this.showPasswordResults(passwordResults);
        this.closeGenerateAllPasswordsModal();
    }

    generatePassword(length, pattern) {
        let chars = '';
        let password = '';
        
        switch (pattern) {
            case 'mixed':
                chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                break;
            case 'alphanumeric':
                chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
                break;
            case 'numeric':
                chars = '0123456789';
                break;
            case 'alphabetic':
                chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                break;
            default:
                chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        }
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return password;
    }

    showPasswordResults(passwordResults) {
        const modal = document.getElementById('passwordResultsModal');
        const tableBody = document.getElementById('passwordResultsTableBody');
        
        // Lưu kết quả để sử dụng cho copy/download
        this.currentPasswordResults = passwordResults;
        
        // Hiển thị kết quả trong bảng (ẩn admin)
        tableBody.innerHTML = '';
        passwordResults.forEach(result => {
            if(result.username === 'admin') return;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.escapeHtml(result.username)}</td>
                <td>${this.escapeHtml(result.displayName)}</td>
                <td>${this.escapeHtml(result.password)}</td>
                <td>${this.renderUserRoles(result.roles)}</td>
            `;
            tableBody.appendChild(row);
        });
        
        modal.style.display = 'block';
    }

    copyPasswordsList() {
        if (!this.currentPasswordResults) return;
        
        let csvContent = 'Tên đăng nhập,Tên hiển thị,Mật khẩu mới,Vai trò\n';
        
        this.currentPasswordResults.forEach(result => {
            if(result.username === 'admin') return;
            const roles = result.roles.map(role => CONFIG.ROLE_LABELS[role]).join(', ');
            csvContent += `"${result.username}","${result.displayName}","${result.password}","${roles}"\n`;
        });
        
        // Tạo text để copy
        let textContent = 'DANH SÁCH MẬT KHẨU MỚI\n';
        textContent += '========================\n\n';
        
        this.currentPasswordResults.forEach(result => {
            if(result.username === 'admin') return;
            const roles = result.roles.map(role => CONFIG.ROLE_LABELS[role]).join(', ');
            textContent += `Tên đăng nhập: ${result.username}\n`;
            textContent += `Tên hiển thị: ${result.displayName}\n`;
            textContent += `Mật khẩu mới: ${result.password}\n`;
            textContent += `Vai trò: ${roles}\n`;
            textContent += '------------------------\n';
        });
        
        // Copy vào clipboard
        navigator.clipboard.writeText(textContent).then(() => {
            this.showMessage('Đã sao chép danh sách mật khẩu vào clipboard!', 'success');
        }).catch(() => {
            // Fallback cho trình duyệt cũ
            const textArea = document.createElement('textarea');
            textArea.value = textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showMessage('Đã sao chép danh sách mật khẩu vào clipboard!', 'success');
        });
    }

    downloadPasswordsCSV() {
        if (!this.currentPasswordResults) return;
        
        let csvContent = 'Tên đăng nhập,Tên hiển thị,Mật khẩu mới,Vai trò\n';
        
        this.currentPasswordResults.forEach(result => {
            if(result.username === 'admin') return;
            const roles = result.roles.map(role => CONFIG.ROLE_LABELS[role]).join(', ');
            csvContent += `"${result.username}","${result.displayName}","${result.password}","${roles}"\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `mat_khau_moi_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.showMessage('Đã tải xuống file CSV thành công!', 'success');
        }
    }

    fillUserForm(user) {
        document.getElementById('newUsername').value = user.username;
        document.getElementById('newUsername').disabled = false; // Cho phép sửa username
        document.getElementById('newPassword').value = '';
        document.getElementById('newPassword').placeholder = 'Để trống nếu không đổi mật khẩu';
        document.getElementById('newDisplayName').value = user.displayName;
        
        // Reset tất cả checkbox
        document.getElementById('rolePreparer').checked = false;
        document.getElementById('roleInspector').checked = false;
        document.getElementById('roleAdmin').checked = false;
        
        // Check các vai trò hiện có
        if (user.roles) {
            user.roles.forEach(role => {
                switch(role) {
                    case 'preparer':
                        document.getElementById('rolePreparer').checked = true;
                        break;
                    case 'inspector':
                        document.getElementById('roleInspector').checked = true;
                        break;
                    case 'admin':
                        document.getElementById('roleAdmin').checked = true;
                        break;
                }
            });
        }
    }

    handleUserFormSubmit(e) {
        e.preventDefault();

        // Lấy các vai trò được chọn
        const selectedRoles = [];
        if (document.getElementById('rolePreparer').checked) selectedRoles.push('preparer');
        if (document.getElementById('roleInspector').checked) selectedRoles.push('inspector');
        if (document.getElementById('roleAdmin').checked) selectedRoles.push('admin');

        const formData = {
            username: document.getElementById('newUsername').value.trim(),
            password: document.getElementById('newPassword').value,
            displayName: document.getElementById('newDisplayName').value.trim(),
            roles: selectedRoles
        };

        // Kiểm tra dữ liệu
        if (!formData.username || !formData.displayName || formData.roles.length === 0) {
            this.showMessage('Vui lòng điền đầy đủ thông tin và chọn ít nhất một vai trò!', 'error');
            return;
        }

        // Nếu là thêm mới, mật khẩu là bắt buộc
        const isEdit = this.currentEditUsername !== null;
        if (!isEdit && !formData.password) {
            this.showMessage('Vui lòng nhập mật khẩu!', 'error');
            return;
        }

        if (isEdit) {
            this.updateUser(formData);
        } else {
            this.addUser(formData);
        }

        this.closeUserFormModal();
    }

    loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        const tbody = document.getElementById('usersTableBody');
        
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>${this.escapeHtml(user.username)}</td>
                <td>${this.escapeHtml(user.displayName)}</td>
                <td>${this.renderUserRoles(user.roles || [user.role])}</td>
                <td>${new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                <td class="user-actions">
                    <button class="btn btn-edit" onclick="app.editUser('${user.username}')">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button class="btn btn-delete" onclick="app.deleteUser('${user.username}')" ${user.username === 'admin' ? 'disabled' : ''}>
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderUserRoles(roles) {
        return roles.map(role => 
            `<span class="role-badge ${role}">${CONFIG.ROLE_LABELS[role] || role}</span>`
        ).join(' ');
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

    addUser(userData) {
        let users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        // Kiểm tra username đã tồn tại
        if (users.find(u => u.username === userData.username)) {
            this.showMessage('Tên đăng nhập đã tồn tại!', 'error');
            return;
        }
        const newUser = {
            ...userData,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        this.showUserCreatedInfo(newUser);
        this.loadUsers();
    }

    showUserCreatedInfo(user) {
        // Tạo modal hoặc thông báo nổi bật
        let modal = document.getElementById('userCreatedModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'userCreatedModal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.35)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
            document.body.appendChild(modal);
        }
        const userJson = JSON.stringify(user);
        modal.innerHTML = `
            <div style="background: #fff; border-radius: 16px; padding: 32px 28px; min-width: 320px; max-width: 90vw; box-shadow: 0 8px 32px rgba(0,0,0,0.18); text-align: center;">
                <h2 style='color: #38a169; margin-bottom: 12px;'>Tạo tài khoản thành công!</h2>
                <div style='margin-bottom: 18px;'>
                    <strong>Tên đăng nhập:</strong> <span id='copyUsername' style='user-select:all;'>${user.username}</span><br>
                    <strong>Mật khẩu:</strong> <span id='copyPassword' style='user-select:all;'>${user.password}</span><br>
                    <strong>Tên hiển thị:</strong> ${user.displayName}<br>
                    <strong>Vai trò:</strong> ${(user.roles||[]).join(', ')}
                </div>
                <button id='copyUserInfoBtn' style='margin: 0 8px 0 0; padding: 8px 18px; border-radius: 8px; border: none; background: #4299e1; color: #fff; font-weight: 600; cursor: pointer;'>Sao chép thông tin</button>
                <button id='exportUserInfoBtn' style='margin: 0 8px 0 0; padding: 8px 18px; border-radius: 8px; border: none; background: #38a169; color: #fff; font-weight: 600; cursor: pointer;'>Xuất file tài khoản</button>
                <button id='copyUserJsonBtn' style='margin: 0 8px 0 0; padding: 8px 18px; border-radius: 8px; border: none; background: #805ad5; color: #fff; font-weight: 600; cursor: pointer;'>Tạo mã nhập nhanh</button>
                <button id='closeUserInfoBtn' style='padding: 8px 18px; border-radius: 8px; border: none; background: #e53e3e; color: #fff; font-weight: 600; cursor: pointer;'>Đóng</button>
                <div style='margin-top: 18px; font-size: 0.95em; color: #666;'>
                    <b>Mã nhập nhanh:</b><br>
                    <textarea id='userJsonArea' style='width: 90%; min-height: 40px; margin-top: 6px; font-size: 0.95em;'>${userJson}</textarea>
                </div>
            </div>
        `;
        document.getElementById('copyUserInfoBtn').onclick = () => {
            const text = `Tên đăng nhập: ${user.username}\nMật khẩu: ${user.password}\nTên hiển thị: ${user.displayName}\nVai trò: ${(user.roles||[]).join(', ')}`;
            navigator.clipboard.writeText(text).then(() => {
                alert('Đã sao chép thông tin tài khoản!');
            });
        };
        document.getElementById('exportUserInfoBtn').onclick = () => {
            const text = `Tên đăng nhập: ${user.username}\nMật khẩu: ${user.password}\nTên hiển thị: ${user.displayName}\nVai trò: ${(user.roles||[]).join(', ')}`;
            const blob = new Blob([text], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `tai_khoan_${user.username}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        document.getElementById('copyUserJsonBtn').onclick = () => {
            const text = document.getElementById('userJsonArea').value;
            navigator.clipboard.writeText(text).then(() => {
                alert('Đã sao chép mã nhập nhanh!');
            });
        };
        document.getElementById('closeUserInfoBtn').onclick = () => {
            modal.remove();
        };
    }

    updateUser(userData) {
        const users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        
        // Tìm user cũ bằng username hiện tại (được lưu trong currentEditUsername)
        const index = users.findIndex(u => u.username === this.currentEditUsername);
        
        if (index !== -1) {
            // Kiểm tra xem username mới có bị trùng không (nếu có thay đổi)
            if (userData.username !== this.currentEditUsername) {
                const existingUser = users.find(u => u.username === userData.username);
                if (existingUser) {
                    this.showMessage('Tên đăng nhập mới đã tồn tại!', 'error');
                    return;
                }
            }

            const updatedUser = {
                ...users[index],
                username: userData.username,
                displayName: userData.displayName,
                roles: userData.roles
            };

            // Cập nhật mật khẩu nếu có
            if (userData.password) {
                updatedUser.password = userData.password;
            }

            users[index] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Thông báo đặc biệt nếu đổi tên đăng nhập
            if (userData.username !== this.currentEditUsername) {
                this.showMessage(`Tài khoản đã được cập nhật thành công! Tên đăng nhập đã đổi từ "${this.currentEditUsername}" thành "${userData.username}"`, 'success');
            } else {
                this.showMessage('Tài khoản đã được cập nhật thành công!', 'success');
            }
            
            this.loadUsers();
        }
    }

    editUser(username) {
        const users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        const user = users.find(u => u.username === username);
        
        if (user) {
            this.openUserFormModal(user);
        }
    }

    deleteUser(username) {
        if (username === 'admin') {
            this.showMessage('Không thể xóa tài khoản admin!', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        const filteredUsers = users.filter(u => u.username !== username);
        
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        this.showMessage('Tài khoản đã được xóa thành công!', 'success');
        this.loadUsers();
    }

    saveToStorage() {
        localStorage.setItem('components', JSON.stringify(this.components));
    }

    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        else if (type === 'error') icon = 'fa-exclamation-circle';
        else if (type === 'warning') icon = 'fa-exclamation-triangle';
        
        messageDiv.innerHTML = `
            <i class="fas ${icon}"></i>
            ${message}
        `;

        // Insert after header
        const header = document.querySelector('.header');
        header.parentNode.insertBefore(messageDiv, header.nextSibling);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadSampleData() {
        // Không tải dữ liệu mẫu - để trống để người dùng tự thêm
        // Nếu muốn tải dữ liệu mẫu, bỏ comment dưới đây
        /*
        if (this.components.length === 0) {
            const sampleData = [
                // Dữ liệu mẫu có thể được thêm ở đây
            ];
            this.components = sampleData;
            this.saveToStorage();
            this.renderComponents();
            this.updateStats();
        }
        */
    }

    // Share functionality
    showShareModal() {
        const modal = document.getElementById('shareModal');
        const shareLink = document.getElementById('shareLink');
        
        // Tạo URL chia sẻ
        const shareUrl = UTILS.createShareUrl();
        shareLink.value = shareUrl;
        
        // Cập nhật meta tags
        UTILS.createMetaTags();
        
        modal.style.display = 'block';
    }

    closeShareModal() {
        const modal = document.getElementById('shareModal');
        modal.style.display = 'none';
    }

    copyShareLink() {
        const shareLink = document.getElementById('shareLink');
        shareLink.select();
        shareLink.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            this.showMessage('Đã sao chép đường link vào clipboard!', 'success');
        } catch (err) {
            // Fallback for modern browsers
            navigator.clipboard.writeText(shareLink.value).then(() => {
                this.showMessage('Đã sao chép đường link vào clipboard!', 'success');
            }).catch(() => {
                this.showMessage('Không thể sao chép đường link!', 'error');
            });
        }
    }

    shareToFacebook() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(CONFIG.SHARE.title);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }

    shareToTwitter() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(CONFIG.SHARE.title + ' - ' + CONFIG.SHARE.description);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }

    shareToLinkedIn() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(CONFIG.SHARE.title);
        const summary = encodeURIComponent(CONFIG.SHARE.description);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
    }

    shareViaEmail() {
        const subject = encodeURIComponent(CONFIG.SHARE.title);
        const body = encodeURIComponent(`${CONFIG.SHARE.description}\n\nTruy cập tại: ${window.location.href}`);
        window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    }

    openAccountManagerModal() {
        const modal = document.getElementById('accountManagerModal');
        const tbody = document.getElementById('accountManagerTableBody');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        tbody.innerHTML = users.map(user => {
            const pwId = 'pw_' + user.username;
            return `<tr>
                <td>${this.escapeHtml(user.username)}</td>
                <td><input type='password' value='${user.password}' id='${pwId}' readonly style='width:90px;'>
                    <button onclick="document.getElementById('${pwId}').type = document.getElementById('${pwId}').type === 'password' ? 'text' : 'password'" style='margin-left:4px;'><i class='fas fa-eye'></i></button>
                </td>
                <td>${this.escapeHtml(user.displayName)}</td>
                <td>${(user.roles||[]).join(', ')}</td>
                <td>${user.firstLogin ? new Date(user.firstLogin).toLocaleString('vi-VN') : ''}</td>
                <td>${user.lastLogin ? new Date(user.lastLogin).toLocaleString('vi-VN') : ''}</td>
                <td>${user.loginCount || 0}</td>
            </tr>`;
        }).join('');
        modal.style.display = 'block';
    }
}

// Khởi tạo ứng dụng khi trang web được tải
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ComponentManager();
}); 