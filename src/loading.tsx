import { Spin } from 'antd';
import styles from './loading.less';

export default function PageLoading() {
  return (
    <Spin spinning>
      <div className={styles.loading} />
    </Spin>
  );
}
