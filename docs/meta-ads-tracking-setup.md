# Hướng dẫn Setup Tracking Conversion cho Meta Ads
### House Hacking San Jose — LP → Form → TYP → Sales Call → Payment

---

## 0. Bối cảnh & vì sao đây là bài toán khó hơn bình thường

**Funnel thật của event:**

```
Meta Ads (FB/IG)
   ↓
Landing Page (Vercel, domain EVC) — index.html
   ↓  (click "Đăng ký vé")
Trang form riêng theo vé — /standard/ hoặc /vip/ (embed HubSpot Form)
   ↓  (submit form → HubSpot lưu submission)
Trang Thank You riêng — /standard-ty/ hoặc /vip-ty/
   ↓ (chỉ với VIP)
Sales gọi điện qualify (trong 12h, từ (408) 689-6282)
   ↓ (nếu qualify)
Sales gửi payment link (Stripe/PayPal…) — KHÔNG nằm trên domain EVC
   ↓
Khách thanh toán $35 → đây mới là "Purchase" thật
```

**Vấn đề cốt lõi:** Campaign Goal là **Sales → Purchase**, nhưng hành động "Purchase" thật sự xảy ra:
- **Trễ** (vài giờ đến vài ngày sau khi lead điền form — vì phải qua bước sale gọi qualify)
- **Ngoài site** (trên trang thanh toán của Stripe/PayPal, không phải trên domain EVC)

→ Pixel (client-side) đặt trên site **không thể tự bắt được** sự kiện Purchase này. Bắt buộc phải kết hợp **Pixel + Conversions API (server-side)**, và phải giữ được định danh khách hàng (email/phone) xuyên suốt từ lúc điền form đến lúc thanh toán để Meta match lại đúng người + đúng lượt click quảng cáo gốc.

Guide này đi theo đúng thứ tự cần làm, từ chuẩn bị tài khoản đến khi lên campaign.

---

## Phần A — Chuẩn bị (Prerequisites)

Checklist quyền truy cập cần có trước khi bắt đầu:

- [ ] Quyền **Admin** trên Meta Business Manager (business.facebook.com)
- [ ] Quyền truy cập **Ad Account** đang/sẽ chạy campaign
- [ ] Quyền truy cập **DNS của domain EVC** (để verify domain — cách nhanh nhất) *hoặc* quyền chỉnh code + deploy trên Vercel (cách thay thế)
- [ ] Quyền **HubSpot**: Forms, Contacts/Deals properties, Workflows, Integrations settings
  - Nếu muốn dùng Workflow gọi Webhook/Custom Code → cần **Marketing Hub Professional** trở lên hoặc **Operations Hub**
- [ ] Quyền chỉnh sửa repo code (`index.html`, `standard/`, `vip/`, `standard-ty/`, `vip-ty/`, `app.js`) và quyền deploy Vercel
- [ ] (Nếu dùng Cách 2 ở Phần F) Có thể thêm 1 Vercel Serverless Function nhỏ vào repo hiện tại

---

## Phần B — Bước 1: Tạo Meta Pixel

1. Vào **Events Manager** → *Connect Data Sources* → **Web** → **Meta Pixel**
2. Đặt tên rõ ràng, ví dụ: `EVC House Hacking Pixel`
3. Gắn Pixel vào đúng Ad Account sẽ chạy campaign
4. Lưu lại **Pixel ID** (dãy ~15-16 chữ số) — dùng ở Bước 3

---

## Phần C — Bước 2: Domain Verification

**Vì sao cần:** Từ iOS 14.5, Meta giới hạn tối đa **8 sự kiện được ưu tiên đo lường mỗi domain** (Aggregated Event Measurement). Phải verify domain thì mới cấu hình được thứ tự ưu tiên sự kiện (Purchase phải được ưu tiên cao nhất).

1. Business Settings → **Brand Safety** → **Domains** → *Add* → nhập domain đang host LP (domain EVC)
2. Chọn 1 trong 2 cách xác minh:
   - **Cách A (khuyên dùng, nếu có quyền DNS):** thêm TXT record Meta cung cấp vào DNS của domain
   - **Cách B (nếu chỉ có quyền code, không có quyền DNS):** tải file HTML xác minh Meta cung cấp (dạng `facebook-domain-verification-xxxxxxxx.html`), đặt file này vào **thư mục gốc của repo** (ngang hàng `index.html`) → Vercel sẽ tự serve tại `https://domain/facebook-domain-verification-xxxxxxxx.html`
3. Bấm **Verify**

---

## Phần D — Bước 3: Cài Pixel Base Code lên toàn bộ trang ✅ Đã triển khai

