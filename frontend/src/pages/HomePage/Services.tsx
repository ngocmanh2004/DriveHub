import React from 'react';
import './mainpages.scss';

const features = [
  {
    icon: 'school', color: 'blue',
    title: 'Đào tạo 5,000+ học viên',
    desc: 'Tỷ lệ đỗ kỳ thi lái xe vượt trội đạt trên 95%, chứng minh chất lượng đào tạo hàng đầu tại Bình Định.',
  },
  {
    icon: 'directions_car', color: 'cyan',
    title: 'Xe tập lái hiện đại',
    desc: 'Hơn 300 xe tập lái được trang bị đầy đủ các tính năng an toàn, tiện nghi và luôn được bảo dưỡng định kỳ.',
  },
  {
    icon: 'people', color: 'green',
    title: 'Giảng viên tận tâm',
    desc: 'Đội ngũ 50+ giảng viên giàu kinh nghiệm, đã qua đào tạo chuyên nghiệp và luôn đồng hành cùng học viên.',
  },
  {
    icon: 'build', color: 'amber',
    title: 'Hỗ trợ kỹ thuật 24/7',
    desc: 'Đội ngũ kỹ thuật viên chuyên nghiệp đảm bảo phương tiện và cơ sở vật chất hoạt động tốt nhất mọi lúc.',
  },
  {
    icon: 'quiz', color: 'navy',
    title: 'Thi thử trực tuyến',
    desc: 'Luyện thi lý thuyết 600 câu, mô phỏng đúng đề thi sát hạch thực tế hoàn toàn miễn phí trên nền tảng Mezon.',
  },
  {
    icon: 'search', color: 'purple',
    title: 'Tra cứu GPLX & Vi phạm',
    desc: 'Kiểm tra tình trạng giấy phép lái xe và vi phạm giao thông nhanh chóng, chính xác chỉ trong vài giây.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="hp-features hp-section">
      <div className="hp-container">
        <div className="hp-features-header hp-reveal">
          <div className="hp-section-label">
            <i className="material-icons">star</i>
            Dịch vụ của chúng tôi
          </div>
          <h2 className="hp-section-title">
            Giải pháp đào tạo lái xe <em>toàn diện</em>
          </h2>
          <p className="hp-section-sub">
            Từ lý thuyết đến thực hành, chúng tôi cung cấp đầy đủ công cụ và hỗ trợ để bạn đạt được bằng lái xe mơ ước.
          </p>
        </div>

        <div className="hp-features-grid">
          {features.map((f, i) => (
            <div className={`hp-feature-card hp-reveal delay-${(i % 3) + 1}`} key={i}>
              <div className={`hp-feature-icon hp-feature-icon--${f.color}`}>
                <i className="material-icons">{f.icon}</i>
              </div>
              <div className="hp-feature-title">{f.title}</div>
              <p className="hp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
