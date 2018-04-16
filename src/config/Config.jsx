import React from 'react';
import { Link } from 'react-router-dom';
import './Config.css';

const Config = () => (
  <div className="config-grid">
    <section className="config-main">
      <h1>Config</h1>
      <label htmlFor="clock-time">Clock Time: <input id="clock-time" /></label>
      <label htmlFor="bonus-time-per-move">Bonus time per move: <input id="bonus-time-per-move" /></label>
      <input type="submit" value="submit" />
      <Link href="#home" to="/">Back</Link>
    </section>
  </div>
);

export default Config;
