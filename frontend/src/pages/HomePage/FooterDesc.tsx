import React, { useEffect, useState } from 'react';
import './mainpages.scss';
import { ENVIRONMENT_CONFIGS, getCurrentEnvironment } from '../../core/config/environment';

interface VisitorStats {
  total_visits: number;
  monthly_visits: number;
  current_online: number;
  peak_online: number;
}

const FooterDesc: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    const wsUrl = ENVIRONMENT_CONFIGS[getCurrentEnvironment()]?.WS_BASE_URL;
    if (!wsUrl) return;
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'VISITOR_STATS') setStats(data.payload);
      } catch (_) {}
    };
    return () => ws.close();
  }, []);

  return (
    <>
      {stats && (
        <section className="hp-visitor-bar">
          <div className="hp-container">
            <div className="hp-visitor-bar-inner">
              <div className="hp-vs-item">
                <span className="hp-vs-dot hp-vs-dot--green" />
                <span className="hp-vs-value">{stats.current_online}</span>
                <span className="hp-vs-label">đang online</span>
              </div>
              <div className="hp-vs-divider" />
              <div className="hp-vs-item">
                <i className="material-icons hp-vs-icon">calendar_month</i>
                <span className="hp-vs-value">{(stats.monthly_visits ?? 0).toLocaleString('vi-VN')}</span>
                <span className="hp-vs-label">tháng này</span>
              </div>
              <div className="hp-vs-divider" />
              <div className="hp-vs-item">
                <i className="material-icons hp-vs-icon">bar_chart</i>
                <span className="hp-vs-value">{stats.total_visits.toLocaleString('vi-VN')}</span>
                <span className="hp-vs-label">tổng lượt truy cập</span>
              </div>
            </div>
          </div>
        </section>
      )}

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
    </>
  );
};

export default FooterDesc;
