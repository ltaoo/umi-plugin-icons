import React from 'react';

import { LikeOutlined, SearchOutlined } from '@icons';

import styles from './index.css';

export default () => (
  <div className={styles.normal}>
    Hello Umi!
    <LikeOutlined />
    <SearchOutlined className={styles.icon} />
  </div>
);
