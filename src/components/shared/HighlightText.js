import React from 'react';
import { useLocation } from 'react-router-dom';

import cursorExpandBig from '../../animations/cursorExpandBig';
import cursorBackToNormal from '../../animations/cursorBackToNormal';
import Link from './Link';
import cursorMultiDot from '../../animations/cursorMultiDot'

const HighlightText = ({ children, type, to }) => {
  let classes = ['highlight-text']
  const location = useLocation()
  let selectType = () => {
    switch (type) {
      case 'white':
        classes.push('highlight-text--white')
        return;
      case 'black': {
        classes.push('highlight-text--black')
        return;
      }
      case 'dark': {
        classes.push('highlight-text--dark')
        return;
      }
      default: return;
    }
  }
  selectType();
  let content = children;

  if (to) {
    content = <Link to={to}>{children}</Link>
  }

  const mouseOver = () => {
    if (location.pathname === '/') {
      document.querySelector(`.home__welcome--shadow span[data-text="${children}"]`).focus()
    }
    cursorExpandBig();
    if (location.pathname === '/work') {
      document.removeEventListener('mousedown', cursorMultiDot);
    }
  }
  const mouseOut = () => {
    if (location.pathname === '/') {
      document.querySelector(`.home__welcome--shadow span[data-text="${children}"]`).blur()
    }
    cursorBackToNormal();
    if (location.pathname === '/work') {
      document.addEventListener('mousedown', cursorMultiDot);
    }
  }

  return (
    <span>
      <span data-text={children} tabIndex="-1" onMouseOver={mouseOver} onMouseOut={mouseOut} className={classes.join(' ')}>{content}</span>
    </span>
  );
}

export default HighlightText;