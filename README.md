# Hệ thống Quản lý Linh kiện

## Tính năng mới: Lưu dữ liệu tạm thời

### Mô tả
Hệ thống hiện đã được cải tiến với tính năng **tự động lưu dữ liệu tạm thời** khi bạn nhập thông tin linh kiện. Điều này giúp bạn không bị mất dữ liệu khi:
- Tắt trình duyệt đột ngột
- Đăng xuất và đăng nhập lại
- Chuyển sang tab khác
- Gặp sự cố mạng

### Cách hoạt động

#### 1. Tự động lưu
- Khi bạn nhập bất kỳ thông tin nào vào form "Thêm Linh kiện", dữ liệu sẽ được tự động lưu vào localStorage
- Dữ liệu được lưu theo thời gian thực khi bạn gõ
- Bao gồm tất cả các trường: tên, chủ đề, số lượng, mức độ ưu tiên, người soạn, người kiểm tra, mô tả, vị trí và hình ảnh

#### 2. Tự động khôi phục
- Khi bạn mở lại form "Thêm Linh kiện", hệ thống sẽ tự động kiểm tra xem có dữ liệu đã lưu không
- Nếu có, dữ liệu sẽ được điền lại vào form
- Bạn sẽ thấy thông báo: "Đã khôi phục dữ liệu bạn đã nhập trước đó!"

#### 3. Xóa dữ liệu tạm thời
- Nút "Xóa dữ liệu tạm thời" sẽ xuất hiện ở góc trái dưới form khi có dữ liệu đã lưu
- Nhấn nút này để xóa dữ liệu tạm thời và reset form
- Dữ liệu cũng sẽ tự động bị xóa khi:
  - Bạn lưu linh kiện thành công
  - Bạn reset form
  - Dữ liệu quá cũ (sau 24 giờ)

### Lưu ý quan trọng

1. **Chỉ hoạt động với form "Thêm Linh kiện"**: Tính năng này chỉ hoạt động khi thêm linh kiện mới, không áp dụng cho việc sửa linh kiện

2. **Dữ liệu chỉ lưu trên trình duyệt hiện tại**: Dữ liệu không đồng bộ giữa các thiết bị hoặc trình duyệt khác nhau

3. **Tự động xóa sau 24 giờ**: Để tránh tích tụ dữ liệu cũ, hệ thống sẽ tự động xóa dữ liệu sau 24 giờ

4. **Không ảnh hưởng đến dữ liệu chính**: Dữ liệu tạm thời hoàn toàn tách biệt với dữ liệu linh kiện đã lưu

### Cách sử dụng

1. **Thêm linh kiện mới**:
   - Nhấn nút "Thêm Linh kiện"
   - Bắt đầu nhập thông tin
   - Dữ liệu sẽ được tự động lưu

2. **Khôi phục dữ liệu**:
   - Mở lại form "Thêm Linh kiện"
   - Dữ liệu sẽ tự động được điền lại
   - Tiếp tục nhập hoặc lưu

3. **Xóa dữ liệu tạm thời**:
   - Nhấn nút "Xóa dữ liệu tạm thời" (nếu có)
   - Form sẽ được reset hoàn toàn

### Hỗ trợ kỹ thuật

Nếu gặp vấn đề với tính năng này, hãy:
1. Kiểm tra xem trình duyệt có hỗ trợ localStorage không
2. Thử xóa cache trình duyệt
3. Kiểm tra xem có add-on nào chặn localStorage không

---

**Lưu ý**: Tính năng này được thiết kế để cải thiện trải nghiệm người dùng và giảm thiểu việc mất dữ liệu. Hãy sử dụng một cách hợp lý và thường xuyên lưu dữ liệu chính thức. 