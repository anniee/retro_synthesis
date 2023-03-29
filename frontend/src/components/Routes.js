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
  // lazy state initialization, only need to read from localStorage once/first time renders
  //useState(() => window.localStorage.getItem('routes') ?? []

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

  // Idea to optimize: could set in localStorage and check to 
  // retrieve first time component renders
  // useState routes
  // getItem, setItem window.localStorage.setItem('routes', routes)
  // is slow to read from localStorage, so what actually
  // want is lazy state initialization (pass fxn not value)
  useEffect(() => {
    fetchRoutes();
  }, []);


  // FILTER WIP
  // const reactionItems = ['Amidation', 'Ester Amidation', 'Amide Schotten-Baumann'];
  // const [filter, setFilter] = useState(routes);

  // const filterReaction = (reaction) => {
  //   const newReaction = routes.filter((newRoutes) => {
  //     return newRoutes.reaction === reaction
  //   })
  //   setFilter(newReaction)
  // }

  // const filterButtons = ({filterReaction}) => {
  //   return (
  //     <>
  //       <div>
  //         {reactionItems.map((reactionItem, reactionIdx) => {
  //           return <button key={reactionIdx} onClick={() => filterReaction(reactionItem)}>{reactionItem}</button>
  //         })}
  //       </div>
  //     </>
  //   )
  // }

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
      {/* <div style={{display: 'flex', flexDirection: 'row'}}>{filterButtons.map((filterBtn) => (
        <div style={{ border: '1px solid green', margin: '0 20px'}}>{filterBtn}</div>
      ))}</div> */}
      <div>
      {routes.map((route, routeNumber) => (        
        <Route route={route} routeNumber={routeNumber} key={routeNumber} />
      ))}
      </div>
    </div>
  );
};