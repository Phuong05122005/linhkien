# Hệ thống Quản lý Linh kiện v2.0

Một ứng dụng web chuyên nghiệp để quản lý và sắp xếp linh kiện điện tử với hệ thống vai trò đa dạng và khả năng chia sẻ.

## 🚀 Tính năng chính

### 🔐 Hệ thống Vai trò Đa dạng
- **Quản trị viên (Admin)**: Toàn quyền quản lý hệ thống
- **Người soạn linh kiện (Preparer)**: Nhập và quản lý linh kiện
- **Người kiểm tra linh kiện (Inspector)**: Kiểm tra và xác nhận linh kiện
- **Hỗ trợ nhiều vai trò**: Một người có thể có từ 1-5 vai trò khác nhau

### 📦 Quản lý Linh kiện
- **Thêm, sửa, xóa** linh kiện với quyền hạn theo vai trò
- **Phân loại** theo chủ đề (Điện tử, Cơ khí, Máy tính, Điện thoại, Khác)
- **Tìm kiếm và lọc** nhanh chóng
- **Thống kê** chi tiết về linh kiện và nhân viên
- **Hệ thống kiểm tra** linh kiện với trạng thái chờ/đã kiểm tra
- **Chuyển đổi trạng thái** từ chờ kiểm tra sang đã kiểm tra
- **Theo dõi thời gian** và người thực hiện kiểm tra

### 🎨 Giao diện Thông minh
- **Tùy chỉnh theo vai trò**: Giao diện thay đổi dựa trên vai trò người dùng
- **Responsive design**: Hoạt động tốt trên mọi thiết bị
- **Giao diện chuyên nghiệp**: Thiết kế hiện đại và dễ sử dụng

### 🔗 Chia sẻ và Liên kết
- **Đường link chuyên nghiệp**: URL dễ nhớ và chia sẻ
- **Chia sẻ mạng xã hội**: Facebook, Twitter, LinkedIn
- **Chia sẻ qua email**: Gửi link trực tiếp qua email
- **Sao chép link**: Copy đường link vào clipboard

### 👥 Quản lý Tài khoản
- **Tạo tài khoản**: Admin có thể tạo tài khoản với nhiều vai trò
- **Phân quyền chi tiết**: Kiểm soát quyền truy cập theo vai trò
- **Tạo mật khẩu hàng loạt**: Admin có thể tạo mật khẩu mới cho tất cả tài khoản
- **Xuất danh sách mật khẩu**: Sao chép hoặc tải xuống danh sách mật khẩu mới
- **Bảo mật**: Hệ thống đăng nhập an toàn

## 🎨 Giao diện

- **Thiết kế hiện đại** với gradient màu sắc đẹp mắt
- **Responsive design** - hoạt động tốt trên mọi thiết bị
- **Animations mượt mà** và trải nghiệm người dùng tốt
- **Modal dialogs** cho các thao tác thêm/sửa/xóa
- **Thông báo real-time** cho các hành động

## 📱 Thông tin linh kiện

Mỗi linh kiện bao gồm:
- **Tên linh kiện** - tên gọi chính xác
- **Chủ đề** - phân loại theo loại
- **Số lượng** - số lượng hiện có
- **Người soạn** - người chuẩn bị linh kiện
- **Người kiểm tra** - người kiểm tra chất lượng
- **Mô tả** - thông tin chi tiết (tùy chọn)
- **Ngày tạo** - thời điểm thêm vào hệ thống
- **Ngày cập nhật** - thời điểm chỉnh sửa gần nhất

## 🛠️ Cách sử dụng

### 1. Khởi chạy ứng dụng
- **Mở file `login.html`** trong trình duyệt web (trang đăng nhập chính)
- Hoặc mở file `app.html` (sẽ tự động chuyển hướng đến trang đăng nhập nếu chưa đăng nhập)
- Hệ thống sẽ bắt đầu với dữ liệu trống, sẵn sàng cho bạn thêm linh kiện thực tế

### 2. Đăng nhập hệ thống
- **Liên hệ quản trị viên** để được cấp tài khoản
- Nhập tên đăng nhập và mật khẩu được cấp
- Chọn "Ghi nhớ đăng nhập" để lưu tên đăng nhập
- Nhấn "Đăng nhập" để vào hệ thống

**Lưu ý:** Tài khoản demo đã được ẩn để tăng tính bảo mật. Chỉ quản trị viên mới có thể tạo tài khoản mới.

