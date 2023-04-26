/**
 * Copyright 2022 Beijing Volcanoengine Technology Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';
import LogoCn from '/assets/images/headerLogoCn2x.png';
import LogoEn from '/assets/images/headerLogoEn2x.png';

import { RootState } from '@/store/types';
import { DEMO_VERSION, DOC_URL } from '@/config';
import { selectLanguage } from '@/store/reducer/language';

function Push() {
  const language = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();
  const Logo = useMemo(() => {
    if (language === 'en') {
      return LogoEn;
    }
    return LogoCn;
  }, [language]);

  const dispatch = useDispatch();

  const handleLanguageChange = (value: RootState['language']) => {
    dispatch(selectLanguage(value));
    i18n.changeLanguage(value);
  };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" />
      <div>
        <span className="version">
          {t('DemoVersion')}:{DEMO_VERSION}
        </span>
        <Select value={language} onChange={handleLanguageChange}>
          <Select.Option value="cn">中文</Select.Option>
          <Select.Option value="en">English</Select.Option>
        </Select>
        <span className="doc_link">
          <a href={DOC_URL} target="_blank" rel="noreferrer">
            {t('document')}
          </a>
        </span>
      </div>
    </header>
  );
}

export default Push;
