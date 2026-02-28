# Library Management System — Frontend

> **Hệ thống quản lý thư viện sách** — Đồ án tốt nghiệp
> Frontend SPA xây dựng với React 19 + TypeScript + Vite

---

## Vấn đề & Mục tiêu

Thư viện truyền thống quản lý sách và phiếu mượn bằng giấy tờ thủ công: tra cứu chậm, dễ sai sót, không theo dõi được tình trạng bản sao sách theo thời gian thực. Người dùng phải đến thư viện mới biết sách còn hay hết.

**Dự án này số hóa toàn bộ quy trình:**

- Tra cứu sách theo nhiều tiêu chí với tốc độ Elasticsearch
- Đặt mượn và theo dõi lịch sử mượn/trả trực tuyến
- Nhận thông báo thời gian thực khi sách được trả hoặc đến hạn
- Thanh toán phạt sách trả trễ qua VNPay mà không cần đến quầy

---

## Vai trò của tôi trong dự án

Đây là dự án **cá nhân** — tôi tự thiết kế kiến trúc và triển khai toàn bộ phần frontend:

- Thiết kế kiến trúc feature-based, phân tách rõ client/admin
- Xây dựng **10 module admin** (Dashboard, Sách, Bản sao, Tác giả, NXB, Thể loại, Người dùng, Phiếu mượn, Phiếu phạt, Thanh toán)
- Xây dựng **9 trang client** (Trang chủ, Duyệt sách, Chi tiết, Hồ sơ, Lịch sử mượn, Thông báo, Thanh toán, Auth)
- Tích hợp Elasticsearch cho tìm kiếm/lọc đa chiều
- Tích hợp Socket.IO cho thông báo real-time
- Tích hợp VNPay cho thanh toán trực tuyến

## Tech Stack

**Core:** React 19 · TypeScript 5.8 (strict) · Vite 7 + SWC · React Router 7

**UI:** Tailwind CSS 4 · shadcn/ui · Radix UI

| Công nghệ                            | Mục đích                                                         |
| ------------------------------------ | ---------------------------------------------------------------- |
| **TanStack Query / Table / Virtual** | Server state caching, DataTable headless, virtual list rendering |
| **React Hook Form + Zod**            | Form validation type-safe — schema là single source of truth     |
| **Socket.IO Client**                 | Real-time notifications qua WebSocket                            |
| **Elasticsearch**                    | Full-text search + faceted filtering với aggregations            |
| **VNPay**                            | Tích hợp cổng thanh toán trực tuyến                              |
| **Recharts**                         | Dashboard analytics charts                                       |

---

## Kiến trúc & Kỹ thuật

### Feature-Based Architecture

Codebase tổ chức theo **tính năng** thay vì theo loại file:

```
src/
├── features/
│   ├── admin/          # 10 module quản lý
│   │   └── {entity}/
│   │       ├── pages/          ← Trang chính với DataTable
│   │       ├── components/     ← FormDialog, DeleteDialog
│   │       ├── hooks/          ← Custom hook: state & business logic
│   │       ├── services/       ← API call wrapper functions
│   │       └── {entity}-columns.tsx  ← TanStack column definitions
│   └── client/         # 9 trang phía người dùng
├── components/ui/      # 44 UI primitives (shadcn/ui)
├── app/providers/      # Context: Auth, Notification, BookFilter
├── layout/             # ClientLayout, AdminLayout, ProtectedRoute
├── lib/                # Axios instance, Zod validators, utils
└── types/              # 13 TypeScript entity interfaces
```

### Context-Based Authentication

```
App mount
  → Đọc localStorage.access_token
  → Gọi API xác thực token
  → Set user vào AppContext
  → Render UI tương ứng với role
```

Token Bearer tự động inject qua **Axios Request Interceptor** — không cần truyền thủ công ở từng API call.

### Generic DataTable Component

Một component `<DataTable>` dùng chung cho tất cả 10 module admin, hỗ trợ:

- Phân trang server-side
- Ẩn/hiện cột linh hoạt
- Sắp xếp
- Row expansion (ví dụ: xem bản sao sách ngay trong dòng sách mà không cần chuyển trang)

### Elasticsearch + Faceted Search

