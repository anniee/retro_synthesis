import React from "react";
import {createUseStyles} from 'react-jss';

const useHeaderStyles = createUseStyles({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  hero: {
    display: 'flex'
  },
  logoIcon: {
    height: '100px',
    width: '100px'
  },
  logoText: {
    fontFamily: 'monospace',
    fontSize: '40px',
    color: '#D6FFB7',
    textShadow: '0px 0px 3px #000000'
  },
  instructionsText: {
    fontFamily: 'Arial',
    paddingLeft: '8em',
    marginTop:'0px',
    fontWeight: 'bold',
    fontStyle: 'italic'
  }

});

export const Header = () => {
  const styles = useHeaderStyles();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.hero}>
        <img src="/retrosynth.png" alt="green Erlenmeyer flask icon" className={styles.logoIcon} />
        <h1 className={styles.logoText}>RetroSynthesis</h1>
      </div>
      <p className={styles.instructionsText}>&rarr; Select a route to display synthesis of target molecule</p>
      <p className={styles.instructionsText}>&rarr; Hover over reactants for vendor info</p>
    </div>
  );
};
