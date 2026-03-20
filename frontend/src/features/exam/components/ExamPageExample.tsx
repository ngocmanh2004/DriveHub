import React from 'react';
import ForceLandscapeWrapper from './ForceLandscapeWrapper';
import './ExamPageExample.scss';

/**
 * Ví dụ sử dụng ForceLandscapeWrapper cho trang thi thử
 * Component này demo cách integrate wrapper vào trang exam
 */
const ExamPageExample: React.FC = () => {
  return (
    <ForceLandscapeWrapper showNotification={true}>
      <div className="exam-page">
        <header className="exam-page__header">
          <h1>Bài Thi Thử</h1>
          <div className="exam-page__timer">
            <span>⏱️ 45:00</span>
          </div>
        </header>

        <main className="exam-page__content">
          <div className="exam-page__question">
            <h2>Câu 1: Biển báo này có ý nghĩa gì?</h2>
            <div className="exam-page__image">
              <div className="placeholder-image">🚗 [Hình ảnh biển báo]</div>
            </div>
            
            <div className="exam-page__options">
              <label className="option">
                <input type="radio" name="answer" value="A" />
                <span>A. Cấm đi ngược chiều</span>
              </label>
              <label className="option">
                <input type="radio" name="answer" value="B" />
                <span>B. Cấm rẽ trái</span>
              </label>
              <label className="option">
                <input type="radio" name="answer" value="C" />
                <span>C. Cấm quay đầu xe</span>
              </label>
              <label className="option">
                <input type="radio" name="answer" value="D" />
                <span>D. Cấm dừng và đỗ xe</span>
              </label>
            </div>
          </div>

          <div className="exam-page__navigation">
            <button className="btn btn--prev">← Câu trước</button>
            <div className="exam-page__progress">1/30</div>
            <button className="btn btn--next">Câu sau →</button>
          </div>
        </main>

        <footer className="exam-page__footer">
          <button className="btn btn--submit">Nộp bài</button>
        </footer>
      </div>
    </ForceLandscapeWrapper>
  );
};

export default ExamPageExample;
