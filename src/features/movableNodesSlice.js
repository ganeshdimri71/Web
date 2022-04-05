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
    movableLineYCordinate: 300,
    ratios: {
        m1: 300,
        m2: 400
    },
    // angle:

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
            // state.movableLineYCordinate = action.payload.yPos
        },
        setXYCordinatesOfNodeC: (state, action) => {
            state.linePoints.x2 = action.payload.xPos
            state.linePoints.y2 = action.payload.yPos
        },
        setXYCordinatesOfNodeBBasedOnOffset: (state, action) => {
            state.linePoints.x = (state.linePoints.x2 * state.ratios.m1 + state.linePoints.x1 * state.ratios.m2) / (state.ratios.m1 + state.ratios.m2)
            state.linePoints.y = (state.linePoints.y2 * state.ratios.m1 + state.linePoints.y1 * state.ratios.m2) / (state.ratios.m1 + state.ratios.m2)
            // state.linePoints.x = ( action.payload.xPointsOfMovableNodes)
            // state.linePoints.y = ( action.payload.yPointsOfMovableNodes)
        },
        setXYCordinatesOfNodeBAgain: (state, action) => {
            state.linePoints.x = action.payload.xPointsOfMovableNodes
            state.linePoints.y = action.payload.yPointsOfMovableNodes
        },
        setYcordinateOfMovableNode: (state, action) => {
            state.linePoints.y = action.payload?.YcordinateOfMovableNodes
        },
        setRatio: (state, action) => {
            state.ratio = action.payload.ratioBetweenTwoLines
        },
        setRatios: (state, action) => {
            // state.ratio = action.payload.ratioCalculatedByPythagorousTheorem
            state.ratios.m1 = action.payload.c;
            state.ratios.m2 = action.payload.f;
        },
    }
});

export const { setXYCordinatesOfNodeA, setXYCordinatesOfNodeB, setXYCordinatesOfNodeC, setRatios, setRatio, setXYCordinatesOfNodeBBasedOnOffset, setYcordinateOfMovableNode, setRatioInReduxAction, setXYCordinatesOfNodeBAgain } = movableNodesSlice.actions
export const getLinePoints = state => state.movableNodesSlice.linePoints
export const getMovableNodeRatio = state => state.movableNodesSlice.ratio
export const getMovableNodeYRatio = state => state.movableNodesSlice.yRatio
export const getMovableLineYCordinate = state => state.movableNodesSlice.movableLineYCordinate
export const getRatios = state => state.movableNodesSlice.ratios
export default movableNodesSlice.reducer