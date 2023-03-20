import React, {useEffect, useState} from 'react';
import Mans from './Mans';
import Gajet from './Gajet';

const Region = ({region, setusers, setregion, enableMans, setCountRegion, down, reset, setReset}) => {
  const [mans, setMans] = useState(true);
  const [small, setSmall] = useState("");
  const [medium, setMedium] = useState("");
  const [large, setLarge] = useState("");
  
  useEffect(()=>{
    setusers(small + "-" + medium + "-" + large);
    if(small || medium || large) {
      setregion(region)
      setCountRegion();
    };
  }, [mans])
  useEffect(() => {
    Reset();
  }, [reset])
  
  const Reset = () => {
    setMans(true);
    setSmall("");
    setLarge("");
    setMedium("");
    setReset()
  }
  const setlarge = () => {
    setLarge(region + "_3");
    setMedium(region + "_2");
    setSmall(region + "_1");
    setMans(false);
  }
  const setmedium = () => {
    setMedium(region + "_2");
    setSmall(region + "_1");
    setMans(false);
  }
  const setsmall = () => {
    setSmall(region + "_1");
    setMans(false);
  }
  return (
    <div>
      {mans && enableMans &&
        <Mans region={region} setSmall={setsmall} setMedium={setmedium} setLarge={setlarge} />
      }
      {small &&
        <Gajet region={region} type={"small"} down={down}/>
      }
      {medium &&
        <Gajet region={region} type={"medium"} down={down}/>
      }
      {large &&
        <Gajet region={region} type={"large"} down={down}/>
      }
    </div>
  
  );
};
export default Region;