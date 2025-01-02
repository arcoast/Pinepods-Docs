import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Own Everything, Run Everywhere',
    Svg: require('../../static/img/os.svg').default,
    description: (
      <>
        Every aspect of PinePods is fully open sourced and the code is available on Github. There's zero data collection and you can self-host every aspect of the application. Run anywhere you can run a browser. There's a client on linux, mac, and windows. A mobile client is in the works.
      </>
    ),
  },
  {
    title: 'Zero Cost, Full Functionality',
    Svg: require('../../static/img/opensource.svg').default,
    description: (
      <>
        Get all the features of the paid podcast apps. PinePods will never cost a dime and survives solely on donations. Rest easy knowing you'll always be able to sync your saved podcasts and user settings between devices.
      </>
    ),
  },
  {
    title: 'Powered by Python and Rust',
    imageSrc: require('../../static/img/pythonlogo.png').default,
    description: (
      <>
        Created with a Python Backend and a Rust frontend for speed and performance where it counts. The UI is made with the Yew web framework, the API is FastAPI.
      </>
    ),
  },
];

function Feature({ Svg, title, description, imageSrc }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} alt={title} />}
        {imageSrc && <img src={imageSrc} className={styles.featureSvg} alt={title} />}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Detailed Introduction Section */}
        <div className="text--center padding-horiz--md">
          <div className="key-features margin-bottom--xl">
            <h2>Self-Hosted Podcast Management</h2>
            <p>
              Pinepods is a powerful, self-hosted podcast management system that puts you in control. Built with Rust for performance and reliability, it's designed to be your personal podcast server that follows you across all your devices.
            </p>
          </div>

          <div className="features-grid margin-bottom--xl">
            <div className="row">
              <div className="col">
                <h3>Core Features</h3>
                <ul className="clean-list">
                  <li>🌐 Access your podcasts everywhere</li>
                  <li>👥 Multi-user support</li>
                  <li>🔍 Smart podcast discovery</li>
                  <li>🔄 Nextcloud & gpodder sync</li>
                  <li>🎨 Multiple themes</li>
                  <li>🔐 Privacy-focused</li>
                </ul>
              </div>
              <div className="col">
                <h3>Technical Stack</h3>
                <ul className="clean-list">
                  <li>⚡️ Rust & Python powered</li>
                  <li>🗄️ PostgreSQL/MySQL support</li>
                  <li>🔧 Docker ready</li>
                  <li>📱 PWA enabled</li>
                  <li>🔌 Podcast Index & iTunes API</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="try-pinepods margin-bottom--xl">
            <p>
              Try it now at <a href="https://try.pinepods.online">try.pinepods.online</a> or set up your own server with our simple guide.
            </p>
          </div>
        </div>

        {/* Original Feature List */}
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