**Pixel ID thật đang dùng:** `529476062863594` (đã verify hoạt động ổn định qua Webflow trước đây — đối chiếu lại: code Webflow gửi qua chính là bản gốc chuẩn của Meta, IIFE giống hệt bản trong repo, chỉ khác là Webflow paste trực tiếp mỗi trang còn ở đây gom vào 1 file dùng chung).

Vì đây là site **static, nhiều trang, không có layout dùng chung** (mỗi trang là 1 file HTML riêng), Pixel base code cần có mặt ở **tất cả các trang** trong funnel. **Không copy script trực tiếp vào từng file** (khó update Pixel ID sau này, dễ quên khi thêm trang mới) — đã tạo 1 file dùng chung `/pixel-base.js` ở thư mục gốc repo, include bằng 1 dòng trong `<head>` mỗi trang (đường dẫn tuyệt đối `/pixel-base.js`, hoạt động đúng dù trang ở root hay subfolder):

```html
<!-- Meta Pixel Code -->
<script src="/pixel-base.js"></script>
<!-- End Meta Pixel Code -->
```

Nội dung file `pixel-base.js` (đã tạo trong repo, dùng đúng Pixel ID thật):

```js
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '529476062863594');
fbq('track', 'PageView');
```

Ngoài script, mỗi trang cũng cần thẻ `<noscript>` fallback (cho trường hợp trình duyệt tắt JS) — chèn ngay sau khi mở `<body>`:

```html
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=529476062863594&ev=PageView&noscript=1"
/></noscript>
```

**Đã cài trên 6/6 trang trong funnel + trang legacy:**

| Trang | Trạng thái |
|---|---|
| `index.html` | ✅ Đã cài |
| `standard/index.html` | ✅ Đã cài |
| `vip/index.html` | ✅ Đã cài |
| `standard-ty/index.html` | ✅ Đã cài |
| `vip-ty/index.html` | ✅ Đã cài |
| `thank-you/index.html` (legacy, không còn link nội bộ nào trỏ tới, nhưng vẫn có thể còn traffic từ link cũ) | ✅ Đã cài |
| `thank-you-standard/`, `thank-you-vip/` (chỉ là trang redirect stub, chuyển hướng ngay lập tức) | ⏭ Bỏ qua — script async không kịp fire trước khi trang redirect đi, không có giá trị đo lường |

**Bước tiếp theo còn lại (chưa làm):** Phần C (Domain Verification) và Phần E (gắn event `Lead`/`VIPLead` trên 2 trang TYP) — hiện tại mới chỉ có `PageView` tự động chạy trên mọi trang.

---

## Phần E — Bước 4: Gắn sự kiện theo từng bước funnel

| Trang | Sự kiện Meta | Khi nào fire | Ghi chú / parameters |
|---|---|---|---|
| Mọi trang | `PageView` | Tự động, trong base code | — |
| `index.html` — nút "Đăng ký vé Standard/VIP" | `ViewContent` *(tuỳ chọn)* | Khi click nút chọn vé | `content_name: 'standard'` / `'vip'` — báo hiệu intent, chưa phải lead thật |
| `standard-ty/index.html` | `Lead` | Khi trang TYP load (= form đã submit thành công) | `content_name: 'standard_ticket'` |
| `vip-ty/index.html` | `Lead` + Custom `VIPLead` | Khi trang TYP load | `content_name: 'vip_ticket'` — đây là event quan trọng nhất trong giai đoạn đầu (dùng để tối ưu campaign tạm thời, xem Phần H) |
| Trang xác nhận thanh toán *(cần tạo mới)* | `Purchase` | Sau khi khách VIP thanh toán thành công | `value: 35.00, currency: 'USD'` |

**Code chèn cuối `standard-ty/index.html`** (trước `</body>`):

```html
<script>
  if (typeof fbq === 'function') {
    fbq('track', 'Lead', { content_name: 'standard_ticket' });
  }
</script>
```

**Code chèn cuối `vip-ty/index.html`:**

```html
<script>
  if (typeof fbq === 'function') {
    fbq('track', 'Lead', { content_name: 'vip_ticket' });
    fbq('trackCustom', 'VIPLead');
  }
</script>
```

⚠️ **Lưu ý chống double-count:** nếu khách bấm F5/refresh trang TYP, event sẽ fire lại. Có thể chấp nhận (Meta tự khử trùng tương đối tốt ở tầng Lead) hoặc dùng `sessionStorage` để chỉ fire 1 lần/phiên nếu cần chính xác tuyệt đối.

---

## Phần F — Bước 5: Xử lý sự kiện Purchase (phần quan trọng & khó nhất)

Vì thanh toán KHÔNG diễn ra trên domain EVC, đây là điểm gãy dữ liệu chính. Có 3 cách, **nên làm Cách 1 trước, sau đó bổ sung Cách 2 để tăng độ chính xác**:

