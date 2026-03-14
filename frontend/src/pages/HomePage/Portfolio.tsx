import React from 'react';
import './mainpages.scss';

interface Teacher {
  name: string;
  role: string;
  img: string;
  description: string;
  students: number;
  successRate: number;
}

const teachers: Teacher[] = [
  {
    name: 'Thầy Nguyễn Văn An',
    role: 'Hạng B2',
    img: '/assets/images/teacher/tho/1.jpg',
    description: 'Hơn 12 năm kinh nghiệm giảng dạy, đào tạo 500+ học viên với tỉ lệ đỗ đạt 98% liên tục nhiều năm liền.',
    students: 500,
    successRate: 98,
  },
  {
    name: 'Cô Lê Thị Bích',
    role: 'Hạng A1',
    img: '/assets/images/teacher/tho/2.jpg',
    description: 'Phong cách giảng dạy tận tâm, kiên nhẫn. Đã hướng dẫn 300+ học viên với tỷ lệ đỗ đạt 100%.',
    students: 300,
    successRate: 100,
  },
  {
    name: 'Thầy Trần Quốc Cường',
    role: 'Hạng C',
    img: '/assets/images/teacher/tho/3.jpg',
    description: 'Giúp 400+ học viên tự tin cầm lái, tỷ lệ đỗ thực hành lần đầu đạt 96% nhờ phương pháp thực tế.',
    students: 400,
    successRate: 96,
  },
  {
    name: 'Cô Phạm Ngọc Dung',
    role: 'Hạng B1',
    img: '/assets/images/teacher/tho/1.jpg',
    description: '10 năm kinh nghiệm đào tạo lái xe, đồng hành cùng 350+ học viên với tỷ lệ đỗ 95%.',
    students: 350,
    successRate: 95,
  },
  {
    name: 'Thầy Hoàng Minh Đức',
    role: 'Hạng B2',
    img: '/assets/images/teacher/tho/2.jpg',
    description: 'Phương pháp giảng dạy thực tế, bám sát đề thi. Hỗ trợ 280+ học viên vượt qua kỳ sát hạch.',
    students: 280,
    successRate: 97,
  },
  {
    name: 'Cô Vũ Thị Oanh',
    role: 'Hạng A2',
    img: '/assets/images/teacher/tho/3.jpg',
    description: 'Lớp học ôn tập hiệu quả, trực quan. Giúp 320+ học viên vượt qua kỳ thi sát hạch thành công.',
    students: 320,
    successRate: 99,
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="hp-instructors hp-section">
      <div className="hp-container">
        <div className="hp-instructors-header hp-reveal">
          <div className="hp-section-label">
            <i className="material-icons">people</i>
            Đội ngũ giảng viên
          </div>
          <h2 className="hp-section-title">
            Giảng viên <em>tận tâm</em> & thành tích nổi bật
          </h2>
          <p className="hp-section-sub">
            Những giảng viên kinh nghiệm, luôn đồng hành cùng bạn trên con đường chinh phục bằng lái xe.
          </p>
        </div>

        <div className="hp-instructors-scroll">
          {teachers.map((t, i) => (
            <div className="hp-instructor-card" key={i}>
              <div className="hp-instructor-img">
                <img
                  src={t.img}
                  alt={t.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="hp-instructor-badge">{t.role}</div>
              </div>
              <div className="hp-instructor-body">
                <div className="hp-instructor-name">{t.name}</div>
                <div className="hp-instructor-role">{t.role}</div>
                <p className="hp-instructor-desc">{t.description}</p>
                <div className="hp-instructor-stats">
                  <div>
                    <strong>{t.successRate}%</strong>
                    <span>Tỷ lệ đỗ</span>
                  </div>
                  <div>
                    <strong>{t.students}+</strong>
                    <span>Học viên</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
