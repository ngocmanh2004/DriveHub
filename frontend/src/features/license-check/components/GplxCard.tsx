import React from 'react';
import { GplxCardProps } from '../types';

const GplxCard: React.FC<GplxCardProps> = ({ record, index }) => {
  const live = record.live;
  const isValid = record.ket_qua_xac_thuc?.toLowerCase().includes('hợp lệ');

  return (
    <div className="gplx-card">
      <div className="gplx-card-header">
        <div className="gplx-card-title">
          <i className="material-icons">credit_card</i>
          <span>Bằng lái #{index + 1}</span>
        </div>
        <span className={`gplx-badge ${isValid ? 'valid' : 'invalid'}`}>
          <i className="material-icons">{isValid ? 'check_circle' : 'cancel'}</i>
          {record.ket_qua_xac_thuc || 'Không xác định'}
        </span>
      </div>

      <div className="gplx-card-body">
        <div className="gplx-grid">
          <div className="gplx-row"><span className="gplx-label">Họ và tên</span><span className="gplx-value">{live?.ho_va_ten || record.ho_ten || '—'}</span></div>
          <div className="gplx-row"><span className="gplx-label">Số GPLX</span><span className="gplx-value gplx-highlight">{live?.so_gplx || record.so_gplx || '—'}</span></div>
          <div className="gplx-row"><span className="gplx-label">Hạng</span><span className="gplx-value">{live?.hang_gplx || record.hang || '—'}</span></div>
          <div className="gplx-row"><span className="gplx-label">Ngày sinh</span><span className="gplx-value">{live?.ngay_sinh || record.ngay_sinh || '—'}</span></div>
          {live && (
            <>
              <div className="gplx-row"><span className="gplx-label">Nơi cấp</span><span className="gplx-value">{live.noi_cap || '—'}</span></div>
              <div className="gplx-row"><span className="gplx-label">Ngày cấp</span><span className="gplx-value">{live.ngay_cap || '—'}</span></div>
              <div className="gplx-row"><span className="gplx-label">Ngày hết hạn</span><span className="gplx-value">{live.ngay_het_han || '—'}</span></div>
              <div className="gplx-row"><span className="gplx-label">Ngày trúng tuyển</span><span className="gplx-value">{live.ngay_trung_tuyen || '—'}</span></div>
            </>
          )}
          {record.ly_do_tu_choi && (
            <div className="gplx-row gplx-row-full"><span className="gplx-label">Lý do từ chối</span><span className="gplx-value gplx-error">{record.ly_do_tu_choi}</span></div>
          )}
        </div>

        {record.liveError && (
          <div className="gplx-live-error">
            <i className="material-icons">warning_amber</i> {record.liveError}
          </div>
        )}
      </div>
    </div>
  );
};

export default GplxCard;