### 3. Thêm linh kiện mới
1. Nhấn nút **"Thêm Linh kiện"** màu xanh
2. Điền đầy đủ thông tin trong form:
   - Tên linh kiện (bắt buộc)
   - Chọn chủ đề (bắt buộc)
   - Số lượng (bắt buộc)
   - Người soạn (bắt buộc)
   - Người kiểm tra (bắt buộc)
   - Mô tả (tùy chọn)
3. Nhấn **"Lưu"** để thêm linh kiện

### 4. Thêm nhanh linh kiện (cho người chuẩn bị)
1. Nhấn nút **"Thêm Nhanh"** màu xanh lá
2. Điền thông tin cơ bản:
   - Tên linh kiện (bắt buộc)
   - Chọn chủ đề (bắt buộc)
   - Số lượng (bắt buộc)
   - Người soạn (tự động điền nếu đã thiết lập)
   - Người kiểm tra (bắt buộc)
3. Nhấn **"Thêm Nhanh"** để lưu

### 5. Thiết lập tên người dùng
1. Nhấn vào card **"Tên người dùng"** trong phần thống kê
2. Nhập tên của bạn
3. Nhấn **"Lưu"** để thiết lập
4. Tên này sẽ được tự động điền khi thêm linh kiện nhanh

### 6. Sửa linh kiện
1. Nhấn nút **"Sửa"** màu vàng trên card linh kiện
2. Chỉnh sửa thông tin trong form
3. Nhấn **"Lưu"** để cập nhật

### 7. Kiểm tra linh kiện (Chỉ người kiểm tra)
1. **Chỉ người kiểm tra được chỉ định** mới có thể kiểm tra linh kiện
2. Nhấn nút **"Kiểm tra"** màu xanh lá trên card linh kiện chờ kiểm tra
3. Hệ thống sẽ chuyển linh kiện sang trạng thái **"Đã kiểm tra"**
4. Lưu lại thông tin: thời gian kiểm tra và người thực hiện

### 8. Chuyển đổi giữa các trạng thái
- **Tab "Chờ Kiểm tra"**: Hiển thị linh kiện chưa được kiểm tra
- **Tab "Đã Kiểm tra"**: Hiển thị linh kiện đã được kiểm tra
- **Tab "Tất cả"**: Hiển thị tất cả linh kiện

### 9. Xóa linh kiện
1. Nhấn nút **"Xóa"** màu đỏ trên card linh kiện
2. Xác nhận xóa trong dialog
3. Nhấn **"Xóa"** để xác nhận

### 10. Quản lý tài khoản (Chỉ Admin)
1. Nhấn nút **"Quản lý Tài khoản"** (chỉ hiển thị cho Admin)
2. Xem danh sách tất cả tài khoản trong hệ thống
3. **Thêm tài khoản mới**: Nhấn "Thêm Tài khoản" và điền thông tin
4. **Sửa tài khoản**: Nhấn "Sửa" trên tài khoản cần chỉnh sửa
   - **Có thể đổi tên đăng nhập** của tất cả tài khoản
   - **Có thể thay đổi vai trò** (thêm/bớt vai trò)
   - **Có thể đổi mật khẩu** (để trống nếu không đổi)
5. **Xóa tài khoản**: Nhấn "Xóa" (không thể xóa tài khoản admin)
6. **Tạo mật khẩu cho tất cả**: Nhấn "Tạo Mật khẩu Cho Tất cả"
   - **Cảnh báo**: Thao tác này sẽ thay đổi mật khẩu của TẤT CẢ tài khoản
   - **Tùy chọn độ dài**: 6, 8, 10, hoặc 12 ký tự
   - **Tùy chọn mẫu**: Chữ và số, chữ số + ký tự đặc biệt, chỉ số, chỉ chữ
   - **Kết quả**: Hiển thị danh sách mật khẩu mới với tùy chọn sao chép/tải xuống
   - **Lưu ý**: Tất cả người dùng sẽ bị đăng xuất và cần đăng nhập lại

### 11. Tìm kiếm và lọc
- **Tìm kiếm**: Nhập từ khóa vào ô tìm kiếm
- **Lọc theo chủ đề**: Chọn chủ đề từ dropdown
- Kết hợp cả hai để tìm kiếm chính xác hơn

## 💾 Lưu trữ dữ liệu

