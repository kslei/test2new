import React, { useEffect, useState } from "react";
import Region from "./components/Region";
import Server from "./components/Server";
import Desc from "./components/Desc";
import Modal from "./components/Modal";
import { regions } from "./utils/constants";
import { mansStyles, serverStyles, latencies, description } from "./utils/constants";
import "./styles/app.scss";

function App() {
  const [countregion, setCountRegion] = useState(0);
  const [countServer, setCountServer] = useState(0);
  const [enableMans, setEnableMans] = useState(true);
  const [enableCloud, setEnableCloud] = useState(true);
  const [enableServer, setEnableServer] = useState(false);
  const [users, setUsers] = useState([]);
  const [region, setRegion] = useState([]);
  const [serversBlue, setServersBlue] = useState([]);
  const [serversRed, setServersRed] = useState([]);
  const [routesBlue, setRoutesBlue] = useState([]);
  const [routesRed, setRoutesRed] = useState([]);
  const [tableBlue, setTableBlue] = useState([]);
  const [tableRed, setTableRed] = useState([]);
  const [desc, setDesc] = useState([]);
  const [path, setPath] = useState([]);
  const [down, setDown] = useState(false);
  const [modal, setModal] = useState(false);//Изменить!!!!!!!!!!!!
  const [res, setRes] = useState(false);
    
  const reset = () => {
    setRes(true);
    setCountRegion(0);
    setCountServer(0);
    setEnableMans(true);
    setEnableCloud(true);
    setEnableServer(false);
    setUsers([]);
    setRegion([]);
    setServersBlue([]);
    setServersRed([]);
    setTableBlue([]);
    setTableRed([]);
    setDesc([]);
    setPath([]);
    setDown(false);
  }
  const setres = () => {
    setRes(false);
  }
  
  const setcountregion = () => {
    setCountRegion(countregion + 1);
    if(countregion >= 4) {
      setEnableServer(true);
      setEnableMans(false);
    };
  }
  //console.log("countregion", countregion)
  const setcountserver = () => {
    setCountServer(countServer + 1);
  }
  const setusers = (data) => {
    data = data.split('-');
    let user = [];
    for(let i=0; i<data.length; i++) {
      if (data[i].length) user.push(data[i]);
    }
    setUsers(users.concat(user));
  }
  const setregion = (data) => {
    if (data) setRegion([...region, data])
  }
  const setservers = (data) => {
    if(data.length) {
      if (countServer == 1) {
        setServersRed([...serversRed, data]);
        setServersBlue([...serversBlue, data])
      } else {
        setServersBlue([...serversBlue, data]);
      }
    }
  }
  useEffect(() => {
    if (serversBlue.length > 3) startTest()
  }, [serversBlue])
  
  //console.log("users", users)
  //console.log("region", region)
  //console.log("countregion", countregion)
  //console.log("serversBlue", serversBlue)
  //console.log("serversRed", serversRed)
  const setroutes = (servers) => {
    let routes = [];
    for (let i = 0; i < region.length; i++) {
      let routelatency = {route: "", latency: 0, name: ""};
      let maxLatency = latencies.reduce((acc, curr) => acc.latency > curr.latency ? acc : curr).latency;
      let route;
      let name;
      for (let j = 0; j < servers.length; j++) {
        let path = servers[j] + '-' + region[i];
        let latency = latencies.find(item => item.path === path).latency;
        let name1 = regions.find(item => item.region === region[i]).name;
        if (latency <= maxLatency) {
          maxLatency = latency
          route = path;
          name = name1;
        }
      }
      routelatency.route = route;
      routelatency.latency = maxLatency;
      routelatency.name = name;
      routes.push(routelatency);
      //console.log(maxLatency, route);
    }
    return routes;
  }
  //console.log("routesBlue", routesBlue);
  //console.log("routesRed", routesRed)
  const startTest = () => {
    if(countServer > 2) {//ИЗМЕНИТЬ НА 2
      setEnableCloud(false);
      let routesblue = setroutes(serversBlue);
      let routesred = setroutes(serversRed);
      setRoutesRed(routesred);
      setTimeout(() => {
        setRoutesBlue(routesblue);
        setTimeout(()=>{
          setModal(true);
        }, 5000)
      }, 5000);
    }
  }
  useEffect(()=>{
    let pathred = drowPath(routesRed, "red");
    setPath(pathred);
    if(routesRed.length !== 0) {
      setDown(true)
    };
    let tablered = drowTable(routesRed);
    setTableRed(tablered);
    let descrred = drowDes(tablered);
    setDesc(descrred);
  }, [routesRed])

  useEffect(() => {
    let pathblue = drowPath(routesBlue, "blue");
    setDown(false)
    setPath(pathblue);
    setDesc([]);
    if(routesBlue.length !==0) {
      setTimeout(()=>{
        setDown(true);
        setDesc(descrblue);
      }, 20) 
    };
    let tableblue = drowTable(routesBlue);
    setTableBlue(tableblue);
    let descrblue = drowDes(tableblue);
    //setDesc(descrblue);
  }, [routesBlue])
  
  const drowPath = (routes, type) => {
    let path = [];
    for(let i = 0; i < routes.length; i++) {
      for(let j = 0; j < users.length; j++) {
        if (users[j].split('_')[0] == routes[i].route.split('-')[1]) {
          path.push(routes[i].route.split('-')[0] + "-" + users[j] + "_" + type);
        }
      }
    }
    //console.log("path", path)
    return path;
  }
  //console.log("DESC", desc)
  const drowDes = (table) => {
    let arr = [];
    let id = 0;
    for (let i = 0; i < description.length; i++) {
      for (let j = 0; j < table.length; j++) {
        if (description[i].region === table[j].region) {
          let desc = { region: "", latency: 0, time: 0, left: "", top: "" }
          id += 1;
          desc.id = id;
          desc.region = table[j].region;
          desc.latency = table[j].latency;
          desc.time = table[j].download;
          desc.left = description[i].left;
          desc.top = description[i].top;
          arr.push(desc);
        }
      }
    }
    return arr;
  }
  const drowTable = (routes) => {
    let arr = [];
    for (let i = 0; i < routes.length; i++) {
      let table = { region: "", latency: 0, download: 0, name: "", video: "", rating: 0, number: 0 };
      let num = 0;
      for (let k =0; k < users.length; k++) {
        if (users[k].split('_')[0] === routes[i].route.split("-")[1]) num += 1;
      }
      table.number = num;
      table.region = routes[i].route.split('-')[1];
      table.name = routes[i].name;
      table.latency = Math.round(routes[i].latency);
      if (table.latency <= 100) {
        table.rating = 5;
        table.video = "2K/2160p Ultra HD";
        table.download = Math.round(3 * table.latency);
      } else {
        if (table.latency <= 150) {
          table.video = "2K/2160p Ultra HD";
          table.rating = 4;
          table.download = Math.round(3.5 * table.latency);
        } else {
          if (table.latency <= 200) {
            table.video = "1080p Full HD";
            table.rating = 3;
            table.download = Math.round(4 * table.latency);
          } else {
            if (table.latency <= 250) {
              table.video = "720p HD Ready";
              table.rating = 2;
              table.download = Math.round(4.5 * table.latency);
            } else {
              table.video = "480p";
              table.rating = 1;
              table.download = Math.round(5 * table.latency);
            }
          }
        }
      }
      arr.push(table);
    }
    return arr;
  }
  const closeModal = () => {
    setModal(false);
  }
  //console.log("tableBlue", tableBlue);
  //console.log("tableRed", tableRed);
 
  return (
    <div className="container">
      <div className="wrapper">
        <div className="map">
          {mansStyles.map(item =>
            <Region region={item.region} key={item.id} setusers={setusers} setregion={setregion} enableMans={enableMans} setCountRegion={setcountregion} down={down} reset={res} setReset={setres}/>
          )}
          {enableServer && serverStyles.map(item => 
            <Server position={item.position} key={item.position} countServer={countServer} enableCloud={enableCloud} setCountServer={setcountserver} setservers={setservers} />
          )}
          {path.map(item => 
            <img src={require(`./images/path/${item}.png`)} className="path" key={item} />
          )}
          {desc.map(item => 
            <Desc description={item} key={item.id} />
          )}

          {enableMans && countregion >=1 && 
            <button className="button1" onClick={() => {setEnableMans(false); setEnableServer(true)}}></button>
          }
          {enableServer && enableCloud &&
            <button className="button1" onClick={() => startTest()}></button>
          }
          {!modal && tableBlue.length !==0 && tableRed.length !==0 &&
            <button className="button2" onClick={() => reset()}></button>
          }
          {modal &&
            <Modal tableBlue={tableBlue} tableRed={tableRed} closeModal={closeModal}/>
          }
        </div>
      </div>
    </div>
  )
}
export default App;