# Kế hoạch Follow-up Email & SMS
### House Hacking San Jose — Sự kiện 24/10/2026

---

## 0. Nguyên tắc chung

| | Email | SMS |
|---|---|---|
| **Áp dụng cho** | Cả Standard & VIP | **Chỉ VIP** (Standard không nhận SMS) |
| **Tần suất** | Thấp — chỉ dùng cho nội dung dài, quan trọng | Cao — kênh chính cho hầu hết các mốc liên lạc |
| **Độ dài** | Không giới hạn, có thể trình bày đầy đủ | **Dưới 160 ký tự**, viết **tiếng Việt không dấu** |
| **Vai trò** | Lưu trữ thông tin chính thức (xác nhận, hoá đơn, tài liệu, link) | Nhắc nhanh, tạo cảm giác khẩn — đúng nhịp với việc sale phải gọi điện qualify |

**Vì sao SMS chỉ dành cho VIP:** VIP là nhóm duy nhất cần phản hồi nhanh (sale gọi qualify trong 12h, gửi payment link, nhắc lịch trước ngày thanh toán giới hạn 12 chỗ) — SMS phù hợp cho tốc độ này. Standard chỉ cần theo dõi qua email vì không có bước xử lý cấp tốc nào.

**3 giai đoạn:**
1. **CONFIRM** — ngay sau đăng ký đến khi VIP hoàn tất thanh toán (đây là giai đoạn quan trọng nhất, quyết định tỷ lệ chuyển đổi VIP)
2. **REMINDER** — trước ngày sự kiện
3. **FULFILLMENT** — sau sự kiện (giao recording/tài liệu, bước tiếp theo)

**Tuân thủ SMS compliance (số điện thoại US → áp dụng TCPA/CTIA):** tin SMS đầu tiên gửi cho mỗi người phải có dòng cho phép nhận tin + hướng dẫn từ chối (`Tra loi STOP de ngung nhan tin`).

---

## 1. Bảng tổng quan toàn bộ funnel follow-up

| # | Giai đoạn | Vé | Kênh | Thời điểm | Mục tiêu |
|---|---|---|---|---|---|
| 1 | Confirm | Standard | Email | T+0 (ngay sau submit) | Xác nhận đăng ký, set kỳ vọng nhận recording sau 5 ngày |
| 2 | Confirm | VIP | **SMS** | T+0 (ngay lập tức) | Xác nhận đã nhận đăng ký, báo sale sẽ gọi trong 12h |
| 3 | Confirm | VIP | Email | T+0 (vài phút sau SMS) | Bản xác nhận đầy đủ, chi tiết sự kiện + kỳ vọng cuộc gọi |
| 4 | Confirm | VIP | **SMS** | T+12h nếu sale chưa liên lạc được | Xin lại khung giờ thuận tiện |
| 5 | Confirm | VIP | **SMS** | T+24h nếu vẫn chưa liên lạc được (lần 2) | Nhắc lại, để lại số callback |
| 6 | Confirm | VIP | **SMS** + Email | Ngay sau khi sale qualify xong | Báo đã gửi payment link (SMS ngắn) + hoá đơn/chi tiết (Email đầy đủ) |
| 7 | Confirm | VIP | **SMS** + Email | Ngay sau khi thanh toán thành công | Xác nhận giữ chỗ thành công |
| 8 | Confirm | VIP | **SMS** + Email | Nếu KHÔNG qualify | Từ chối khéo, chuyển hướng sang nhận recording miễn phí |
| 9 | Reminder | Standard | Email | T-1 ngày *(tuỳ chọn)* | Giữ engagement, nhắc recording sắp tới |
| 10 | Reminder | VIP | Email | T-7 ngày | Thông tin chi tiết: địa chỉ, giờ giấc, cần chuẩn bị gì |
| 11 | Reminder | VIP | **SMS** | T-3 ngày | Nhắc ngắn ngày giờ địa điểm |
| 12 | Reminder | VIP | **SMS** | T-1 ngày / sáng sự kiện | Nhắc final + link chỉ đường |
| 13 | Fulfillment | Standard | Email | T+5 ngày sau event | Gửi recording + link đặt lịch tư vấn 15 phút |
| 14 | Fulfillment | Standard | Email *(tuỳ chọn)* | T+10 ngày | Nhắc đặt lịch tư vấn nếu chưa book |
| 15 | Fulfillment | VIP | Email | T+1–2 ngày sau event | Gửi slide/recording/tài liệu độc quyền + bước tiếp theo (ADU quote, pre-approval) |
| 16 | Fulfillment | VIP | **SMS** | Tối cùng ngày event hoặc T+1 | Cảm ơn ngắn + báo tài liệu đã gửi qua email |
| 17 | Fulfillment | VIP | **SMS** + Email | Nếu no-show (đã thanh toán nhưng không đến) | Xin lỗi bỏ lỡ, gửi recording, đề nghị sắp xếp tư vấn riêng |

