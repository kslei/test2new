import React, { useState } from 'react';
import styles from '../styles/components/Desc.module.scss';


const Desc = ({description}) => {
  const [data, setData] = useState (`Latency: ${description.latency}`);
  let style = {
    top: description.top,
    left: description.left,
  }
  
  setTimeout(() => {
    setData(`Time: ${description.time} ms`);
  }, 3000);
  console.log(data)
  return (
  <div className={styles.description} style={style}>
    {data}
  </div>
  );
};
export default Desc;