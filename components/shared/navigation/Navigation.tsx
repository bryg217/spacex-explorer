import React from 'react';
import { IconContext } from 'react-icons';
import { MdHome, MdHistory } from 'react-icons/md';

import styles from './Navigation.module.css';

const iconsStyles = { className: 'dark-mode-font-color', size: '2rem' };

export interface NavigationProps {
  historyButtonText: string
  homeButtonText: string
  onClickHome: React.MouseEventHandler<HTMLDivElement>
  onClickHistory: React.MouseEventHandler<HTMLDivElement>
}

interface NavigationButtonProps {
  icon: React.ReactNode
  id: string // used for testing
  onClick: React.MouseEventHandler<HTMLDivElement>
  text: string
}

/**
 * @description Wrapper for keeping code dry
 */
const NavigationButton = ({
  icon,
  id,
  onClick,
  text
}: NavigationButtonProps) => {
  return (
    <div className={styles.button} id={id} role="button" onClick={onClick}>
      {icon}
      <span className={`${styles.text} dark-mode-font-color`}>{text}</span>
    </div>
  );
};

const Navigation = ({
  historyButtonText,
  homeButtonText,
  onClickHome,
  onClickHistory
}: NavigationProps) => {
  return (
    <IconContext.Provider value={iconsStyles}>
      <div className={styles.navigation}>
        <NavigationButton
          icon={<MdHome/>}
          id="navigation-button-home"
          onClick={onClickHome}
          text={homeButtonText}
        />
        <NavigationButton
          icon={<MdHistory/>}
          id="navigation-button-history"
          onClick={onClickHistory}
          text={historyButtonText}
        />
      </div>
    </IconContext.Provider>
  );
};

export default Navigation;