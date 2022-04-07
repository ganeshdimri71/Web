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
    angle: 16.5873,
    temporaryXCordinateOfMovableNodes: '',
    temporaryYCordinateOfMovableNodes: '',
    conditionVariable: true,
    difference: '',
    differenceOne: ''
}

const movableNodesSlice = createSlice({
    name: 'movableNodes',
    initialState,
    reducers: {
        setXYCordinatesOfNodeA: (state, action) => {
            state.linePoints.x1 = action.payload.xPos
            state.linePoints.y1 = action.payload.yPos
            // console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
        },
        setXYCordinatesOfNodeB: (state, action) => {
            state.linePoints.x = action.payload.xPos
            state.linePoints.y = action.payload.yPos
        },
        setXYCordinatesOfNodeC: (state, action) => {
            state.linePoints.x2 = action.payload.xPos
            state.linePoints.y2 = action.payload.yPos
        },
        setXYCordinatesOfNodeBAgain: (state, action) => {
            // console.log( 'action.payload.inXCoOfMvNode  action.payload.inYCoOfMvNode', action.payload.inXCoOfMvNode, action.payload.inYCoOfMvNode )
            // if (state.conditionVariable == true) {
            //     console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
            //     state.temporaryXCordinateOfMovableNodes = state.linePoints.x
            //     state.temporaryYCordinateOfMovableNodes = state.linePoints.y
            //     state.difference = (state.temporaryXCordinateOfMovableNodes - action.payload.xPointsOfMovableNodes)
            //     state.differenceOne = (state.temporaryYCordinateOfMovableNodes - action.payload.yPointsOfMovableNodes)
            //     state.conditionVariable = action.payload.conditionVariable
            //     console.log(' difference, differenceOne', state.difference, state.differenceOne)
            //     console.log('I am running...!')
            // }
            // console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
            // state.linePoints.x = action.payload.xPointsOfMovableNodes
            // state.linePoints.y = action.payload.yPointsOfMovableNodes
            // const difference = Math.abs(state.temporaryXCordinateOfMovableNodes - action.payload.xPointsOfMovableNodes)
            // const differenceOne = Math.abs(state.temporaryYCordinateOfMovableNodes - action.payload.yPointsOfMovableNodes)
            // console.log(' difference, differenceOne', difference, differenceOne)
            // console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
            state.linePoints.x = action.payload.xPointsOfMovableNodes + state?.difference
            state.linePoints.y = action.payload.yPointsOfMovableNodes + state?.differenceOne
        },
        // setXYCordinatesOfNodeBAgainAfterJerk: (state, action) => {
        //     if (action.payload.xDifference != undefined && action.payload.xDifference != undefined) {
        //         state.linePoints.x = state.linePoints.x + action.payload.xDifference
        //         state.linePoints.y = state.linePoints.y + action.payload.yDifference
        //     }

        // },
        setRatios: (state, action) => {
            state.ratios.m1 = action.payload.m1;
            state.ratios.m2 = action.payload.m2;
            state.ratio = action.payload.ratio;
            state.angle = action.payload.angle;
        },
        setConditioningVariable: (state, action) => {
            state.conditionVariable = action.payload.conditionVariable
        }
    }
});

export const { setXYCordinatesOfNodeA, setXYCordinatesOfNodeB, setXYCordinatesOfNodeC, setRatios, setRatio, setXYCordinatesOfNodeBBasedOnOffset, setYcordinateOfMovableNode, setRatioInReduxAction, setConditioningVariable, setXYCordinatesOfNodeBAgain, setXYCordinatesOfNodeBAgainAfterJerk } = movableNodesSlice.actions
export const getLinePoints = state => state.movableNodesSlice.linePoints
export const getMovableNodeRatio = state => state.movableNodesSlice.ratios
export const getMovableNodeRatioForButtonC = state => state.movableNodesSlice.ratio
export const getAngle = state => state.movableNodesSlice.angle
// export const getRatios = state => state.movableNodesSlice.ratios
export default movableNodesSlice.reducer