---

## 2. GIAI ĐOẠN CONFIRM

### 2.1 Standard — Email xác nhận (T+0)

**Subject:** Xác nhận đăng ký — House Hacking San Jose (Vé Standard)

**Nội dung:**
```
Chào {{contact.firstname}},

Cảm ơn Anh/Chị đã đăng ký vé Standard cho sự kiện House Hacking San Jose —
Chiến lược giảm 30% Monthly Payment.

Đây là những gì Anh/Chị sẽ nhận được:
✓ Recording trọn buổi chia sẻ, gửi qua email này trong vòng 5 ngày sau khi
  sự kiện kết thúc (24/10/2026)
✓ Được đặt lịch hẹn 15 phút tư vấn giải đáp sau khi xem recording

Anh/Chị không cần làm gì thêm lúc này — cứ để ý hộp thư (và mục Spam/
Promotions) quanh ngày 29/10/2026 nhé.

Nếu muốn tham dự trực tiếp và nhận thêm nhiều đặc quyền (đánh giá loan
qualification, pre-approval, tư vấn 1:1...), Anh/Chị có thể nâng cấp lên
vé VIP tại đây: {{event_page_url}}#ticket

Hẹn gặp lại,
Evan Coaching
```

### 2.2 VIP — SMS xác nhận ngay (T+0)

> **145 ký tự** — đã kiểm tra dưới 160

```
Evan Coaching: Da nhan dang ky ve VIP House Hacking SJ. Assistant se goi tu (408) 689-6282 trong 12h de xac nhan. Tra loi STOP de ngung nhan tin.
```

### 2.3 VIP — Email xác nhận đầy đủ (T+0, vài phút sau SMS)

**Subject:** Đã nhận đăng ký VIP — Evan's Assistant sẽ gọi trong 12h

**Nội dung:**
```
Chào {{contact.firstname}},

Cảm ơn Anh/Chị đã đăng ký vé VIP cho House Hacking San Jose. Đây là các
bước tiếp theo:

1. Evan's Assistant sẽ gọi lại từ số (408) 689-6282 trong vòng 12 giờ tới
   để xác nhận chương trình phù hợp với Anh/Chị và hướng dẫn các bước
   thanh toán.
2. Sau cuộc gọi, nếu phù hợp, Anh/Chị sẽ nhận link thanh toán giữ chỗ
   ($35/người — chỉ giới hạn 12 chỗ).
3. Sau khi thanh toán, chỗ ngồi của Anh/Chị chính thức được giữ.

Thông tin sự kiện:
📅 Thứ Bảy, 24/10/2026
🕥 10:30 AM – 1:00 PM (PDT)
📍 1900 Camden Ave, San Jose, CA 95124

Anh/Chị vui lòng để ý điện thoại trong khung giờ hành chính nhé. Nếu có
câu hỏi gì trước cuộc gọi, cứ reply email này.

Evan Coaching
```

### 2.4 VIP — SMS nhắc lại nếu chưa liên lạc được (T+12h)

> **128 ký tự**

```
Evan Coaching: Chua goi duoc cho Anh/Chi. Se thu lai tu (408) 689-6282. Anh/Chi ranh khung gio nao hom nay? Vui long reply giup.
```

### 2.5 VIP — SMS nhắc lần 2 (T+24h, nếu vẫn chưa liên lạc được)

> **142 ký tự**

```
Evan Coaching: Chua lien lac duoc lan 2. Assistant se co gang goi lai trong hom nay tu (408) 689-6282. Neu can, Anh/Chi co the goi lai so nay.
```

*Ghi chú vận hành: nếu sau lần 2 vẫn không liên lạc được, chuyển sang trạng thái "Cold — chưa qualify", có thể thử lại bằng email 1 lần rồi dừng, tránh làm phiền quá mức.*

### 2.6 VIP — Sau khi qualify: gửi payment link

**SMS** (gửi ngay khi sale kết thúc cuộc gọi & đánh dấu qualify trong HubSpot):

> **155 ký tự**

