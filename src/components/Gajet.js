import React from 'react';
import { gajetStyles } from '../utils/constants';
import styles from '../styles/components/Gajet.module.scss';


const Gajet = ({region, type, down}) => {
  let style;
  gajetStyles.forEach(item => {
    if (item.region === region && item.type === type) style = { top: item.top, left: item.left }
  })
  let classN;
  let w;
  if (type === "small") {classN = styles.gajet_small; w = '60%'};
  if (type === "medium") {classN = styles.gajet_medium; w = '100%'};
  if (type === "large") {classN = styles.gajet_large; w = '60%'};
  //console.log(classN)
  return (
  <div className={classN} style={style} >
    <div className={styles.mask}>
      <div className={styles.back} style={down? {width: w, transition: '3s'} : {width: '0%', transition: '0s'}}></div>
    </div>
  </div>
  );
};
export default Gajet;