- Full-text search với debounce 500ms
- Faceted filtering: thể loại, ngôn ngữ, khoảng giá, năm xuất bản
- Filter options **tự động** từ aggregations của Elasticsearch (không hardcode)
- Bộ lọc đồng bộ với URL query params → F5 không mất bộ lọc

### Infinite Scroll + Virtual List

Trang duyệt sách client:

- `useInfiniteQuery` load dữ liệu theo trang khi scroll
- `@tanstack/react-virtual` chỉ render phần tử đang visible trong viewport → mượt trên mobile dù list dài

### Real-time Notifications

- `NotificationProvider` lắng nghe WebSocket events
- Badge đếm thông báo chưa đọc cập nhật ngay không cần refresh
- Emit mark-as-read về server khi người dùng đọc

---

## Tính năng đã xây dựng

### Admin Portal — 10 module

| Module           | Chức năng                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Dashboard**    | Thống kê tổng quan + 4 biểu đồ: phiếu mượn, doanh thu, trạng thái bản sao, xu hướng tìm kiếm |
| **Quản lý Sách** | CRUD, lọc theo thể loại/ngôn ngữ/trạng thái, upload ảnh bìa, xuất Excel                      |
| **Bản sao Sách** | Quản lý bản sao vật lý theo barcode/serial number, theo dõi trạng thái từng bản              |
| **Tác giả**      | CRUD                                                                                         |
| **Nhà xuất bản** | CRUD                                                                                         |
| **Thể loại**     | CRUD                                                                                         |
| **Người dùng**   | Quản lý tài khoản, phân quyền                                                                |
| **Phiếu mượn**   | Theo dõi mượn/trả, gia hạn, ngày đến hạn                                                     |
| **Phiếu phạt**   | Quản lý phạt sách trả trễ                                                                    |
| **Thanh toán**   | Theo dõi trạng thái và lịch sử thanh toán                                                    |

### Client Portal — 9 trang

| Trang                   | Mô tả                                                        |
| ----------------------- | ------------------------------------------------------------ |
| **Trang chủ**           | Landing page, thống kê nổi bật, sách mới nhất                |
| **Duyệt sách**          | Tìm kiếm + lọc đa chiều, xem lưới/danh sách, infinite scroll |
| **Chi tiết sách**       | Thông tin chi tiết, số bản còn, bình luận/đánh giá           |
| **Hồ sơ cá nhân**       | Xem và cập nhật thông tin thành viên                         |
| **Lịch sử mượn**        | Danh sách phiếu mượn, gia hạn, tình trạng trả                |
| **Thông báo**           | Trung tâm thông báo real-time                                |
| **Thanh toán phạt**     | Xử lý qua VNPay, callback xử lý kết quả trả về               |
| **Đăng nhập / Đăng ký** | Form xác thực + OAuth callback                               |
| **About**               | Giới thiệu                                                   |

---

## Điểm nổi bật

|                          |                                                                     |
| ------------------------ | ------------------------------------------------------------------- |
| **Zero Redux**           | State quản lý hoàn toàn qua React Context + custom hooks            |
| **Type-safe end-to-end** | TypeScript strict, 13 entity interfaces, mọi API response đều typed |
| **DRY patterns**         | 1 `<DataTable>`, 1 form pattern tái sử dụng cho 10 module admin     |
| **Performance**          | Code splitting, virtual list, debounced search, image lazy load     |
| **Mobile-first**         | Responsive từ 375px, touch target ≥ 44px, Sheet drawer trên mobile  |
| **Real-time UX**         | WebSocket notification không cần refresh trang                      |
| **Secure routing**       | RBAC ở cả route level và UI level                                   |

---

## Cài đặt & Chạy

```bash
# Clone và cài đặt
git clone <repository-url>
cd book-vite
npm install

# Khai báo biến môi trường
echo "VITE_BACKEND_URL=http://localhost:8080" > .env

# Chạy dev (port 3000)
npm run dev

# Build production
npm run build
```

| Lệnh              | Mô tả               |
| ----------------- | ------------------- |
| `npm run dev`     | Dev server với HMR  |
| `npm run build`   | Type-check + bundle |
| `npm run lint`    | ESLint              |
| `npm run preview` | Preview bản build   |
