// src/api/fakeApi.ts
export const posts = [
    {
      id: 1,
      title: "TRẢI NGHIỆM HỌC THỬ REACT NATIVE, DEVOPS, C++ VÔ CÙNG CHẤT LƯỢNG CÙNG F8",
      author: {
        name: "Huyền Lê Ngọc",
        avatar: "https://i.pravatar.cc/80?img=5",
        bio: "Lập trình viên yêu thích chia sẻ kiến thức học tập hiệu quả."
      },
      date: "2025-08-25T10:00:00Z",
      readTime: "2 phút đọc",
      tags: ["React Native", "DevOps", "C++"],
      cover: "https://dummyimage.com/800x400/ddd/000.png&text=Cover",
      desc: "Để giúp học viên mới cảm nhận rõ ràng chất lượng giảng dạy, F8 đã xây dựng 3 lớp học thử: C++, React Native và DevOps với lộ trình rõ ràng.",
      thumbnail: "https://dummyimage.com/200x120/ddd/000.png&text=React+Native",
      content: [
        { id: "intro", type: "p", text: "Để giúp học viên mới cảm nhận rõ ràng..." },
        { id: "section-1", type: "h2", text: "Học thử gồm những gì?" },
        { id: "section-1", type: "ul", items: ["Nội dung demo...", "Giảng viên hỗ trợ...", "Bài tập nhỏ..."] },
        { id: "section-2", type: "h2", text: "Ai nên tham gia?" },
        { id: "section-2", type: "ul", items: ["Nội dung demo...", "Giảng viên hỗ trợ...", "Bài tập nhỏ..."] },
        { id: "section-2", type: "p", text: "Chương trình phù hợp cho người mới bắt đầu..." }
      ],
      toc: [
        { id: "intro", text: "Giới thiệu" },
        { id: "section-1", text: "Học thử gồm những gì?" },
        { id: "section-2", text: "Ai nên tham gia?" },
        { id: "section-3", text: "Cách đăng ký học thử" },
        { id: "section-4", text: "FAQ nhanh" }
      ],
      related: [
        { id: 2, title: "Giới thiệu ngành CNTT", thumbnail: "https://dummyimage.com/560x320/ccc/000.png&text=CNTT" },
        { id: 3, title: "Bí kíp học React nhanh", thumbnail: "https://dummyimage.com/560x320/bbb/000.png&text=React" }
      ],
      comments: [
        { id: 1, author: "Hoàng Tuấn", avatar: "https://i.pravatar.cc/48?img=32", time: "2025-09-09T06:00:00Z", text: "Bài viết rất chi tiết, cảm ơn tác giả!" }
      ],
      categories: ["Front-end", "Back-end", "DevOps", "Mobile", "UI/UX"],
      latestPosts: [
        { id: 101, title: "Bài viết hấp dẫn #1", thumbnail: "https://dummyimage.com/96x64/eaeaea/000.png&text=1", date: "2025-09-06T09:00:00Z", readTime: "4 phút đọc" }
      ]
    },
    {
      id: 2,
      title: "Giới thiệu về ngành Công Nghệ Thông Tin và Những Kiến Thức Cơ Bản",
      author: { name: "Hoàng Tuấn 12A1 40.Võ", avatar: "https://i.pravatar.cc/80?img=10", bio: "Sinh viên CNTT, thích chia sẻ kiến thức cơ bản." },
      date: "2025-08-20T08:30:00Z",
      readTime: "3 phút đọc",
      tags: ["CNTT"],
      cover: "https://dummyimage.com/800x400/ccc/000.png&text=CNTT",
      desc: "Ngành Công Nghệ Thông Tin (CNTT) là một lĩnh vực đang phát triển mạnh mẽ và có vai trò quan trọng...",
      thumbnail: "https://dummyimage.com/200x120/ccc/000.png&text=CNTT",
      content: [
        { id: "intro", type: "p", text: "Ngành CNTT ngày nay đóng vai trò quan trọng..." },
        { id: "section-1", type: "h2", text: "Kiến thức cơ bản cần học" },
        { id: "section-1", type: "ul", items: ["Thuật toán", "Lập trình cơ bản", "Mạng máy tính"] }
      ],
      toc: [
        { id: "intro", text: "Giới thiệu" },
        { id: "section-1", text: "Kiến thức cơ bản cần học" }
      ],
      related: [],
      comments: [],
      categories: ["CNTT", "Front-end", "Back-end"],
      latestPosts: []
    }
  ];
  
  // Giả lập API
  export const getPosts = () => Promise.resolve(posts);
  export const getPostById = (id: number) => Promise.resolve(posts.find(p => p.id === id) || null);
  