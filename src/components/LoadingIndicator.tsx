import React from 'react';
import styles from './LoadingIndicator.module.css';

const LoadingIndicator: React.FC = () => {
    return <div className={styles.spinner}>Loading...</div>;
};

export default LoadingIndicator;