- Dữ liệu được lưu trữ trong **localStorage** của trình duyệt
- Dữ liệu sẽ được giữ lại khi đóng/mở lại trình duyệt
- Không cần cài đặt database hay server

## 🎯 Dữ liệu mẫu

Hệ thống hiện tại **không có dữ liệu mẫu** để bạn có thể bắt đầu với dữ liệu thực tế của mình.

Nếu muốn thêm dữ liệu mẫu để test, bạn có thể:
1. Chỉnh sửa file `script.js`
2. Bỏ comment trong hàm `loadSampleData()`
3. Thêm dữ liệu mẫu vào mảng `sampleData`

## 🔧 Tùy chỉnh

### Thêm chủ đề mới
Chỉnh sửa file `index.html` và `script.js`:
1. Thêm option trong select `categoryFilter`
2. Thêm option trong select `componentCategory`
3. Cập nhật logic trong JavaScript nếu cần

### Thay đổi giao diện
- Chỉnh sửa file `styles.css` để thay đổi màu sắc, font, layout
- Sử dụng CSS variables để dễ dàng tùy chỉnh theme

## 📋 Yêu cầu hệ thống

- **Trình duyệt hiện đại** (Chrome, Firefox, Safari, Edge)
- **JavaScript enabled**
- **LocalStorage support** (có sẵn trong hầu hết trình duyệt)

## 🚀 Tính năng nâng cao có thể thêm

- **Export/Import dữ liệu** (CSV, Excel)
- **Báo cáo thống kê** chi tiết
- **Quản lý kho** với cảnh báo hết hàng
- **Lịch sử thay đổi** chi tiết
- **Backup dữ liệu** tự động
- **Tìm kiếm nâng cao** với bộ lọc phức tạp
- **Quản lý nhóm người dùng** (departments, teams)
- **Audit log** - ghi lại tất cả hoạt động
- **Two-factor authentication** (2FA)

## 📞 Hỗ trợ

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng:
1. Kiểm tra console của trình duyệt để xem lỗi
2. Đảm bảo JavaScript được bật
3. Thử xóa localStorage và tải lại trang

---

**Hệ thống Quản lý Linh kiện** - Giải pháp quản lý linh kiện hiệu quả và chuyên nghiệp! 🎯 

## ️ **Cách 1: Mở trực tiếp từ file (Đơn giản nhất)**

1. **Mở File Explorer** (Windows Explorer)
2. **Điều hướng đến thư mục** chứa các file đã tạo:
   - `login.html` (trang đăng nhập chính)
   - `app.html` (trang quản lý chính)
   - `config.js` (cấu hình hệ thống)
   - `styles.css` 
   - `script.js`
   - `README.md`

3. **Double-click vào file `login.html`** - trang đăng nhập sẽ mở trong trình duyệt mặc định

## 🌐 **Cách 2: Kéo thả vào trình duyệt**

1. **Mở trình duyệt** (Chrome, Firefox, Edge, Safari)
2. **Kéo file `login.html`** từ File Explorer vào cửa sổ trình duyệt

## 📁 **Cách 3: Mở từ trình duyệt**

1. **Mở trình duyệt**
2. **Nhấn Ctrl + O** (hoặc Cmd + O trên Mac)
3. **Chọn file `login.html`** từ thư mục dự án

## 🚀 **Cách 4: Sử dụng Live Server (Khuyến nghị cho phát triển)**

Nếu bạn có Visual Studio Code:
1. **Cài đặt extension "Live Server"**
2. **Right-click vào file `login.html`**
3. **Chọn "Open with Live Server"**

##  **Vị trí file:**

Dựa trên thông tin workspace của bạn, các file nằm ở:
```
D:\Web check linh kiện\
├── login.html (trang chính)
├── index.html (trang quản lý)
├── login-styles.css
├── login-script.js
├── styles.css
├── script.js
└── README.md
```

## ✅ **Sau khi mở:**

- Trang đăng nhập sẽ hiển thị với giao diện đẹp mắt
- Liên hệ quản trị viên để được cấp tài khoản
- Sau khi đăng nhập thành công, sẽ chuyển hướng đến trang quản lý linh kiện
- Có 8 linh kiện mẫu được tải sẵn trong hệ thống

**Khuyến nghị:** Sử dụng **Cách 1** (double-click file `login.html`) vì đơn giản và nhanh nhất! 🎯 