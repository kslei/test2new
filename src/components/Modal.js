import React from 'react';
import Star from '../images/Files/Star.png'
import styles from '../styles/components/Modal.module.scss';


const Modal = ({tableBlue, tableRed, closeModal}) => {
  let tableSortBlue = tableBlue.sort((a, b) => b.number - a.number);
  let tableSortRed = tableRed.sort((a, b) => b.number - a.number);
  
  return (
  <div className={styles.modal}>
    <button className={styles.close} onClick = {closeModal}></button>
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <div className={styles.title}>ByteCloud</div>
        {tableSortBlue.map(item => 
          <div className={styles.table} key={item.region}>
            <div className={styles.header}>
              <div className={styles.header__title}>{item.name}</div>
              <ul className={styles.rating}>
                {item.rating >= 1 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 2 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 3 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 4 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 5 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
              </ul>
            </div>
            <div className={styles.row}>
              <div className={styles.latency}>Latency:  <span>{item.latency}</span></div>
              <div className={styles.download}>Download time:  <span>{item.download} sec</span></div>
            </div>
            <div className={styles.video}>Video streaming: <span>{item.video}</span></div>
          </div>
        )}
      </div>
      <div className={styles.column}>
        <div className={styles.title}>Object Storage</div>
        {tableSortRed.map(item =>
          <div className={styles.table} key={item.region}>
            <div className={styles.header}>
              <div className={styles.header__title}>{item.name}</div>
                <ul className={styles.rating}>
                {item.rating >= 1 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 2 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 3 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 4 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
                {item.rating >= 5 ? <img src={require("../images/Files/Star-active.png")} /> : <img src={require("../images/Files/Star.png")} />}
              </ul>
            </div>
            <div className={styles.row}>
              <div className={styles.latency}>Latency:  <span>{item.latency}</span></div>
              <div className={styles.download}>Download time:  <span>{item.download} sec</span></div>
            </div>
            <div className={styles.video}>Video streaming: <span>{item.video}</span></div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};
export default Modal;