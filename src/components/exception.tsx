import React from 'react';
import styles from './exception.less';

class Exception extends React.PureComponent<any> {
  render() {
    const { type, message } = this.props;

    return (
      <div className={styles.error}>
        <h1>{message}</h1>
        <div className={styles.pesan}>{type}</div>
      </div>
    );
  }
}

export default Exception;