```
Evan Coaching: Chuc mung! Ho so cua Anh/Chi da qualify vé VIP. Link thanh toan giu cho da gui qua email. Vui long thanh toan som, chi con gioi han 12 cho.
```

**Email** (đồng thời, chứa link thanh toán thật):

**Subject:** Link thanh toán giữ chỗ VIP — House Hacking San Jose

```
Chào {{contact.firstname}},

Rất vui vì chương trình phù hợp với Anh/Chị! Đây là link thanh toán để
giữ chỗ VIP chính thức:

👉 {{payment_link}}

Chi tiết:
- Vé VIP: $35/người
- Chỉ còn giới hạn 12 chỗ cho toàn bộ sự kiện
- Vé bao gồm: đánh giá Loan Qualification cá nhân hoá, cơ hội nhận
  Pre-Approval sau sự kiện, danh sách listings phù hợp xây ADU, báo giá
  ADU chất lượng cao, combo staging toàn diện cho ADU, tea-break, và
  trao đổi trực tiếp với speakers

Vui lòng hoàn tất thanh toán sớm để giữ chỗ — số lượng có hạn và ưu tiên
theo thứ tự thanh toán.

Có câu hỏi gì, Anh/Chị cứ reply email này hoặc nhắn lại số (408) 689-6282.

Evan Coaching
```

### 2.7 VIP — Sau khi thanh toán thành công

**SMS:**

> **134 ký tự**

```
Evan Coaching: Da nhan thanh toan! Cho VIP cua Anh/Chi tai House Hacking SJ ngay 24/10 da duoc giu. Chi tiet su kien se gui qua email.
```

**Email — Subject:** Xác nhận thanh toán & giữ chỗ VIP thành công

```
Chào {{contact.firstname}},

Đã nhận thanh toán $35 — chỗ ngồi VIP của Anh/Chị tại House Hacking San
Jose đã được giữ chính thức!

📅 Thứ Bảy, 24/10/2026
🕥 10:30 AM – 1:00 PM (PDT)
📍 1900 Camden Ave, San Jose, CA 95124

Biên nhận thanh toán được đính kèm/xem tại: {{receipt_link}}

Anh/Chị sẽ nhận thêm email nhắc lịch chi tiết (đường đi, chỗ đỗ xe, những
gì cần mang theo) vào khoảng 1 tuần trước sự kiện.

Hẹn gặp Anh/Chị ngày 24/10!

Evan Coaching
```

### 2.8 VIP — Nếu KHÔNG qualify (từ chối khéo)

**SMS:**

> **137 ký tự**

```
Evan Coaching: Cam on Anh/Chi da quan tam vé VIP. Chuong trinh hien chua phu hop giai doan nay. Recording su kien se duoc gui qua email.
```

**Email — Subject:** Cảm ơn Anh/Chị đã quan tâm — House Hacking San Jose

```
Chào {{contact.firstname}},

Cảm ơn Anh/Chị đã dành thời gian trao đổi cùng đội ngũ Evan Coaching.
Sau khi trao đổi, chương trình VIP hiện tại chưa thật sự phù hợp với
tình hình của Anh/Chị ở giai đoạn này.

Đừng lo — Anh/Chị vẫn sẽ nhận được recording trọn buổi chia sẻ qua email
này trong vòng 5 ngày sau khi sự kiện kết thúc, hoàn toàn miễn phí.

Khi tình hình tài chính/kế hoạch mua nhà của Anh/Chị sẵn sàng hơn, đội
ngũ Evan Coaching luôn sẵn sàng đồng hành. Cảm ơn Anh/Chị!

Evan Coaching
```

---

## 3. GIAI ĐOẠN REMINDER (trước sự kiện)

### 3.1 Standard — Email nhắc nhẹ (T-1 ngày, tuỳ chọn)

**Subject:** House Hacking San Jose diễn ra ngày mai — recording sẽ có sau 5 ngày

```
Chào {{contact.firstname}},

Ngày mai (24/10/2026) House Hacking San Jose sẽ diễn ra! Vì Anh/Chị đăng
ký vé Standard nên không cần đến trực tiếp — recording trọn buổi chia sẻ
sẽ được gửi vào email này khoảng 5 ngày sau khi sự kiện kết thúc.

Trong lúc chờ, nếu Anh/Chị muốn tham dự trực tiếp và nhận thêm tư vấn
1:1, vé VIP vẫn còn vài chỗ trống: {{event_page_url}}#ticket

Hẹn gặp lại qua recording!

Evan Coaching
```

### 3.2 VIP — Email nhắc chi tiết (T-7 ngày)

