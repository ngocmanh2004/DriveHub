import React from 'react';
import './mainpages.scss';

const stats = [
  { icon: 'school',         number: '5,000+', label: 'Học viên đã đào tạo' },
  { icon: 'directions_car', number: '300+',   label: 'Xe tập lái hiện đại' },
  { icon: 'people',         number: '50+',    label: 'Giảng viên kinh nghiệm' },
  { icon: 'emoji_events',   number: '95%+',   label: 'Tỷ lệ đỗ trung bình' },
];

const About: React.FC = () => (
  <section className="hp-stats" id="about">
    <div className="hp-container">
      <div className="hp-stats-grid">
        {stats.map((stat, i) => (
          <div className={`hp-stat-item hp-reveal delay-${i + 1}`} key={i}>
            <div className="hp-stat-icon">
              <i className="material-icons">{stat.icon}</i>
            </div>
            <div className="hp-stat-number">{stat.number}</div>
            <div className="hp-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
