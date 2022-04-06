import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    linePoints: {
        x1: 300,
        y1: 250,
        x: 600,
        y: 300,
        x2: 1000,
        y2: 250,
    },
    ratio: 0.75,
    ratios: {
        m1: 3,
        m2: 4
    },
    angle: 16.5873
}

const movableNodesSlice = createSlice({
    name: 'movableNodes',
    initialState,
    reducers: {
        setXYCordinatesOfNodeA: (state, action) => {
            state.linePoints.x1 = action.payload.xPos
            state.linePoints.y1 = action.payload.yPos
        },
        setXYCordinatesOfNodeB: (state, action) => {
            state.linePoints.x = action.payload.xPos
            state.linePoints.y = action.payload.yPos
        },
        setXYCordinatesOfNodeC: (state, action) => {
            state.linePoints.x2 = action.payload.xPos
            state.linePoints.y2 = action.payload.yPos 
        },
        setXYCordinatesOfNodeBAgain: ( state, action ) => {
            // console.log( 'action.payload.inXCoOfMvNode  action.payload.inYCoOfMvNode', action.payload.inXCoOfMvNode, action.payload.inYCoOfMvNode )
            state.linePoints.x = action.payload.xPointsOfMovableNodes 
            state.linePoints.y = action.payload.yPointsOfMovableNodes 
        },
        setRatios: ( state, action ) => {
            state.ratios.m1 = action.payload.m1;
            state.ratios.m2 = action.payload.m2;
            state.ratio = action.payload.ratio;
            state.angle = action.payload.angle;
        },
    }
});

export const { setXYCordinatesOfNodeA, setXYCordinatesOfNodeB, setXYCordinatesOfNodeC, setRatios, setRatio, setXYCordinatesOfNodeBBasedOnOffset, setYcordinateOfMovableNode, setRatioInReduxAction, setXYCordinatesOfNodeBAgain } = movableNodesSlice.actions
export const getLinePoints = state => state.movableNodesSlice.linePoints
export const getMovableNodeRatio = state => state.movableNodesSlice.ratios
export const getMovableNodeRatioForButtonC = state => state.movableNodesSlice.ratio
export const getAngle = state => state.movableNodesSlice.angle
// export const getRatios = state => state.movableNodesSlice.ratios
export default movableNodesSlice.reducer