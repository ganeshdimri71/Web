import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
  ReactReduxContext,
  Provider,
} from "react-redux";
import { Stage, Layer, Group, Line, Circle } from "react-konva";
import {
  setXYCordinatesOfNodeA,
  setXYCordinatesOfNodeB,
  setXYCordinatesOfNodeC,
  getLinePoints, setXYCordinatesOfNodeBBasedOnOffset, getMovableLineYCordinate, setYcordinateOfMovableNode, setRatio, setXYCordinatesOfNodeBAgain
} from "../src/features/movableNodesSlice";
import ButtonComponent from './components/ButtonComponent'
import useGeometrics from "./customHooks/useGeometrics";
// import { transformVectorMaintainingProportions } from './customHooks/useMovableNodesPoints'

const App = () => {
  const geometric = require("geometric");
  const { distanceBetween2Points, getLineAngle, getTranslatePoint } = useGeometrics();
  const linePoints = useSelector(getLinePoints);
  const getMovableLineYCordinateFromRedux = useSelector(getMovableLineYCordinate);
  const dispatch = useDispatch()
  const [dragStartPos, setDragStartPos] = useState([0, 0])
  const [cordinatesOfGreenPoints, setCordinatesOfGreenPoints] = useState([])
  const a = distanceBetween2Points([linePoints.x1, linePoints.y1], [linePoints.x1, linePoints.y]) / 15
  const b = distanceBetween2Points([linePoints.x1, linePoints.y], [linePoints.x, linePoints.y]) / 15
  const c = Math.sqrt(a * a + b * b)
  const d = distanceBetween2Points([linePoints.x2, linePoints.y2], [linePoints.x2, linePoints.y]) / 15
  const e = distanceBetween2Points([linePoints.x, linePoints.y], [linePoints.x2, linePoints.y]) / 15
  const f = Math.sqrt(d * d + e * e)
  const [ratioBetweenTwoLines, setRatioBetweenTwoLines] = useState((c / f));
  const [angleByFunc, setAngleByFunc] = useState()

  // const transformVectorMaintainingProportions = (movedVector, toTransformVector, endVector, offset) => {
  //   const diffVector = [movedVector[0] - endVector[0], movedVector[1] - endVector[1]];
  //   let diffMovableVector = [toTransformVector[0] - endVector[0], toTransformVector[1] - endVector[1]];

  //   const newDiffVector = [diffVector[0] + offset[0], diffVector[1] + offset[1]];
  //   const angle = getLineAngle([newDiffVector, [0, 0]]) - getLineAngle([diffVector, [0, 0]]);

  //   const diffVectorRotated = geometric.pointRotate(diffVector, angle);
  //   const scale = geometric.lineLength([newDiffVector, [0, 0]]) / geometric.lineLength([diffVectorRotated, [0, 0]]);

  //   diffMovableVector = geometric.pointRotate(diffMovableVector, angle);
  //   diffMovableVector = [diffMovableVector[0] scale, diffMovableVector[1] scale];
  //   return [diffMovableVector[0] + endVector[0], diffMovableVector[1] + endVector[1]];
  // }



  const dragStartRed = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setCordinatesOfGreenPoints([linePoints.x, linePoints.y])
    setDragStartPos([x, y]);
    dispatch(
      setXYCordinatesOfNodeA({
        xPos: x,
        yPos: y,
      })
    );
    // dispatch(
    //   setXYCordinatesOfNodeBBasedOnOffset()
    // );
  };


  const PI = 3.14159265;

  // Function to find the
  // angle between two lines
  function findAngle(M1, M2) {
    // Store the tan value of the angle
    var angle = Math.abs((M2 - M1) / (1 + M1 * M2));

    // Calculate tan inverse of the angle
    var ret = Math.atan(angle);

    // Convert the angle from
    // radian to degree
    var val = (ret * 180) / PI;

    // Print the result
    // document.write( val.toFixed( 4 ) );
    return val
  }

  // Driver Code
  var M1 = 300,
    M2 = 400;
  const angle = findAngle(M1, M2);
  // console.log("angle", angle)

  function calcangle(x00, y00, x01, y01, x10, y10, x11, y11) {
    var dx0 = x01 - x00;
    var dy0 = y01 - y00;
    var dx1 = x11 - x10;
    var dy1 = y11 - y10;
    var angle = Math.atan2(dx0 * dy1 - dx1 * dy0, dx0 * dx1 + dy0 * dy1);
    // writeln(angle);
    // writeln(angle * 180 / 3.1415926);
    var angleInDegree = Math.abs(angle * 180 / 3.1415926);
    console.log('angleInDegree', angleInDegree)
    setAngleByFunc(angleInDegree)
    // return angleInDegree
  }
  // let angleInDegree = calcangle(linePoints.x1, linePoints.y1, linePoints.x, linePoints.y, linePoints.x, linePoints.y, linePoints.x2, linePoints.y2);
  // console.log('angleInDegree', angleInDegree)


  const dragMoveRed = (e) => {

    // console.log('offset_y', offset_y)
    const { x, y } = e.target.getStage().getPointerPosition();
    const offset_y = (y - dragStartPos[1])
    const offset_x = (x - dragStartPos[0])
    // const pointsOfMovableNodesFromExternalFile = transformVectorMaintainingProportions([linePoints.x1, linePoints.y1], [linePoints.x, linePoints.y], [linePoints.x2, linePoints.y2], [offset_x, offset_y])
    // console.log('pointsOfMovableNodesFromExternalFile', pointsOfMovableNodesFromExternalFile)

    dispatch(
      setXYCordinatesOfNodeA({
        xPos: x,
        yPos: y,
      })
    );
    // dispatch(
    //   setXYCordinatesOfNodeBBasedOnOffset(
    //     {
    //       xPointsOfMovableNodes: pointsOfMovableNodesFromExternalFile[0],
    //       yPointsOfMovableNodes: pointsOfMovableNodesFromExternalFile[1]
    //     }
    //   )
    // );
    dispatch(
      setXYCordinatesOfNodeBBasedOnOffset()
    );
    // console.log('linePoints.x,linePoints.y', linePoints.x, linePoints.y)
    const angle = findAngle(M1, M2)
    // console.log('angle', angle)
    console.log('angleByFunc', angleByFunc)
    const pointsRotation = geometric.pointRotate([linePoints.x, linePoints.y], angleByFunc, [linePoints.x, linePoints.y])
    console.log('pointsRotation', pointsRotation)
    dispatch(
      setXYCordinatesOfNodeBAgain({
        xPointsOfMovableNodes: pointsRotation[0],
        yPointsOfMovableNodes: pointsRotation[1]
      })
    );
    // dispatch(
    //   setXYCordinatesOfNodeBAgain({

    //   })
    // );

  };

  const dragEndRed = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();

    const YcordinateOfMovableNodes = getMovableLineYCordinateFromRedux
    dispatch(
      setXYCordinatesOfNodeA({
        xPos: x,
        yPos: y,
      })
    );
    // dispatch(
    //   setXYCordinatesOfNodeA({
    //     // xPos: x,
    //     // yPos: y,
    //     xPointsOfMovableNodes: linePoints.x,
    //     yPointsOfMovableNodes: linePoints.y
    //   })
    // );
    // dispatch(
    //   setYcordinateOfMovableNode( {
    //     YcordinateOfMovableNodes: YcordinateOfMovableNodes
    //   } )
    // );
  }
  // const dragStartGreen = () => {

  // }
  const dragStartMoveEndGreen = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    dispatch(
      setXYCordinatesOfNodeB({
        xPos: x,
        yPos: y,
      })
    );
    setRatioBetweenTwoLines(c / f)
    dispatch(setRatio(
      { ratioBetweenTwoLines: ratioBetweenTwoLines }
    ))
  };
  const dragStartBlack = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setDragStartPos([x, y]);
    dispatch(
      setXYCordinatesOfNodeC({
        xPos: x,
        yPos: y,
      })
    );
  };
  const dragMoveBlack = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const offset_y = (y - dragStartPos[1])
    dispatch(
      setXYCordinatesOfNodeC({
        xPos: x,
        yPos: y,
      })
    );
    dispatch(
      setXYCordinatesOfNodeBBasedOnOffset()
    );
  };
  const dragEndBlack = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const YcordinateOfMovableNodes = getMovableLineYCordinateFromRedux
    dispatch(
      setXYCordinatesOfNodeC({
        xPos: x,
        yPos: y,
      })
    );
    dispatch(
      setYcordinateOfMovableNode({
        YcordinateOfMovableNodes: YcordinateOfMovableNodes
      })
    );
  }


  return (
    <>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            style={{ backgroundColor: "#f7e5e5" }}
            height={window.innerHeight}
            width={window.innerWidth}
          >
            <Provider store={store}>
              <Layer>
                <Group>
                  <Line
                    points={[
                      linePoints.x1,
                      linePoints.y1,
                      linePoints.x,
                      linePoints.y
                    ]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Line
                    points={[
                      linePoints.x,
                      linePoints.y,
                      linePoints.x2,
                      linePoints.y2,
                    ]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Circle
                    x={linePoints.x1}
                    y={linePoints.y1}
                    radius={10}
                    fill="red"
                    draggable
                    onDragStart={(e) => {
                      dragStartRed(e)
                    }}
                    onDragMove={(e) => {
                      dragMoveRed(e)
                    }}
                    onDragEnd={(e) => dragEndRed(e)}
                  />
                  <Circle
                    x={linePoints.x}
                    y={linePoints.y}
                    radius={10}
                    fill="green"
                    draggable
                    onDragStart={(e) => dragStartMoveEndGreen(e)}
                    onDragMove={(e) => dragStartMoveEndGreen(e)}
                    onDragEnd={(e) => dragStartMoveEndGreen(e)}
                  />
                  <Circle
                    x={linePoints.x2}
                    y={linePoints.y2}
                    radius={10}
                    fill="black"
                    draggable
                    onDragStart={(e) => {
                      dragStartBlack(e)

                    }}
                    onDragMove={(e) => {
                      dragMoveBlack(e)
                    }}
                    onDragEnd={(e) => dragEndBlack(e)}
                  />
                </Group>
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      <ButtonComponent />
      <button
        style={{
          position: 'absolute',
          top: '40px'
        }}
        onClick={() => { calcangle(linePoints.x1, linePoints.y1, linePoints.x, linePoints.y, linePoints.x, linePoints.y, linePoints.x2, linePoints.y2) }}
      >Click Me For Angle</button>
    </>
  );
};

export default App;