### Cách 1 (làm ngay, không cần dev) — Redirect về trang "Purchase Confirmation" tự tạo

1. Nếu dùng **Stripe Payment Link**: vào cấu hình link → mục *"After payment"* → chọn *Redirect customers to your website* → nhập URL trang mới trên domain EVC, ví dụ `https://domain/payment-thank-you/`
2. Tạo trang `payment-thank-you/index.html` (theo đúng style `.thank-page`/`.thank-card` đang có trong `styles.css`), gắn:

```html
<script>
  if (typeof fbq === 'function') {
    fbq('track', 'Purchase', {
      value: 35.00,
      currency: 'USD',
      content_name: 'vip_ticket'
    });
  }
</script>
```

- ✅ Ưu điểm: dễ làm, không cần backend
- ⚠️ Nhược điểm: chỉ bắt được nếu khách thanh toán **cùng trình duyệt/thiết bị** với lúc điền form ban đầu → Event Match Quality thấp hơn, dễ mất data nếu khách chuyển thiết bị (ví dụ điền form trên điện thoại, thanh toán trên máy tính khi nói chuyện với sale)

### Cách 2 (khuyên dùng song song để chính xác hơn) — Conversions API (CAPI) qua HubSpot Workflow

**Điều kiện:** HubSpot Marketing Hub Professional+ (Workflow → Webhook action) hoặc Operations Hub (Custom Code action)

**Luồng hoạt động:**

```
Sale đánh dấu Deal/Contact "Đã thanh toán"
   (property, vd payment_status = paid)
        ↓
HubSpot Workflow (trigger: property thay đổi)
        ↓
Webhook action → gọi 1 API endpoint nhỏ
        ↓
Vercel Serverless Function (/api/capi-purchase)
   - hash email/phone bằng SHA256
   - format đúng payload chuẩn Meta CAPI
        ↓
POST → https://graph.facebook.com/v19.0/{PIXEL_ID}/events
```

**Việc cần làm:**
1. Events Manager → Settings → **Conversions API** → *Generate Access Token*
2. Thêm 1 file `api/capi-purchase.js` vào repo hiện tại (repo đã có sẵn hạ tầng Vercel, việc thêm 1 serverless function là khả thi, không cần đổi kiến trúc site)
3. Trong function, đảm bảo hash `email`/`phone_number` bằng SHA256 trước khi gửi (Meta yêu cầu bắt buộc, KHÔNG được gửi plain text)
4. Đây là phần cần dev hỗ trợ — ước tính effort: nhỏ (1 function, không có UI)

### Cách 3 (nếu chưa có dev, cần triển khai gấp) — Zapier/Make làm cầu nối

- Trigger: HubSpot Deal chuyển stage "Closed Won" (hoặc property `payment_status` đổi)
- Action: dùng app có sẵn **"Facebook Conversions API"** trên Zapier/Make (tự động hash, không cần tự viết code)
- Đánh đổi: tốn thêm chi phí subscription Zapier/Make, nhưng triển khai nhanh, không cần dev

**Khuyến nghị lộ trình:** Làm Cách 1 ngay tuần này (miễn phí, nhanh) trong lúc sắp xếp dev làm Cách 2. Nếu cần chạy ads ngay mà chưa có dev, dùng Cách 3 làm giải pháp tạm.

---

## Phần G — Bước 6: Event Match Quality — giữ định danh xuyên suốt funnel

Vì Purchase xảy ra **trễ** (vài ngày sau Lead), phải đảm bảo dữ liệu định danh (email/phone/fbclid) được giữ nguyên và truyền đi xuyên suốt để Meta match lại đúng người + đúng lượt click quảng cáo gốc:

1. **Lưu `fbclid`:** File `app.js` hiện đã có logic lưu `utm_source`/`utm_medium`/`utm_content` xuyên suốt các trang (hàm `addTrackingToUrl`). Cần **mở rộng thêm `fbclid`** theo đúng pattern này, để khi cần gửi CAPI event sau này (khi Purchase xảy ra ở bước sale, tách rời trình duyệt), vẫn có thể dựng lại `fbc` (Facebook click ID) để match.
2. Khi gửi Purchase qua CAPI (Cách 2/3), truyền kèm càng nhiều field càng tốt:
   - `em` (hashed email), `ph` (hashed phone)
   - `fbc` (từ cookie `_fbc`, hoặc dựng lại từ `fbclid` đã lưu)
   - `fbp` (từ cookie `_fbp`)
   - `client_ip_address`, `client_user_agent`
3. Kiểm tra điểm **Event Match Quality** trong Events Manager → Diagnostics (thang điểm 0–10, nên đạt >6, càng cao dữ liệu càng đáng tin).

