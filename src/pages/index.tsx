import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left Section - Main Content */}
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeText}>Open Source</span>
              <span className={styles.badgeSeparator}>•</span>
              <span className={styles.badgeText}>Battle-Tested at Dream11</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <svg className={styles.heroIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Delivr
            </h1>
            
            <p className={styles.heroSubtitle}>
              Mobile DevOps Platform for Modern Teams
            </p>
            
            <p className={styles.heroDescription}>
              An open-source platform designed to simplify how teams build, release, and update mobile applications. 
              Bring together Release Management, Over-the-Air updates, and Build Orchestration into one cohesive system. 
              Make mobile delivery <strong>faster</strong>, <strong>safer</strong>, and <strong>more consistent</strong>.
            </p>
            
            <div className={styles.heroButtons}>
              <Link
                className={clsx("button button--lg", styles.primaryButton)}
                to="/dota/intro">
                Get Started
                <span className={styles.buttonArrow}>→</span>
              </Link>
              <Link
                className={clsx("button button--lg", styles.secondaryButton)}
                to="https://github.com/ds-horizon">
                View on GitHub
                <svg className={styles.githubIcon} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Section - Feature Cards */}
          <div className={styles.heroRight}>
            <div className={clsx(styles.featureCard, styles.featureCard1)}>
              <div className={styles.featureIconWrapper}>
                <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Release Management</h3>
                <p className={styles.featureDescription}>
                  Coordinate store and OTA rollouts with approvals, release trains, and guardrails
                </p>
              </div>
            </div>

            <div className={clsx(styles.featureCard, styles.featureCard2)}>
              <div className={styles.featureIconWrapper}>
                <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Over-the-Air Updates</h3>
                <p className={styles.featureDescription}>
                  Deliver instant patches without app store submissions. Staged rollouts and automatic rollback
                </p>
              </div>
            </div>

            <div className={clsx(styles.featureCard, styles.featureCard3)}>
              <div className={styles.featureIconWrapper}>
                <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Build Orchestration</h3>
                <p className={styles.featureDescription}>
                  Declarative builds integrated with CI/CD. Manage artifacts for Android, iOS, and React Native
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProblemCard({icon, title, description}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.problemCard}>
      <div className={styles.problemIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProductCard({icon, title, description, status, link}: {
  icon: string;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  link: string;
}) {
  return (
    <Link to={link} className={styles.productCard}>
      <div className={styles.productHeader}>
        <div className={styles.productIcon}>{icon}</div>
        {status === 'coming-soon' && (
          <span className={styles.comingSoonBadge}>Coming Soon</span>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.productLink}>
        Learn more →
      </div>
    </Link>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Delivr - Ship Mobile Apps with Confidence"
      description="Unified app distribution platform that eliminates operational overhead and accelerates mobile release velocity">
      <HomepageHeader />
      <main>
        {/* Challenge Section */}
        <section className={styles.challengeSection}>
          <div className="container">
            <div className={styles.challengeHeader}>
              <h2 className={styles.challengeTitle}>
                The Mobile Release Challenge
              </h2>
              <p className={styles.challengeSubtitle}>
                Modern mobile app delivery is operationally heavy and creates critical bottlenecks
              </p>
            </div>
            
            <div className={styles.challengeGrid}>
              <div className={styles.challengeCard}>
                <div className={styles.challengeCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.challengeCardTitle}>Fragmented Toolchain</h3>
                <p className={styles.challengeCardDesc}>
                  Juggling multiple disconnected systems for CI/CD, builds, and releases requires constant context switching and manual coordination.
                </p>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.challengeCardTitle}>Infrastructure Burden</h3>
                <p className={styles.challengeCardDesc}>
                  Managing build servers, YAML configs, and pipelines drains 30-40% of engineering bandwidth that could be spent on features.
                </p>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.challengeCardTitle}>Lack of Visibility</h3>
                <p className={styles.challengeCardDesc}>
                  Without unified insights into release health and build performance, teams can't identify bottlenecks or measure rollout success.
                </p>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.challengeCardTitle}>Slow & Risky Releases</h3>
                <p className={styles.challengeCardDesc}>
                  Manual validations, limited automation, and weak rollback mechanisms lead to delayed rollouts and higher failure risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className={styles.productsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>One Platform. Complete Workflow.</h2>
              <p className={styles.sectionSubtitle}>
                From code commit to user delivery—everything you need in one place
              </p>
            </div>
            <div className={styles.productsGrid}>
              <Link to="/dota/intro" className={styles.productCard}>
                <div className={styles.productHeader}>
                  <div className={styles.productIconWrapper}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className={styles.productTitle}>DOTA</h3>
                <p className={styles.productDescription}>Over-the-air updates for instant JS bundle deployments. Push fixes and features without app store delays. Manage deployment keys, differential updates, and mandatory patches.</p>
                <div className={styles.productLink}>
                  Learn more →
                </div>
              </Link>

              <div className={styles.productCard}>
                <div className={styles.productHeader}>
                  <div className={styles.productIconWrapper}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                </div>
                <h3 className={styles.productTitle}>Build</h3>
                <p className={styles.productDescription}>End-to-end build lifecycle management with Git integration, YAML configs, real-time logs, and artifact generation for APK, IPA, AAB, and JS bundles across all variants.</p>
              </div>

              <div className={styles.productCard}>
                <div className={styles.productHeader}>
                  <div className={styles.productIconWrapper}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                </div>
                <h3 className={styles.productTitle}>Release</h3>
                <p className={styles.productDescription}>Intelligent distribution with secure links, QR codes, App Store/Play Store integration, graded rollouts, and automated notifications via Slack and Teams.</p>
              </div>

              <div className={styles.productCard}>
                <div className={styles.productHeader}>
                  <div className={styles.productIconWrapper}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                </div>
                <h3 className={styles.productTitle}>Testing</h3>
                <p className={styles.productDescription}>Cloud-based real-device testing, automated simulator provisioning, visual regression checks, and comprehensive quality assurance workflows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className={styles.audienceSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Built for Modern Mobile Teams</h2>
            </div>
            <div className={styles.audienceGrid}>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.audienceTitle}>Developers</h3>
                <p className={styles.audienceDescription}>Automate builds and rollouts without worrying about infrastructure. Ship faster with confidence.</p>
              </div>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.audienceTitle}>QA & Product Teams</h3>
                <p className={styles.audienceDescription}>Gain real-time visibility into release progress, quality gates, and approval workflows.</p>
              </div>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.audienceTitle}>Engineering Leaders</h3>
                <p className={styles.audienceDescription}>Achieve faster, more reliable releases and measurable productivity gains without scaling DevOps teams.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>The Delivr Advantage</h2>
            </div>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>Eliminate Operational Overhead</h3>
                <p className={styles.benefitDescription}>Reclaim 30-40% of engineering time currently spent on release management and infrastructure maintenance.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>Accelerate Release Velocity</h3>
                <p className={styles.benefitDescription}>Ship 2-3x faster with automated workflows, intelligent rollouts, and zero context switching.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>Ship with Confidence</h3>
                <p className={styles.benefitDescription}>Comprehensive monitoring, graded rollouts, and instant rollback ensure every release is safe and controlled.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>Self-Hosted & Flexible</h3>
                <p className={styles.benefitDescription}>Deploy on your infrastructure with full control. Plugin architecture adapts to any cloud provider or workflow.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>Unified Visibility</h3>
                <p className={styles.benefitDescription}>Real-time dashboards for release health, build performance, crash rates, and adoption metrics in one place.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>No DevOps Required</h3>
                <p className={styles.benefitDescription}>Releases become a natural extension of development, not an operational project requiring specialized teams.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className={styles.futureSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Evolving with Intelligence</h2>
              <p className={styles.sectionSubtitle}>
                Delivr is becoming a self-optimizing system that learns and improves with every release
              </p>
            </div>
            <div className={styles.futureGrid}>
              <div className={styles.futureCard}>
                <div className={styles.futureIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.futureTitle}>AI-Driven Insights</h3>
                <p className={styles.futureDescription}>Machine learning analyzes build logs, detects bottlenecks, and recommends optimizations automatically.</p>
              </div>
              <div className={styles.futureCard}>
                <div className={styles.futureIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.futureTitle}>Release Success Score</h3>
                <p className={styles.futureDescription}>Composite metrics combining stability, performance, and adoption provide measurable quality indicators.</p>
              </div>
              <div className={styles.futureCard}>
                <div className={styles.futureIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={styles.futureTitle}>Predictive Quality</h3>
                <p className={styles.futureDescription}>Historical data patterns help predict and prevent issues before they reach production.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <h2 className={styles.ctaTitle}>Transform Your Mobile Release Process</h2>
            <p className={styles.ctaSubtitle}>
              Join teams that ship faster, with less overhead, and more confidence
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--primary button--lg"
                to="/dota/intro">
                Start with DOTA
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="https://github.com/ds-horizon">
                Explore on GitHub
              </Link>
            </div>
            <p className={styles.ctaNote}>
              Self-hosted • Open Source • Enterprise-Ready
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

