import React, {useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';
import svgtojsx from 'svg-to-jsx';
import {Route} from './Route';

const useRoutesStyles = createUseStyles({
  foundation: {
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  svgClass: {
    '& > g': {
      transform: 'translate(50px, 160px) scale(0.6)'
    },
  },
  rootNode: {
    '& svg': {
      fill: 'lightgreen'
    }
  }
});

export const Routes = () => {
  const styles = useRoutesStyles();
  const [routes, setRoutes] = useState([]);

  const fetchRoutes = async () => {
    const response = await fetch("http://localhost:8000/routes");
    const newRoutes = await response.json();
    for (let newRoute in newRoutes.data) {
      let newRouteData = newRoutes.data[newRoute];
      newRouteData.attributes = await fetchMoleculeSVG(newRouteData.name)
      let reactantInfo = newRouteData.reactantInfo;

      for (let i = 0; i < newRouteData.children.length; i++) {
        let newChildData = newRouteData.children[i];
        newChildData.attributes = await fetchMoleculeSVG(newChildData.name)
        newChildData.catalogInfo = await getCatalogInfo(newChildData.name, reactantInfo);
      }
    }
    setRoutes(newRoutes.data);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchMoleculeSVG = async (smileStr) => {
    const response = await fetch(`http://localhost:8000/molecule/${smileStr}`);
    const moleculeSVG = await response.json();
    const moleculeSvgData = moleculeSVG.data;
    let moleculeJsx = await svgtojsx(moleculeSvgData);
    let moleculeJsxAsComponent = (
      moleculeJsx
    )
    return moleculeJsxAsComponent;
  }

  const getCatalogInfo = async (smileStr, reactantInfo) => {
    const molCatalogInfo = reactantInfo.filter( function(molInfo) {
      return molInfo.smiles === smileStr
  })
    return molCatalogInfo[0].catalog_entries
  }

  return (
    <div className={styles.foundation}>
      <div>
      {routes.map((route, routeNumber) => (        
        <Route route={route} routeNumber={routeNumber} key={routeNumber} />
      ))}
      </div>
    </div>
  );
};