---

## Phần H — Bước 7: Custom Conversions & ưu tiên sự kiện

1. Events Manager → **Custom Conversions** → *Create* → chọn event `VIPLead` (từ `trackCustom` ở Phần E) → đặt tên `VIP Lead (Interim)`
2. **Trong giai đoạn đầu** (khi Purchase volume còn thấp — Meta khuyến nghị cần ~50 conversions/tuần để thuật toán học ổn định), dùng `VIP Lead (Interim)` làm event tối ưu cho campaign
3. Khi Purchase đã đủ volume ổn định, **chuyển hẳn campaign optimization sang `Purchase`** — đúng với mục tiêu Sales dài hạn
4. **Aggregated Event Measurement:** Events Manager → domain đã verify (Phần C) → *Aggregated Event Measurement* → sắp xếp priority 8 events: `Purchase` (#1) → `Lead` (#2) → `VIPLead` (#3)

---

## Phần I — Bước 8: Thiết lập Campaign trên Ads Manager

1. Ads Manager → *Create Campaign* → Objective: **Sales**
2. Conversion location: **Website**
3. Conversion event: chọn Pixel đã tạo, event = `Purchase` (hoặc Custom Conversion `VIP Lead (Interim)` trong giai đoạn đầu — xem Phần H)
4. Performance goal: mặc định *Maximize number of conversions* — cân nhắc set *Cost per result goal* khi đã có đủ dữ liệu lịch sử (thường sau 2–4 tuần chạy)
5. Attribution setting: giữ mặc định (hiện tại Meta dùng 7-day click / 1-day view) — phù hợp vì chu kỳ mua kéo dài vài ngày do có bước gọi điện qualify
6. Cân nhắc Advantage+ Audience theo chiến lược targeting hiện tại của EVC

---

## Phần J — Bước 9: Test & QA trước khi launch

- [ ] Cài extension **Meta Pixel Helper** (Chrome) → duyệt qua từng trang: `/`, `/standard/`, `/vip/`, `/standard-ty/`, `/vip-ty/` → xác nhận Pixel fire đúng event, đúng thời điểm
- [ ] Events Manager → **Test Events** (nhập Test Event Code) → xem realtime cả Pixel (client) và CAPI (server) đổ về cùng lúc
- [ ] Nếu dùng cả Pixel lẫn CAPI cho cùng 1 event (ví dụ Purchase), **truyền cùng `eventID`** ở cả 2 phía để Meta tự động khử trùng (deduplication), tránh đếm double
- [ ] Test thử 1 giao dịch giả (end-to-end: điền form VIP → giả lập qualify → giả lập thanh toán) để xác nhận Purchase event đổ về đúng Pixel ID, đúng `value`

---

## Phần K — Vận hành & theo dõi định kỳ

- **Hàng tuần:** kiểm tra Events Manager → Diagnostics (cảnh báo thiếu tham số, Match Quality giảm)
- **Hàng tuần:** đối chiếu số Lead/Purchase trên Ads Manager với số liệu thật trong HubSpot (Forms Analytics + Deal pipeline) để phát hiện lệch số (double count hoặc mất event)
- **Sau 4 tuần chạy ổn định + đủ data:** cân nhắc chuyển hẳn optimization event sang `Purchase`, tắt Custom Conversion interim (`VIPLead`)

---

## Tóm tắt lộ trình triển khai (theo thứ tự ưu tiên)

| Ưu tiên | Việc cần làm | Ai làm | Cần dev? |
|---|---|---|---|
| 1 | Tạo Pixel + verify domain (Phần B, C) | Marketing/Admin | Không |
| 2 | ✅ Cài `pixel-base.js` lên tất cả trang (Phần D) — Pixel ID `529476062863594` | Dev | Có (nhỏ) — **đã xong** |
| 3 | Gắn `Lead`/`VIPLead` event trên 2 trang TYP (Phần E) | Dev | Có (nhỏ) |
| 4 | Tạo trang `payment-thank-you/` + cấu hình Stripe redirect (Phần F, Cách 1) | Dev + người quản lý payment link | Có (nhỏ) |
| 5 | Mở rộng `app.js` lưu `fbclid` (Phần G) | Dev | Có (nhỏ) |
| 6 | Custom Conversion + Aggregated Event Measurement priority (Phần H) | Marketing/Admin | Không |
| 7 | Launch campaign Objective Sales, optimize theo `VIPLead` tạm thời (Phần I) | Media buyer | Không |
| 8 | (Song song, không chặn launch) CAPI qua HubSpot Workflow hoặc Zapier (Phần F, Cách 2/3) | Dev / Ops | Có (vừa) |
