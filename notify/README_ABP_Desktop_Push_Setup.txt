ABP MEETING ROOM — DESKTOP PUSH NOTIFICATION V1

TUJUAN
Semua karyawan yang terdaftar boleh mengaktifkan push notification pada perangkat masing-masing melalui ikon lonceng. Hanya perangkat dengan status opt-in yang menerima notifikasi booking baru yang berhasil dikonfirmasi.

PAKET FILE
- ABP_Meeting_Room_Index_Push_Ready.html: Index dengan ikon lonceng dan panel aktivasi.
- ABP_Meeting_Room_CodeGS_Push_Notification_V1.gs: Code.gs penuh berdasarkan backend terakhir yang tersedia (basis Library 20 Nov 2026) dengan fungsi registrasi/pengiriman push.
- ABP_Push_Notification_Backend_Patch_Guide.txt: panduan patch bila Code.gs aktif memiliki perubahan tambahan.
- notification-setup.html: halaman top-level untuk meminta izin browser dan mengambil token FCM.
- firebase-messaging-sw.js: service worker untuk menampilkan push saat tab/browser di background.
- firebase-config.js: tempat mengisi konfigurasi web Firebase publik dan VAPID public key.

PENTING SEBELUM AKTIF
Konfigurasi Firebase belum diketahui dan placeholder di firebase-config.js belum dapat mengirim push. Jangan sebar service-account JSON/private key.

A. SIAPKAN FIREBASE
1. Buka https://console.firebase.google.com/ dan buat project baru, misalnya ABP Meeting Room Notifications.
2. Tambahkan Web App pada project tersebut. Tidak perlu menambahkan Authentication.
3. Salin konfigurasi Web App: apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId. Isi ke firebase-config.js.
4. Firebase Console > Project settings > Cloud Messaging > Web Push certificates > Generate key pair. Salin public VAPID key ke ABP_FIREBASE_VAPID_KEY pada firebase-config.js.
5. Pastikan Firebase Cloud Messaging API (HTTP v1) aktif pada Google Cloud project.
6. Firebase Console > Project settings > Service accounts: buat/unduh private key JSON untuk service account. Simpan file dengan aman.
7. Di Google Cloud Console > IAM, berikan service account role Firebase Cloud Messaging API Admin (roles/firebasecloudmessaging.admin).

B. HOSTING FILE PUSH DI GITHUB PAGES
1. Di repo abp-meeting-room-assets, buat folder notify.
2. Upload notification-setup.html, firebase-messaging-sw.js, dan firebase-config.js ke folder notify.
3. Aktifkan GitHub Pages dari Settings > Pages (Deploy from branch: main, folder /root). Pastikan halaman HTTPS tersedia.
4. URL helper yang dipakai Index: https://abpadibintanpermata-cloud.github.io/abp-meeting-room-assets/notify/notification-setup.html
5. Jika URL Pages Anda berbeda, ubah ABP_PUSH_SETUP_URL dan ABP_PUSH_SETUP_ORIGIN pada Index.

C. KONFIGURASI APPS SCRIPT
1. Di Apps Script > Project Settings > Script Properties, tambah property: ABP_FCM_SERVICE_ACCOUNT_JSON. Value = seluruh isi JSON service account (termasuk private_key). Jangan kirim nilainya ke chat atau taruh di GitHub.
2. Pastikan appsscript.json tetap memuat semua scope lama. Jika diminta, tambahkan https://www.googleapis.com/auth/script.external_request.
3. Tambahkan fungsi backend push pada Code.gs aktif. Cara paling aman: gunakan patch guide dan cocokkan versi; jangan overwrite Code.gs jika project aktif memiliki perubahan lebih baru.
4. Jalankan setupAbpPushNotificationStorage() satu kali dari editor. Berikan izin Sheets dan external request jika diminta. Sheet PushDevices akan dibuat.
5. Jalankan testAbpFcmCredentials() untuk memeriksa akses token FCM; fungsi ini tidak mengirim notifikasi ke karyawan.

D. PEMASANGAN FRONTEND
1. Backup Index.html aktif.
2. Gunakan ABP_Meeting_Room_Index_Push_Ready.html sebagai basis; jika ada perubahan visual terbaru setelah file itu dibuat, gabungkan blok navbar-notifikasi dan JavaScript push tanpa mengganti perubahan lain.
3. Ganti nilai URL helper jika diperlukan. Simpan.
4. Setelah backend dan GitHub Pages siap, deploy versi baru Web App.

E. UJI COBA TERBATAS
1. Buka ABP Meeting Room di Chrome/Edge pada satu laptop uji. Login dengan akun yang terdaftar di AccessList.
2. Klik ikon lonceng > Aktifkan Notifikasi.
3. Tab GitHub Pages terbuka. Pada tab itu klik Izinkan Notifikasi dan pilih Allow pada prompt browser.
4. Setelah tab menampilkan perangkat terdaftar, kembali ke ABP. Status lonceng berubah Aktif.
5. Jalankan testAbpPushNotification(token) belum dapat dilakukan langsung dari editor tanpa session token; gunakan booking uji coba setelah perangkat terdaftar untuk mengirim notifikasi nyata.
6. Buat satu booking uji coba yang valid. Perangkat yang aktif opt-in akan menerima notifikasi. Perangkat lain yang belum opt-in tidak menerima.
7. Uji ketika ABP tab diminimalkan dan saat pengguna bekerja di aplikasi lain. Browser tetap harus berjalan di background; desktop push tidak menjamin notifikasi jika browser/process ditutup paksa atau perangkat offline.
8. Klik lonceng > Nonaktifkan di Perangkat Ini untuk mencabut langganan perangkat.

BATASAN V1
- V1 mengirim notifikasi untuk booking baru yang statusnya berhasil CONFIRMED. Notifikasi pembatalan dan pengingat meeting belum diaktifkan.
- Satu orang dapat mendaftarkan beberapa perangkat; setiap perangkat memberi persetujuan sendiri.
- Token FCM disimpan di sheet PushDevices. Lindungi sheet dari akses karyawan biasa.
- Notifikasi diuji pertama pada satu atau dua laptop GA/HC sebelum dibagikan ke semua karyawan.
