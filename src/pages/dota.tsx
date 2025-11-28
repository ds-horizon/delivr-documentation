import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import React from 'react';
import styles from './dota.module.css';

function SectionCard({icon, title, description, link, features}: {
  icon: string;
  title: string;
  description: string;
  link: string;
  features: string[];
}) {
  return (
    <Link to={link} className={styles.sectionCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{icon}</div>
        <h3>{title}</h3>
      </div>
      <p className={styles.cardDescription}>{description}</p>
      <ul className={styles.featureList}>
        {features.map((feature, index) => (
          <li key={index}>
            <span className={styles.checkmark}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <div className={styles.cardLink}>
        Explore Documentation
      </div>
    </Link>
  );
}

export default function DOTA(): React.JSX.Element {
  return (
    <Layout
      title="DOTA - Over-the-Air Updates"
      description="Instantly deliver JS and asset updates to your React Native apps">
      <main className={styles.dotaPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>DOTA</h1>
              <p className={styles.heroSubtitle}>Delivr Over-The-Air Updates</p>
              <p className={styles.heroDescription}>
                Instantly deliver JavaScript and asset updates to your React Native applications
                without waiting for app store approval. Self-hostable, flexible, and built for modern mobile development.
              </p>
              <div className={styles.heroButtons}>
                <Link
                  className="button button--primary button--lg"
                  to="/dota/intro">
                  Get Started
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="https://github.com/ds-horizon/delivr">
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className={styles.features}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why DOTA?</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3>Instant Deployments</h3>
                <p>Push updates directly to users without app store delays. Deploy fixes and features in minutes, not days.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎯</div>
                <h3>Targeted Rollouts</h3>
                <p>Deploy to specific user segments with gradual rollouts. Control exposure and manage risk effectively.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔄</div>
                <h3>Easy Rollbacks</h3>
                <p>Instantly revert to previous versions if issues arise. Minimize user impact with one-click rollbacks.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔌</div>
                <h3>Self-Hosted</h3>
                <p>Run on your infrastructure with complete control. Plugin-based architecture adapts to any cloud provider.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className={styles.documentation}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Complete Documentation</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to integrate, deploy, and manage OTA updates for your React Native apps
            </p>
            <div className={styles.sectionsGrid}>
              <SectionCard
                icon="📱"
                title="SDK (React Native)"
                description="Integrate DOTA into your React Native application with our powerful SDK."
                link="/dota/sdk/overview"
                features={[
                  'Easy integration with React Native',
                  'iOS and Android support',
                  'Automated bundle generation',
                  'Flexible update policies',
                  'Silent and mandatory updates'
                ]}
              />
              <SectionCard
                icon="🖥️"
                title="Server (Backend)"
                description="Self-hostable backend service that powers the entire OTA update ecosystem."
                link="/dota/server/overview"
                features={[
                  'Docker-first architecture',
                  'Multi-cloud support (AWS, Azure)',
                  'Plugin-based extensibility',
                  'Local development setup',
                  'Production-ready deployment'
                ]}
              />
              <SectionCard
                icon="🎛️"
                title="Web Panel (Dashboard)"
                description="Modern web interface for managing apps, deployments, and monitoring releases."
                link="/dota/web-panel/overview"
                features={[
                  'Visual deployment management',
                  'Real-time analytics',
                  'Rollout controls',
                  'Team collaboration',
                  'Release monitoring'
                ]}
              />
              <SectionCard
                icon="⌨️"
                title="CLI (Command Line)"
                description="Powerful command-line tool for automated deployments and CI/CD integration."
                link="/dota/cli/overview"
                features={[
                  'Full and patch bundle releases',
                  'CI/CD pipeline integration',
                  'Automated workflows',
                  'Deployment promotion',
                  'Multiple compression options'
                ]}
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Integrate SDK</h3>
                <p>Add the DOTA SDK to your React Native app with a few lines of code.</p>
              </div>
              <div className={styles.stepArrow}>→</div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Deploy Server</h3>
                <p>Set up the backend server locally, on-premise, or in your preferred cloud.</p>
              </div>
              <div className={styles.stepArrow}>→</div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Configure Keys</h3>
                <p>Generate deployment keys in the dashboard and embed them in your app.</p>
              </div>
              <div className={styles.stepArrow}>→</div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <h3>Push Updates</h3>
                <p>Deploy OTA updates instantly via CLI or web dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className="container">
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaSubtitle}>
              Deploy your first OTA update in minutes
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--primary button--lg"
                to="/dota/intro">
                Get Started
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="https://github.com/ds-horizon/delivr">
                Explore on GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

