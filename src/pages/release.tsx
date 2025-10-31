import React from 'react';
import Layout from '@theme/Layout';
import styles from './coming-soon.module.css';

export default function Release(): React.JSX.Element {
  return (
    <Layout
      title="Release - Coming Soon"
      description="Comprehensive release management for mobile applications">
      <main className={styles.comingSoonContainer}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>📦</span>
          </div>
          
          <h1 className={styles.title}>Release</h1>
          <h2 className={styles.subtitle}>Coming Soon</h2>
          
          <p className={styles.description}>
            Intelligent distribution and release orchestration.
            Secure links, QR codes, app store integration, and automated workflows
            for seamless mobile app distribution.
          </p>

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔗</span>
              <span>Secure Links</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📱</span>
              <span>QR Code Distribution</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🏪</span>
              <span>App Store Integration</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📊</span>
              <span>Graded Rollouts</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💬</span>
              <span>Slack/Teams Notifications</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✅</span>
              <span>Approval Workflows</span>
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
            <a href="https://github.com/ds-horizon" className="button button--secondary button--lg">
              View on GitHub
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
