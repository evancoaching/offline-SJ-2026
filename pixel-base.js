/* Meta Pixel — House Hacking San Jose (EVC)
   Base code dùng chung cho toàn bộ site static (mỗi trang include 1 dòng
   <script src="/pixel-base.js"></script>) để tránh lặp lại / quên update
   Pixel ID khi sửa từng file HTML riêng lẻ.
   Pixel ID: 529476062863594 (đã verify hoạt động qua Webflow). */
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
