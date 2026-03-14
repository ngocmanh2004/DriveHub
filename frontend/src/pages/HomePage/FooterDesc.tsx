import React from 'react';
import './mainpages.scss';

const FooterDesc: React.FC = () => {
  return (
    <section className="hp-footer-cta">
      <div className="hp-container">
        <div className="hp-footer-cta-content">
          <h2 className="hp-footer-cta-title">
            Sẵn sàng chinh phục bằng lái xe?
          </h2>
          <p className="hp-footer-cta-sub">
            Đăng ký ngay hôm nay và nhận tư vấn miễn phí từ đội ngũ giảng viên chuyên nghiệp của chúng tôi.
          </p>
          <div className="hp-footer-cta-btns">
            <a href="#contact" className="hp-btn hp-btn--primary">
              <i className="material-icons">arrow_forward</i>
              Đăng ký học
            </a>
            <a href="/#/teststudent" className="hp-btn hp-btn--white">
              <i className="material-icons">quiz</i>
              Thi thử ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterDesc;
