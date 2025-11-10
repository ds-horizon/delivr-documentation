import Layout from '@theme/Layout';
import React from 'react';
import styles from './coming-soon.module.css';

export default function Build(): React.JSX.Element {
  return (
    <Layout
      title="Build - Coming Soon"
      description="Automated build pipelines for iOS and Android">
      <main className={styles.comingSoonContainer}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>🏗️</span>
          </div>
          
          <h1 className={styles.title}>Build</h1>
          <h2 className={styles.subtitle}>Coming Soon</h2>
          
          <p className={styles.description}>
            Complete build lifecycle management from code commit to artifact delivery.
            Automated pipelines with Git integration, YAML configs, and multi-variant support
            for iOS and Android.
          </p>

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔗</span>
              <span>Git Integration</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📝</span>
              <span>YAML Configuration</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🖥️</span>
              <span>Real-Time Logs</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📦</span>
              <span>Artifact Management</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🍎</span>
              <span>iOS & Android</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔐</span>
              <span>Signing & Secrets</span>
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
            <a href="https://github.com/orgs/ds-horizon/repositories?q=delivr" className="button button--secondary button--lg">
              View on GitHub
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
