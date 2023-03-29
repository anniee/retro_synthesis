import React, {useState} from "react";
import {createUseStyles} from 'react-jss';
import Tree from 'react-d3-tree';

//  N.B. each reactant can also have reactants that compose it

const useRouteStyles = createUseStyles({
  treeWrapper: {
    width: '50em',
    height: '40em' 
  },
  routeNumber: {
    fontFamily: 'Arial',
    fontSize: '28px',
    width: '650px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60px',
    border: '1px solid lightgrey',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#ffffff',
      cursor: 'pointer'
    }
  },
  svgClass: {
    '& > g': {
      transform: 'translate(50px, 180px) scale(0.6)'
    },
  },
  rootNode: {
    '& svg': {
      fill: '#D6FFB7',
    }
  },
  reactantName: {
    fontFamily: 'Arial', 
    fontSize: '22px', 
    backgroundColor: '#ffffff'  
  },
  reactionBtn:{
    backgroundColor: '#ffffff',
    height: '60px',
    fontSize: '24px',
    fontFamily: 'monospace',
    padding: '0 20px 0 20px',
    marginTop: '40px',
    borderRadius: '7px',
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

export const Route = (props) => {
  const styles = useRouteStyles();
  const { route, routeNumber } = props;
  const nodeSize = { x: 600, y: 400 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 0, y: -100 };
  const [showRoute, setShowRoute] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowRoute(!showRoute)
  }

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }) => {
    const reactantCatalogInfo = () => {
      if (nodeDatum.catalogInfo) {
        return (
        <>
        <h3>Catalog: Vendor ID</h3>
        <ul>
          {nodeDatum.catalogInfo.map((info) => (
            <li key={info.vendor_id}>{info.catalog_name}: {info.vendor_id}</li>
          )
          )}
        </ul>
        </>
        )
      }
    } 

    return (
    <g>
      <foreignObject {...foreignObjectProps} width="600px" height="600px">
        <div>
          {/* MAYBE NEED AN EVENT HANDLER HERE LIKE ON MOUSE CHANGE, THEN USE EVENT THERE */}
        {nodeDatum.children ? <div dangerouslySetInnerHTML={{__html: nodeDatum.attributes}} /> : 
        <div dangerouslySetInnerHTML={{__html: nodeDatum.attributes}} onMouseEnter={() => {
          setShowInfo(true);
        }}
        onMouseLeave={() => {
          setShowInfo(false);
        }}/>}
        {!nodeDatum.children && showInfo ? (<div>{reactantCatalogInfo()}</div>) : <h3 className={styles.reactantName}>{nodeDatum.name}</h3>}
          {nodeDatum.children && (
            <>
            <button onClick={toggleNode} className={styles.reactionBtn}>
              {nodeDatum.__rd3t.collapsed ? `Show Reactants` : nodeDatum.reaction}
            </button>
            </>
          )}
        </div>  
      </foreignObject>
    </g>
    )
  };

  return (
    <div>
      <h1 onClick={handleClick} className={styles.routeNumber}>Route {routeNumber + 1}</h1>
      {(showRoute) && (
      <div id="treeWrapper" className={styles.treeWrapper} >
        <Tree
        data={route}
        nodeSize={nodeSize}
        svgClassName={styles.svgClass}
        pathFunc='step'
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        rootNodeClassName={styles.rootNode}
        />
        </div>
      )
      }
    </div>
  );
};