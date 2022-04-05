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
    }

}

const movableNodesSlice = createSlice( {
    name: 'movableNodes',
    initialState,
    reducers: {
        setXYCordinatesOfNodeA: ( state, action ) => {
            state.linePoints.x1 = action.payload.xPos
            state.linePoints.y1 = action.payload.yPos
        },
        setXYCordinatesOfNodeB: ( state, action ) => {
            state.linePoints.x = action.payload.xPos
            state.linePoints.y = action.payload.yPos
            // state.movableLineYCordinate = action.payload.yPos
        },
        setXYCordinatesOfNodeC: ( state, action ) => {
            state.linePoints.x2 = action.payload.xPos
            state.linePoints.y2 = action.payload.yPos
        },
        setXYCordinatesOfNodeCBasedOnOffset: ( state, action ) => {
            // function section ( x1, x2, y1, y2, m, n ) {
            // Applying section formula
            // let statex = ( ( n * x1 ) + ( m * x2 ) ) /( m + n );
            // let y = ( ( n * y1 ) + ( m * y2 ) ) /( m + n );


            // Printing result
            // document.write( "(" + x + ", " + y + ")" );
            // }


            // state.linePoints.x = ( state.ratio * state.linePoints.x2 + state.linePoints.x1 ) / ( 1 + state.ratio )
            // state.movableLineYCordinate = state.linePoints.y + action.payload?.offset_y / 2
            // state.ratios.m1 = state.ratio * state.ratios.m2

            state.linePoints.x = ( state.linePoints.x2 * state.ratios.m1 + state.linePoints.x1 * state.ratios.m2 ) / ( state.ratios.m1 + state.ratios.m2 )
            state.linePoints.y = ( state.linePoints.y2 * state.ratios.m1 + state.linePoints.y1 * state.ratios.m2 ) / ( state.ratios.m1 + state.ratios.m2 )
            // state.linePoints.x = action.payload.pointsRotation[ 0 ]
            // state.linePoints.y = action.payload.pointsRotation[ 1 ]
            // state.linePoints.x = ( state.linePoints.x / 300 )
            // state.linePoints.y = ( state.linePoints.y / 400 )
            // state.linePoints.y = state.linePoints.y * state.ratio

        },
        setYcordinateOfMovableNode: ( state, action ) => {
            state.linePoints.y = action.payload?.YcordinateOfMovableNodes
        },
        setRatio: ( state, action ) => {
            state.ratio = action.payload.ratioBetweenTwoLines
        },
        setRatios: ( state, action ) => {
            // state.ratio = action.payload.ratioCalculatedByPythagorousTheorem
            state.ratios.m1 = action.payload.c;
            state.ratios.m2 = action.payload.f;
        },
    }
} );

export const { setXYCordinatesOfNodeA, setXYCordinatesOfNodeB, setXYCordinatesOfNodeC, setRatios, setRatio, setXYCordinatesOfNodeCBasedOnOffset, setYcordinateOfMovableNode, setRatioInReduxAction } = movableNodesSlice.actions
export const getLinePoints = state => state.movableNodesSlice.linePoints
export const getMovableNodeRatio = state => state.movableNodesSlice.ratio
export const getMovableNodeYRatio = state => state.movableNodesSlice.yRatio
export const getMovableLineYCordinate = state => state.movableNodesSlice.movableLineYCordinate
export const getRatios = state => state.movableNodesSlice.ratios
export default movableNodesSlice.reducer
