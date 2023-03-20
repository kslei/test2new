import React, { useEffect, useState } from 'react';
import { serverStyles } from '../utils/constants';
import styles from '../styles/components/Server.module.scss';


const Server = ({position, countServer, setCountServer, enableCloud, setservers}) => {
  const [cloud, setCloud] = useState(true);
  const [server, setServer] = useState("");
  const [serverR, setServerR] = useState("");
  const [opServ, setOpServ] = useState(0);
  const [opCl, setOpCl] = useState(1);
  let style;
  let classN;
  
  const setserver = () => {
    if (countServer === 0) setServerR(position);
    setServer(position);
    setOpCl(false);
    setCountServer();
    setTimeout(()=>{
      setOpServ(1);
      setCloud(false);
    }, 300)
  }

  useEffect(()=>{
    setservers(server);    
  }, [cloud])

  countServer === 1 ? classN = styles.server_red : classN = styles.server;
  serverStyles.forEach(item => {
    if (item.position === position) style={top: item.top, left: item.left}
  })
  return (
    <div className={styles.container} style={style}>
      {cloud && enableCloud &&
        <div className={styles.cloud} onClick={setserver} style={{opacity: opCl}}></div>
      }
      {serverR &&
        <div className={styles.server_red} style={{opacity: opServ}}></div>
      }
      {server && !serverR &&
        <div className={styles.server} style={{opacity: opServ}}></div>
      }
      
    </div>
  );
};
export default Server;