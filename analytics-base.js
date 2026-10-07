/* Vercel Web Analytics — House Hacking San Jose (EVC)
   Base code dùng chung cho toàn bộ site static (mỗi trang include 1 dòng
   <script src="/analytics-base.js"></script>), cùng pattern với pixel-base.js.

   Site này là HTML tĩnh, KHÔNG phải Next.js — nên dùng script loader của Vercel
   thay cho package @vercel/analytics + component <Analytics/>.
   Đường dẫn /_vercel/insights/script.js chỉ được Vercel Edge phục vụ trên
   deployment thật; mở file bằng file:// hoặc server local sẽ 404 (bình thường).

   UTM (utm_source / utm_medium / utm_campaign / utm_content...) được Vercel tự
   động đọc từ URL của mỗi pageview, không cần khai báo thêm. */

window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

(function () {
  var script = document.createElement('script');
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);

  /* Mọi CTA trên site đã có sẵn thuộc tính data-track-content (dùng cho utm_content),
     nên tái sử dụng luôn làm tên custom event — không phải sửa từng nút.
     Dùng capture phase để event được đẩy vào hàng đợi TRƯỚC khi app.js gọi
     preventDefault() rồi điều hướng sang trang khác. */
  document.addEventListener('click', function (event) {
    var target = event.target;
    var link = target && target.closest && target.closest('a[data-track-content]');
    if (!link) return;
    var slug = link.dataset.trackContent;
    window.va('event', { name: 'CTA: ' + slug, data: { cta: slug } });
  }, true);
})();
