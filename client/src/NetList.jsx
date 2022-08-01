import React, { useEffect } from "react";
import { useBlockChainContext } from "./BlockChainContext2";
function NetList({ setNetList, selected }) {
  const { nets, net, setNet } = useBlockChainContext();
  const changeNetwork = (index) => {
    console.log(selected === 1);
    if (selected === 1) {
      if (net.from.name == index.name) return;
      if (net.to.name == index.name)
        return setNet({ to: { ...net.from }, from: { ...net.to } });

      return setNet({ ...net, from: index });
    }
    if (net.to.name == index.name) return;
    if (net.from.name == index.name)
      return setNet({ to: net.from, from: net.to });
    return setNet({ ...net, to: index });
  };

  return (
    <div className="list-overflow" onClick={() => setNetList(0)}>
      <div className="list-box" onClick={(e) => e.stopPropagation()}>
        <h1>
          Select a Blockchain <br /> Network
        </h1>
        <div className="net-list-box">
          {nets.map((index) => {
            return (
              <div
                className="net-list-item"
                onClick={() =>
                  index.token && setNetList(changeNetwork(index) == 0)
                }
              >
                <img className="token-logo" src={index.logo} alt="" />
                <p>{index.name}</p>
                {index.token ? (
                  <></>
                ) : (
                  <div className="blocked-net-list-item"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NetList;
