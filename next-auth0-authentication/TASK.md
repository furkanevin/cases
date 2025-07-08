Frontend 1. Aşama Task: Auth0 ile OAuth + JWT Entegrasyonu ve Next.js
Middleware Yetkilendirme Sistemi Geliştirme
Auth0 üzerinden kullanıcı girişinin yapıldığı, JWT tabanlı oturum kontrolü ile sayfa erişimi kısıtlanan, SOLID prensiplerine ve
12Factor ilkelerine uygun, Next.js + NextAuth temelli bir kimlik doğrulama ve yetkilendirme sistemi geliştirilecektir.
Teknolojiler & Araçlar
Next.js 14+ (App Router)
Auth0 (OAuth Provider)
NextAuth.js
JWT (JSON Web Token)
[TypeScript]
[TailwindCSS] (Login Sayfası)
Git / GitHub (dev/v1.0.0, prod/v1.0.0)
.env ile yapılandırma (12 Factor Uygulaması)
Görev Adımları

1.  GitHub Repository Oluştur
    next-auth adında public bir repo oluştur.
    Branch oluştur: dev/v1.0.0
    Tüm geliştirmeleri bu branchte saatlik veya günlük olarak yap.
2.  Auth0 Kurulumu
3.  NextAuth Entegrasyonu
4.  Middleware ile Sayfa Koruma
5.  Kod Kalitesi & SOLID
6.  12Factor App Uyum Kontrolü
7.  Test & Validasyon
    Bonus
    Rol bazlı yetkilendirme (admin, user) yapısı oluşturabilirsin.
    Bitince prod/v1.0.0 branchine pull request aç ve merge et.
    Açık, açıklamalı commit mesajları kullan.
    Docker konfigürasyonunu gerçekleştirebilirsin

AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_ISSUER=https://your-domain.auth0.com
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