**Subject:** Còn 1 tuần nữa — chuẩn bị gì cho House Hacking San Jose

```
Chào {{contact.firstname}},

Chỉ còn 1 tuần nữa là đến House Hacking San Jose! Đây là thông tin chi
tiết để Anh/Chị chuẩn bị:

📅 Thứ Bảy, 24/10/2026
🕥 10:30 AM – 1:00 PM (PDT) — vui lòng có mặt trước 10:15 AM
📍 1900 Camden Ave, San Jose, CA 95124 (Văn phòng BRG Realty)

Nên mang theo:
- Giấy tờ tuỳ thân
- Nếu đã có sẵn thông tin thu nhập/tình hình tài chính sơ bộ, mang theo
  sẽ giúp buổi đánh giá Loan Qualification chính xác hơn

Chỗ đỗ xe: {{parking_info}}
Xem đường đi: {{maps_link}}

Anh/Chị sẽ nhận thêm 1 tin nhắn nhắc lịch ngắn gọn gần ngày sự kiện.

Hẹn gặp Anh/Chị!

Evan Coaching
```

### 3.3 VIP — SMS nhắc (T-3 ngày)

> **126 ký tự**

```
Evan Coaching: Nhac lich - House Hacking SJ dien ra Thu Bay 24/10, 10:30 sang, tai 1900 Camden Ave, San Jose. Hen gap Anh/Chi!
```

### 3.4 VIP — SMS nhắc cuối / sáng sự kiện (T-1 ngày hoặc sáng 24/10)

> **113 ký tự**

```
Evan Coaching: Hom nay 24/10, 10:30 sang tai 1900 Camden Ave, San Jose. Xem duong: evc.link/map. Hen gap Anh/Chi!
```

*(`evc.link/map` là link rút gọn mẫu — thay bằng short link thật trỏ đến Google Maps khi triển khai)*

---

## 4. GIAI ĐOẠN FULFILLMENT (sau sự kiện)

### 4.1 Standard — Email giao recording (T+5 ngày)

**Subject:** Recording House Hacking San Jose đã sẵn sàng

```
Chào {{contact.firstname}},

Recording trọn buổi chia sẻ House Hacking San Jose đã sẵn sàng!

▶️ Xem recording: {{recording_link}}
📄 Slide (nếu có): {{slide_link}}

Sau khi xem xong, Anh/Chị có thể đặt lịch hẹn 15 phút tư vấn giải đáp
cùng đội ngũ Evan Coaching tại đây:

👉 {{booking_link}}

Cảm ơn Anh/Chị đã đồng hành cùng sự kiện!

Evan Coaching
```

### 4.2 Standard — Email nhắc đặt lịch tư vấn (T+10 ngày, tuỳ chọn, chỉ gửi nếu chưa book)

**Subject:** Đã xem recording chưa? Đặt lịch tư vấn 15 phút miễn phí

```
Chào {{contact.firstname}},

Nếu Anh/Chị đã xem xong recording House Hacking San Jose, đây là lúc đặt
lịch hẹn 15 phút tư vấn giải đáp miễn phí cùng đội ngũ Evan Coaching —
để làm rõ những gì áp dụng được cho tình hình cụ thể của Anh/Chị:

👉 {{booking_link}}

Evan Coaching
```

### 4.3 VIP — Email giao tài liệu sau sự kiện (T+1–2 ngày)

**Subject:** Cảm ơn đã tham dự! Slide, recording & bước tiếp theo

```
Chào {{contact.firstname}},

Cảm ơn Anh/Chị đã dành thời gian tham dự House Hacking San Jose! Đây là
tài liệu và bước tiếp theo dành riêng cho Anh/Chị:

📄 Slide buổi chia sẻ: {{slide_link}}
▶️ Recording: {{recording_link}}
🏠 Báo giá ADU chất lượng cao: {{adu_quote_link}}
🎁 Combo staging toàn diện cho ADU: {{staging_link}}

Bước tiếp theo:
Nếu buổi đánh giá Loan Qualification cho thấy Anh/Chị đủ điều kiện,
Evan's Assistant sẽ liên hệ để hỗ trợ quy trình Pre-Approval và các
bước tiếp theo trong kế hoạch mua nhà & xây ADU.

Có câu hỏi gì, Anh/Chị cứ reply email này hoặc nhắn (408) 689-6282.

Evan Coaching
```

### 4.4 VIP — SMS cảm ơn (tối cùng ngày hoặc T+1)

> **117 ký tự**

