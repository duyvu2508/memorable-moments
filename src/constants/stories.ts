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
    subtitle: 'Một cột mốc lớn được tạo nên từ những nỗ lực bền bỉ mỗi ngày',
    description:
      'Từ những buổi học đều đặn đến từng lần hoàn thành bài tập đúng hạn, hành trình chạm tới mục tiêu IELTS trở thành một khoảnh khắc đáng nhớ và đầy tự hào.',
    ctaLabel: 'Xem hành trình',
    imageUri:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=webp&w=1200&q=80',
    href: 'https://zim.vn',
  },
  {
    id: 'classroom-energy',
    title: 'Không khí lớp học sống động',
    subtitle: 'Sự kết nối tích cực tạo nên nhịp học tập cuốn hút trong mỗi buổi học',
    description:
      'Mỗi tương tác giữa giảng viên và học viên đều góp phần làm nên một lớp học giàu năng lượng, nơi tinh thần chủ động và cảm hứng học tập được lan tỏa rõ rệt.',
    ctaLabel: 'Khám phá lớp học',
    imageUri:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&fm=webp&w=1200&q=80',
    href: 'https://zim.vn',
  },
  {
    id: 'quiet-win',
    title: 'Những chiến thắng nhỏ rất đáng nhớ',
    subtitle: 'Những bước tiến nhỏ âm thầm lại là nền tảng cho sự trưởng thành lớn hơn',
    description:
      'Một lần mạnh dạn phát biểu, một buổi học không bỏ cuộc hay một mục tiêu nhỏ được hoàn thành đúng lúc đều có thể trở thành động lực đáng nhớ trên hành trình học tập.',
    ctaLabel: 'Đọc câu chuyện',
    imageUri:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&fm=webp&w=1200&q=80',
    href: 'https://zim.vn',
  },
];
