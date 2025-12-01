import Layout from '@theme/Layout';
import React from 'react';
import styles from './coming-soon.module.css';

export default function Testing(): React.JSX.Element {
  return (
    <Layout
      title="Testing - Coming Soon"
      description="Comprehensive testing infrastructure for mobile applications">
      <main className={styles.comingSoonContainer}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>🧪</span>
          </div>
          
          <h1 className={styles.title}>Testing</h1>
          <h2 className={styles.subtitle}>Coming Soon</h2>
          
          <p className={styles.description}>
            Enterprise-grade mobile testing infrastructure.
            Cloud-based real-device testing, automated provisioning, visual regression,
            and comprehensive quality assurance workflows.
          </p>

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📱</span>
              <span>Real Device Testing</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🤖</span>
              <span>Automated Provisioning</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>👁️</span>
              <span>Visual Regression</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚡</span>
              <span>Parallel Execution</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📊</span>
              <span>Performance Metrics</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>☁️</span>
              <span>Cloud Infrastructure</span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <a href="/" className="button button--primary button--lg">
              Back to Home
            </a>
            <a href="/dota/intro" className="button button--secondary button--lg">
              Explore DOTA
            </a>
            <a href="https://github.com/orgs/dream-horizon-org/repositories?q=delivr" className="button button--secondary button--lg">
              View on GitHub
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
