import React from 'react';
import { mansStyles } from '../utils/constants';
import styles from '../styles/components/Mans.module.scss';


const Mans = ({region, setSmall, setMedium, setLarge}) => {
  let style;
  
  mansStyles.forEach(item => {
    if (item.region === region) style = { top: item.top, left: item.left };
  })
  return (
  <div className={styles.mans} style={style}>
    <div className={styles.mans_3} onClick = {setLarge}></div>
    <div className={styles.mans_2} onClick = {setMedium}></div>
    <div className={styles.mans_1} onClick = {setSmall}></div>
  </div>
  );
};
export default Mans;