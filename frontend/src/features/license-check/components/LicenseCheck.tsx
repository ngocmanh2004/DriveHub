import React, { useCallback, useEffect, useState } from 'react';
import './LicenseCheck.scss';

import { getConfig } from 'src/core/config/environment';
import { useApi } from 'src/shared/hooks';

import GplxCard from './GplxCard';
import { CaptchaSessionResponse, GplxLookupResponse, GplxRecord } from '../types';

const LicenseCheck: React.FC = () => {
  const { post } = useApi();
  const apiBaseUrl = getConfig().API_BASE_URL;

  const [cccd, setCccd] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaSession, setCaptchaSession] = useState<string | null>(null);
  const [captchaBase64, setCaptchaBase64] = useState<string | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [gplxLoading, setGplxLoading] = useState(false);
  const [gplxList, setGplxList] = useState<GplxRecord[]>([]);
  const [gplxError, setGplxError] = useState<string | null>(null);
  const [gplxSearched, setGplxSearched] = useState(false);

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    setCaptchaCode('');
    setCaptchaBase64(null);
    setGplxError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/gplx/captcha-session`, { credentials: 'include' });
      const data: CaptchaSessionResponse = await response.json();

      if (data?.EC === 0 && data.DT) {
        setCaptchaSession(data.DT.sessionId);
        setCaptchaBase64(data.DT.captchaBase64 || null);
        if (data.DT.autoSolvedCode) setCaptchaCode(data.DT.autoSolvedCode);
      } else {
        setGplxError(data?.EM || 'Không tải được captcha, vui lòng thử lại');
      }
    } catch (error: any) {
      setGplxError(`Không kết nối được backend: ${error?.message || ''}`);
    } finally {
      setCaptchaLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  const handleGplxSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cccd.trim()) {
      setGplxError('Vui lòng nhập số CMND/CCCD.');
      return;
    }

    if (!captchaCode.trim()) {
      setGplxError('Vui lòng nhập mã captcha.');
      return;
    }

    if (!captchaSession) {
      setGplxError('Captcha hết hạn, hãy làm mới.');
      loadCaptcha();
      return;
    }

    setGplxLoading(true);
    setGplxError(null);
    setGplxList([]);
    setGplxSearched(true);

    try {
      const result = await post<GplxLookupResponse>('/api/gplx/lookup', {
        cccd: cccd.trim(),
        captchaCode: captchaCode.trim(),
        sessionId: captchaSession,
      });

      if (result?.EC === 0) {
        setGplxList(result.DT || []);
        setCaptchaSession(null);
        setCaptchaBase64(null);
        setCaptchaCode('');
        loadCaptcha();
      } else {
        setGplxError(result?.EM || 'Không tìm thấy thông tin GPLX.');
        if (result?.EM?.toLowerCase().includes('captcha')) {
          loadCaptcha();
        }
      }
    } catch {
      setGplxError('Lỗi kết nối. Vui lòng thử lại sau.');
    } finally {
      setGplxLoading(false);
    }
  };

  return (
    <div className="tc-wrapper">
      <div className="tc-banner">
        <div className="tc-banner-content">
          <img src="https://anh.csgt.vn/logo-csgt.png" alt="Logo" className="tc-banner-logo" />
          <div className="tc-banner-text">
            <span className="tc-banner-line1">CỔNG TRA CỨU THÔNG TIN</span>
            <span className="tc-banner-line2">GIẤY PHÉP LÁI XE</span>
          </div>
        </div>
      </div>

      <div className="tc-container">
        <div className="tc-form-card">
          <div className="tc-card-accent" />
          <div className="tc-form-body">
            <div className="tc-section-title">
              <i className="material-icons">manage_search</i>
              Tra cứu giấy phép lái xe
            </div>

            <form onSubmit={handleGplxSearch}>
              <div className="tc-field-group">
                <label>Số CMND / CCCD / Hộ chiếu</label>
                <div className="tc-input-wrapper">
                  <div className="tc-input-prefix"><i className="material-icons">badge</i></div>
                  <input
                    type="text"
                    className="tc-input-field"
                    placeholder="Nhập số CCCD / CMND"
                    value={cccd}
                    onChange={(e) => setCccd(e.target.value.trim())}
                    maxLength={20}
                  />
                </div>
              </div>

              <div className="tc-field-group">
                <label>Mã xác nhận (captcha)</label>
                <div className="tc-captcha-inline">
                  <div className="tc-captcha-img-wrap">
                    {captchaLoading ? (
                      <div className="tc-captcha-img tc-captcha-loading">
                        <span className="tc-spinner tc-spinner-dark" />
                      </div>
                    ) : captchaBase64 ? (
                      <img src={captchaBase64} alt="captcha" className="tc-captcha-img" />
                    ) : (
                      <div className="tc-captcha-img tc-captcha-empty" onClick={loadCaptcha}>Nhấn để tải</div>
                    )}

                    <button
                      type="button"
                      className="tc-captcha-refresh"
                      onClick={loadCaptcha}
                      disabled={captchaLoading}
                      title="Làm mới captcha"
                    >
                      <i className="material-icons">refresh</i>
                    </button>
                  </div>

                  <input
                    type="text"
                    className="tc-captcha-input"
                    placeholder="Nhập mã trong ảnh"
                    value={captchaCode}
                    onChange={(e) => setCaptchaCode(e.target.value)}
                    maxLength={8}
                    autoComplete="off"
                  />
                </div>
              </div>

              {gplxError && (
                <div className="tc-error-msg">
                  <i className="material-icons">error_outline</i>
                  {gplxError}
                </div>
              )}

              <button type="submit" className="tc-submit-btn" disabled={gplxLoading || captchaLoading}>
                {gplxLoading ? (
                  <>
                    <span className="tc-spinner" /> Đang tra cứu...
                  </>
                ) : (
                  <>
                    <i className="material-icons">search</i> Tra cứu
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="tc-footer-note">
          <i className="material-icons">info</i>
          Dữ liệu được cập nhật từ hệ thống Cục CSGT - Bộ Công An
        </div>

        {gplxLoading && (
          <div className="tc-gplx-loading">
            <div className="tc-spinner-large" />
            <p>Đang tra cứu dữ liệu từ hệ thống Cục CSGT...</p>
          </div>
        )}

        {gplxSearched && !gplxLoading && (
          <div className="tc-results">
            {gplxList.length > 0 ? (
              <div className="gplx-list">
                {gplxList.map((record, index) => (
                  <GplxCard key={record.id} record={record} index={index} />
                ))}
              </div>
            ) : (
              gplxError && (
                <div className="tc-no-result">
                  <i className="material-icons">search_off</i>
                  <p>{gplxError}</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenseCheck;
