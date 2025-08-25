# Hệ thống Quản lý Linh kiện

## Mô tả
Hệ thống quản lý và sắp xếp linh kiện một cách hiệu quả với giao diện hiện đại và chuyên nghiệp. Hỗ trợ các chức năng cơ bản:
- Thêm, sửa, xóa linh kiện
- Quản lý chủ đề (danh mục)
- Tìm kiếm và lọc linh kiện
- Phân quyền người dùng theo vai trò
- Giao diện responsive, dễ sử dụng

## ✨ Tính năng mới trong phiên bản 2.1.0

### 🎨 Giao diện chuyên nghiệp
- **Thiết kế hiện đại**: Sử dụng Material Design principles và CSS variables
- **Phối màu hài hòa**: Bảng màu chuyên nghiệp với gradient và shadow
- **Typography tốt**: Font Inter cho khả năng đọc tốt trên mọi thiết bị
- **Responsive design**: Tối ưu cho desktop, tablet và mobile

### 🚀 Cải tiến UX/UI
- **Gradient backgrounds**: Tạo chiều sâu và sự hấp dẫn
- **Smooth animations**: Chuyển động mượt mà và tự nhiên
- **Interactive elements**: Hover effects và focus states
- **Accessibility**: Hỗ trợ keyboard navigation và screen readers

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
- Dark mode support (sắp tới)

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

- `login.html` - Trang đăng nhập với giao diện hiện đại
- `app.html` - Trang chính quản lý linh kiện
- `config.js` - Cấu hình hệ thống và khởi tạo
- `script.js` - Logic chính của ứng dụng
- `login-script.js` - Logic đăng nhập
- `styles.css` - CSS cho trang chính với design system
- `login-styles.css` - CSS cho trang đăng nhập

## 🎨 Design System

### Bảng màu
- **Primary**: #2563eb (Blue)
- **Secondary**: #10b981 (Green)
- **Accent**: #f59e0b (Orange)
- **Neutral**: Gray scale từ 50-900

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Tự động điều chỉnh theo kích thước màn hình

### Spacing
- **Scale**: 0.25rem đến 5rem
- **Consistent**: Sử dụng CSS variables cho tính nhất quán

### Shadows
- **Multiple levels**: sm, md, lg, xl
- **Realistic**: Dựa trên Material Design principles

## 🔧 Cài đặt và chạy

### Yêu cầu hệ thống
- Trình duyệt hiện đại (Chrome 80+, Firefox 75+, Safari 13+)
- Hỗ trợ CSS Grid và Flexbox
- Hỗ trợ CSS Variables

### Chạy ứng dụng
1. Tải tất cả file vào một thư mục
2. Mở `login.html` trong trình duyệt
3. Đăng nhập với tài khoản được cấp

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Tính năng responsive
- Grid layout tự động điều chỉnh
- Typography scale theo màn hình
- Touch-friendly buttons trên mobile
- Optimized spacing cho từng breakpoint

## ♿ Accessibility

### Tính năng hỗ trợ
- **Keyboard navigation**: Tab, Enter, Space
- **Focus indicators**: Rõ ràng và dễ nhìn
- **Screen reader**: ARIA labels và semantic HTML
- **High contrast**: Hỗ trợ chế độ độ tương phản cao
- **Reduced motion**: Tôn trọng cài đặt giảm chuyển động

## 🚀 Performance

### Tối ưu hóa
- **CSS Variables**: Giảm kích thước file
- **Efficient animations**: Sử dụng transform và opacity
- **Lazy loading**: Hình ảnh được tải khi cần
- **Minimal JavaScript**: Tối ưu hóa logic

## 🔮 Roadmap

### Phiên bản tiếp theo
- [ ] Dark mode toggle
- [ ] Advanced filtering
- [ ] Export/Import data
- [ ] Real-time notifications
- [ ] Mobile app (PWA)

## Hỗ trợ kỹ thuật

Nếu gặp vấn đề, hãy:
1. Kiểm tra console trình duyệt để xem lỗi
2. Đảm bảo tất cả file được tải đúng
3. Kiểm tra quyền truy cập file
4. Cập nhật trình duyệt lên phiên bản mới nhất

## 📄 License

Hệ thống này được phát triển cho mục đích quản lý nội bộ. Vui lòng liên hệ tác giả để được phép sử dụng thương mại.

---

**Lưu ý**: Hệ thống được thiết kế với tiêu chuẩn hiện đại, tập trung vào trải nghiệm người dùng và khả năng bảo trì. Giao diện mới mang lại cảm giác chuyên nghiệp và dễ sử dụng hơn. 