```
Evan Coaching: Cam on Anh/Chi da tham du House Hacking SJ! Slide & recording se gui qua email trong 24h. Hen gap lai!
```

### 4.5 VIP — No-show (đã thanh toán nhưng không đến)

**SMS:**

> **120 ký tự**

```
Evan Coaching: Tiec la da lo su kien hom nay. Chung toi se gui recording qua email va lien he sap xep buoi tu van rieng.
```

**Email — Subject:** Rất tiếc đã lỡ sự kiện — đây là recording & bước tiếp theo

```
Chào {{contact.firstname}},

Rất tiếc Anh/Chị không thể tham dự House Hacking San Jose hôm nay. Đội
ngũ Evan Coaching vẫn gửi đầy đủ tài liệu để Anh/Chị không bỏ lỡ thông
tin quan trọng:

▶️ Recording: {{recording_link}}
📄 Slide: {{slide_link}}

Vì Anh/Chị đã đăng ký vé VIP, đội ngũ sẽ liên hệ để sắp xếp 1 buổi tư vấn
1:1 riêng thay thế phần đánh giá Loan Qualification trực tiếp tại sự
kiện. Evan's Assistant sẽ gọi lại trong thời gian sớm nhất.

Evan Coaching
```

---

## 5. Quy trình nội bộ hỗ trợ tốc độ follow-up (SLA)

Vì doanh thu VIP phụ thuộc hoàn toàn vào tốc độ + chất lượng cuộc gọi qualify ngay sau khi lead điền form, cần 1 quy trình nội bộ chặt chẽ đi kèm plan nhắn tin ở trên:

| Bước | SLA nội bộ | Cách thực hiện |
|---|---|---|
| VIP form submit → Sale nhận task gọi | **Trong vòng 1 giờ hành chính** (tối đa 12h ngoài giờ) | HubSpot Workflow: trigger khi submit "VIP Form" → tạo Task giao cho sale + gửi thông báo Slack/email nội bộ ngay lập tức |
| Sale gọi lần 1 không được → follow-up | Trong 12h | Trigger SMS mục 2.4 tự động nếu `call_status` chưa được cập nhật sau 12h |
| Sale gọi lần 2 không được → follow-up | Trong 24h | Trigger SMS mục 2.5, đồng thời cảnh báo quản lý sale nếu vẫn chưa liên lạc được sau 2 lần |
| Qualify xong → gửi payment link | **Trong vòng 30 phút** sau cuộc gọi | Sale cập nhật property `qualified = true` trong HubSpot → tự động trigger SMS + Email mục 2.6 |
| Thanh toán xong → xác nhận | **Ngay lập tức** (tự động) | Webhook từ Stripe/PayPal → cập nhật `payment_status = paid` trong HubSpot → tự động trigger SMS + Email mục 2.7 |

**Gợi ý HubSpot Workflow (properties cần tạo trên Contact hoặc Deal):**
- `ticket_type` (Standard / VIP)
- `call_status` (Not contacted / Attempted 1 / Attempted 2 / Reached)
- `qualified` (true/false)
- `payment_status` (Pending / Paid)

Từ 4 property này, dựng 1 Workflow chính cho VIP với các nhánh rẽ (branch) tương ứng đúng 5 mốc SMS/Email ở Giai đoạn Confirm (2.2 → 2.8) — mỗi nhánh có delay + điều kiện kiểm tra property tương ứng trước khi gửi, tránh gửi nhầm/gửi trùng giữa các nhánh.

---

## 6. Checklist triển khai

- [ ] Tạo 4 property (`ticket_type`, `call_status`, `qualified`, `payment_status`) trên HubSpot Contact/Deal
- [ ] Dựng Workflow Email cho Standard (Confirm → Reminder tuỳ chọn → Fulfillment → Fulfillment follow-up)
- [ ] Dựng Workflow Email + SMS cho VIP (toàn bộ 8 mốc ở mục 2, 2 mốc reminder mục 3.3–3.4, 2 mốc fulfillment mục 4.3–4.5)
- [ ] Kết nối kênh SMS (HubSpot SMS extension từ Marketplace, hoặc Twilio + Workflow Webhook) — xác nhận Compliance/Opt-out đã bật
- [ ] Test toàn bộ luồng VIP end-to-end với 1 số điện thoại/email thật trước khi chạy ads thật
- [ ] Đối chiếu nội dung SMS/Email với đúng thông tin quyền lợi từng vé đang hiển thị trên landing page (`index.html`) trước khi launch, tránh sai lệch thông tin
