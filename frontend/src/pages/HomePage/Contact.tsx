import React from 'react';
import './mainpages.scss';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="hp-contact hp-section">
      <div className="hp-container">
        <div className="hp-contact-inner">
          {/* Info & Map */}
          <div className="hp-contact-info hp-reveal">
            <div className="hp-section-label">
              <i className="material-icons">location_on</i>
              Liên hệ
            </div>
            <h2 className="hp-section-title">
              Đăng ký tư vấn <em>miễn phí</em>
            </h2>
            <p className="hp-section-sub">
              Để lại thông tin và chúng tôi sẽ liên hệ tư vấn khóa học phù hợp nhất cho bạn trong thời gian sớm nhất.
            </p>

            <div className="hp-contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61942.22526329651!2d109.01821118185508!3d13.994928913211206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f3a5fc9342e71%3A0xa38c56f130e30a93!2zQ8ahIHPhu58gMyAtIFRyxrDhu51uZyBDYW8gxJHhurNuZyBDxqEgxJFp4buHbiAtIFjDonkgZOG7sW5nIHbDoCBOw7RuZyBMw6JtIFRydW5nIGLhu5ku!5e0!3m2!1svi!2s!4v1735008160460!5m2!1svi!2s"
                title="Google Map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="hp-contact-details">
              <a href="tel:0987980417" className="hp-contact-item">
                <i className="material-icons">phone</i>
                0987 980 417
              </a>
              <a href="mailto:khavy1203@gmail.com" className="hp-contact-item">
                <i className="material-icons">email</i>
                khavy1203@gmail.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="hp-contact-form-card hp-reveal delay-2">
            <div className="hp-contact-form-title">Gửi thông tin đăng ký</div>
            <p className="hp-contact-form-sub">
              Điền vào form bên dưới, chúng tôi sẽ liên hệ trong vòng 24 giờ.
            </p>

            <form action="" method="get">
              <div className="hp-form-group">
                <label className="hp-form-label" htmlFor="hp-name">Họ và tên</label>
                <input
                  id="hp-name"
                  className="hp-form-input"
                  type="text"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="hp-form-group">
                <label className="hp-form-label" htmlFor="hp-phone">Số điện thoại</label>
                <input
                  id="hp-phone"
                  className="hp-form-input"
                  type="tel"
                  name="phone"
                  placeholder="0987 xxx xxx"
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="hp-form-group">
                <label className="hp-form-label" htmlFor="hp-email">Email</label>
                <input
                  id="hp-email"
                  className="hp-form-input"
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <button type="submit" className="hp-form-submit">
                <i className="material-icons">send</i>
                Gửi thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
