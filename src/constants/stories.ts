export type Story = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  imageUri: string;
  href: string;
};

export const stories: Story[] = [
  {
    id: 'ielts-journey',
    title: 'Khoảnh khắc vượt mốc IELTS',
    subtitle: 'Hành trình thay đổi nhờ một thời điểm đúng',
    description:
      'Những bước chuyển nhỏ trong thói quen học tập được đọng lại thành một cột mốc lớn, đủ để nhắc người học rằng tiến bộ vẫn luôn đang diễn ra.',
    ctaLabel: 'Xem câu chuyện',
    imageUri:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=webp&w=1200&q=80',
    href: 'https://zim.vn',
  },
  {
    id: 'classroom-energy',
    title: 'Không khí lớp học sống động',
    subtitle: 'Tác động đến từ kết nối giữa giảng viên và học viên',
    description:
      'Section được làm lại theo tinh thần editorial: ảnh chiếm ưu thế, caption nổi bật hơn khi tương tác và vẫn giữ được nhịp đọc nhẹ trên mobile.',
    ctaLabel: 'Khám phá thêm',
    imageUri:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&fm=webp&w=1200&q=80',
    href: 'https://zim.vn',
  },
  {
    id: 'quiet-win',
    title: 'Những chiến thắng nhỏ rất đáng nhớ',
    subtitle: 'Một cái chạm, một cuốn, một lần vượt qua giới hạn',
    description:
      'Thể hiện motion tiết chế với overlay, move hover và parallax nhẹ giữa ảnh và caption để tạo cảm giác hiện đại nhưng không gây mệt.',
    ctaLabel: 'Đọc thêm',
    imageUri:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&fm=webp&w=1200&q=80',
    href: 'https://zim.vn',
  },
];
