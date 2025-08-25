# Hệ thống Quản lý Linh kiện

## Mô tả
Hệ thống quản lý và sắp xếp linh kiện một cách hiệu quả, hỗ trợ các chức năng cơ bản:
- Thêm, sửa, xóa linh kiện
- Quản lý chủ đề (danh mục)
- Tìm kiếm và lọc linh kiện
- Phân quyền người dùng theo vai trò
- Giao diện đơn giản, dễ sử dụng

## Tính năng chính

### 1. Quản lý linh kiện
- Thêm linh kiện mới với đầy đủ thông tin
- Thêm nhanh linh kiện cho các trường hợp đơn giản
- Chỉnh sửa thông tin linh kiện
- Xóa linh kiện (chỉ admin)
- Upload hình ảnh linh kiện

### 2. Quản lý chủ đề
- Thêm chủ đề mới
- Xóa chủ đề không sử dụng
- Lọc linh kiện theo chủ đề

### 3. Tìm kiếm và lọc
- Tìm kiếm theo tên linh kiện
- Lọc theo trạng thái (Chờ kiểm tra, Đã kiểm tra, Tất cả)
- Lọc theo chủ đề

### 4. Phân quyền người dùng
- **Người soạn linh kiện**: Thêm, sửa linh kiện
- **Người kiểm tra**: Xem và cập nhật trạng thái
- **Quản trị viên**: Toàn quyền quản lý hệ thống

### 5. Giao diện
- Responsive design cho mobile và desktop
- Giao diện đơn giản, dễ sử dụng
- Thống kê nhanh về số lượng linh kiện, chủ đề, nhân viên

## Cách sử dụng

### Đăng nhập
1. Mở file `login.html`
2. Nhập tên đăng nhập và mật khẩu
3. Liên hệ quản trị viên để được cấp tài khoản

### Thêm linh kiện
1. Nhấn nút "Thêm Linh kiện"
2. Điền đầy đủ thông tin bắt buộc
3. Chọn hình ảnh (tùy chọn)
4. Nhấn "Lưu"

### Thêm nhanh
1. Nhấn nút "Thêm Nhanh"
2. Điền thông tin cơ bản
3. Nhấn "Thêm Nhanh"

### Quản lý chủ đề
1. Nhấn nút "Quản lý Chủ đề"
2. Thêm chủ đề mới hoặc xóa chủ đề cũ

## Cấu trúc file

- `login.html` - Trang đăng nhập
- `app.html` - Trang chính quản lý linh kiện
- `config.js` - Cấu hình hệ thống
- `script.js` - Logic chính của ứng dụng
- `login-script.js` - Logic đăng nhập
- `styles.css` - CSS cho trang chính
- `login-styles.css` - CSS cho trang đăng nhập

## Hỗ trợ kỹ thuật

Nếu gặp vấn đề, hãy:
1. Kiểm tra console trình duyệt để xem lỗi
2. Đảm bảo tất cả file được tải đúng
3. Kiểm tra quyền truy cập file

---

**Lưu ý**: Hệ thống được thiết kế đơn giản, dễ sử dụng và bảo trì. Tập trung vào các chức năng cốt lõi của việc quản lý linh kiện. 