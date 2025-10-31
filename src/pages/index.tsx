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
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Delivr</h1>
          <p className={styles.heroTagline}>
            Ship Mobile Apps with Confidence
          </p>
          <p className={styles.heroDescription}>
            The unified app distribution platform that eliminates operational overhead,
            accelerates release velocity, and empowers mobile engineering teams to focus on building features.
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/dota/intro">
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="https://github.com/ds-horizon">
              View on GitHub
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>30-40%</div>
              <div className={styles.statLabel}>Time Saved</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>2-3x</div>
              <div className={styles.statLabel}>Faster Releases</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>Zero</div>
              <div className={styles.statLabel}>DevOps Dependency</div>
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
        {/* Value Proposition */}
        <section className={styles.valueSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              Stop Managing Infrastructure.<br/>Start Shipping Features.
            </h2>
            <p className={styles.sectionSubtitle}>
              Delivr unifies high-speed build generation, multi-variant configurations, and intelligent rollouts
              in a single, fully managed workflow. Focus on building great products, not managing pipelines.
            </p>
          </div>
        </section>

        {/* Problems Section */}
        <section className={styles.problemsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>The Mobile Release Challenge</h2>
            <p className={styles.sectionSubtitle}>
              Modern mobile app delivery is operationally heavy and creates critical bottlenecks
            </p>
            <div className={styles.problemsGrid}>
              <ProblemCard
                icon="🔧"
                title="Fragmented Toolchain"
                description="Juggling multiple disconnected systems for CI/CD, builds, and releases requires constant context switching and manual coordination."
              />
              <ProblemCard
                icon="⚙️"
                title="Infrastructure Burden"
                description="Managing build servers, YAML configs, and pipelines drains 30-40% of engineering bandwidth that could be spent on features."
              />
              <ProblemCard
                icon="📊"
                title="Lack of Visibility"
                description="Without unified insights into release health and build performance, teams can't identify bottlenecks or measure rollout success."
              />
              <ProblemCard
                icon="🐌"
                title="Slow & Risky Releases"
                description="Manual validations, limited automation, and weak rollback mechanisms lead to delayed rollouts and higher failure risk."
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className={styles.productsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>One Platform. Complete Workflow.</h2>
            <p className={styles.sectionSubtitle}>
              From code commit to user delivery—everything you need in one place
            </p>
            <div className={styles.productsGrid}>
              <ProductCard
                icon="🚀"
                title="DOTA"
                description="Over-the-air updates for instant JS bundle deployments. Push fixes and features without app store delays. Manage deployment keys, differential updates, and mandatory patches."
                status="available"
                link="/dota/intro"
              />
              <ProductCard
                icon="🏗️"
                title="Build"
                description="End-to-end build lifecycle management with Git integration, YAML configs, real-time logs, and artifact generation for APK, IPA, AAB, and JS bundles across all variants."
                status="coming-soon"
                link="/build"
              />
              <ProductCard
                icon="📦"
                title="Release"
                description="Intelligent distribution with secure links, QR codes, App Store/Play Store integration, graded rollouts, and automated notifications via Slack and Teams."
                status="coming-soon"
                link="/release"
              />
              <ProductCard
                icon="🧪"
                title="Testing"
                description="Cloud-based real-device testing, automated simulator provisioning, visual regression checks, and comprehensive quality assurance workflows."
                status="coming-soon"
                link="/testing"
              />
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className={styles.audienceSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Built for Modern Mobile Teams</h2>
            <div className={styles.audienceGrid}>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIcon}>👨‍💻</div>
                <h3>Developers</h3>
                <p>Automate builds and rollouts without worrying about infrastructure. Ship faster with confidence.</p>
              </div>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIcon}>🧪</div>
                <h3>QA & Product Teams</h3>
                <p>Gain real-time visibility into release progress, quality gates, and approval workflows.</p>
              </div>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIcon}>📈</div>
                <h3>Engineering Leaders</h3>
                <p>Achieve faster, more reliable releases and measurable productivity gains without scaling DevOps teams.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>The Delivr Advantage</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>⚡</div>
                <h3>Eliminate Operational Overhead</h3>
                <p>Reclaim 30-40% of engineering time currently spent on release management and infrastructure maintenance.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🚀</div>
                <h3>Accelerate Release Velocity</h3>
                <p>Ship 2-3x faster with automated workflows, intelligent rollouts, and zero context switching.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🎯</div>
                <h3>Ship with Confidence</h3>
                <p>Comprehensive monitoring, graded rollouts, and instant rollback ensure every release is safe and controlled.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🔌</div>
                <h3>Self-Hosted & Flexible</h3>
                <p>Deploy on your infrastructure with full control. Plugin architecture adapts to any cloud provider or workflow.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📊</div>
                <h3>Unified Visibility</h3>
                <p>Real-time dashboards for release health, build performance, crash rates, and adoption metrics in one place.</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>👥</div>
                <h3>No DevOps Required</h3>
                <p>Releases become a natural extension of development, not an operational project requiring specialized teams.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className={styles.futureSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Evolving with Intelligence</h2>
            <p className={styles.sectionSubtitle}>
              Delivr is becoming a self-optimizing system that learns and improves with every release
            </p>
            <div className={styles.futureGrid}>
              <div className={styles.futureCard}>
                <div className={styles.futureIcon}>🤖</div>
                <h3>AI-Driven Insights</h3>
                <p>Machine learning analyzes build logs, detects bottlenecks, and recommends optimizations automatically.</p>
              </div>
              <div className={styles.futureCard}>
                <div className={styles.futureIcon}>📈</div>
                <h3>Release Success Score</h3>
                <p>Composite metrics combining stability, performance, and adoption provide measurable quality indicators.</p>
              </div>
              <div className={styles.futureCard}>
                <div className={styles.futureIcon}>🎯</div>
                <h3>Predictive Quality</h3>
                <p>Historical data patterns help predict and prevent issues before they reach production.</p>
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

