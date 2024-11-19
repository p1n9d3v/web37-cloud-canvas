import {
    GRID_2D_SIZE,
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
} from '@constants';
import { Dimension, Node, Point } from '@types';

export const getDistance = (point1: Point, point2: Point) => {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
};

export const getSvgPoint = (svg: SVGSVGElement, point: Point) => {
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = point.x;
    svgPoint.y = point.y;
    const screenCTM = svg.getScreenCTM();
    return svgPoint.matrixTransform(screenCTM!.inverse());
};

/* https://clintbellanger.net/articles/isometric_math/ */
// export const gridToScreen = (gridPoint: GridPoint): Point => {
//     const { col, row } = gridPoint;
//
//     const x = (col - row) * (GRID_3D_WIDTH_SIZE / 2);
//     const y = (col + row) * (GRID_3D_HEIGHT_SIZE / 2);
//
//     return { x, y };
// };
//
// export const screenToGrid = (point: Point) => {
//     const { x, y } = point;
//
//     const col =
//         (x / (GRID_3D_WIDTH_SIZE / 2) + y / (GRID_3D_HEIGHT_SIZE / 2)) / 2;
//     const row =
//         (y / (GRID_3D_HEIGHT_SIZE / 2) - x / (GRID_3D_WIDTH_SIZE / 2)) / 2;
//
//     return { col, row };
// };
//
// export const getGridAlignedPoint = (
//     point: Point,
//     dimension: Dimension,
// ): Point => {
//     if (dimension === '2d') {
//         const snappedSize = GRID_2D_SIZE / 4;
//         const gridAlignedX = Math.round(point.x / snappedSize) * snappedSize;
//         const gridAlignedY = Math.round(point.y / snappedSize) * snappedSize;
//
//         return {
//             x: gridAlignedX,
//             y: gridAlignedY,
//         };
//     } else if (dimension === '3d') {
//         const snappedSize = 1 / 4;
//         const { col, row } = screenToGrid(point);
//
//         const snappedCol = Math.round(col / snappedSize) * snappedSize;
//         const snappedRow = Math.round(row / snappedSize) * snappedSize;
//
//         return gridToScreen({
//             col: snappedCol,
//             row: snappedRow,
//         });
//     } else {
//         throw new Error('only support 2d and 3d dimension');
//     }
// };
//
// export const getNodeSizeForDimension = (dimension: Dimension) => {
//     const width = dimension === '2d' ? GRID_2D_SIZE : GRID_3D_WIDTH_SIZE;
//     const height = dimension === '2d' ? GRID_2D_SIZE : GRID_3D_HEIGHT_SIZE;
//
//     return { width, height };
// };
//
// export const calculateAnchorPoints = (
//     node: Node,
//     dimension: Dimension,
// ): Anchors => {
//     const point = node.point;
//     const { width, height } = dimension === '2d' ? node.size.d2 : node.size.d3;
//
//     return {
//         top: { x: point.x + width / 2, y: point.y },
//         right:
//             dimension === '2d'
//                 ? { x: point.x + width, y: point.y + height / 2 }
//                 : {
//                       x: point.x + width,
//                       y: point.y + (height - GRID_3D_DEPTH_SIZE) / 2,
//                   },
//         left:
//             dimension === '2d'
//                 ? { x: point.x, y: point.y + height / 2 }
//                 : {
//                       x: point.x,
//                       y: point.y + (height - GRID_3D_DEPTH_SIZE) / 2,
//                   },
//         bottom: { x: point.x + width / 2, y: point.y + height },
//     };
// };
//
// export const findNearestAnchorPair = (
//     sourceAnchors: Anchors,
//     targetAnchros: Anchors,
// ): {
//     sourceAnchorType: AnchorType;
//     targetAnchorType: AnchorType;
// } => {
//     let nearestAnchorPair: {
//         sourceAnchorType: AnchorType | null;
//         targetAnchorType: AnchorType | null;
//         distance: number;
//     } = {
//         sourceAnchorType: null,
//         targetAnchorType: null,
//         distance: Infinity,
//     };
//
//     Object.entries(sourceAnchors).forEach(
//         ([sourceAnchorType, sourceAnchorPoint]) => {
//             Object.entries(targetAnchros).forEach(
//                 ([targetAnchorType, targetAnchorPoint]) => {
//                     if (sourceAnchorType === targetAnchorType) return;
//
//                     const distance = getDistance(
//                         sourceAnchorPoint,
//                         targetAnchorPoint,
//                     );
//
//                     if (distance < nearestAnchorPair.distance) {
//                         nearestAnchorPair = {
//                             sourceAnchorType: sourceAnchorType as AnchorType,
//                             targetAnchorType: targetAnchorType as AnchorType,
//                             distance,
//                         };
//                     }
//                 },
//             );
//         },
//     );
//
//     return {
//         sourceAnchorType: nearestAnchorPair.sourceAnchorType!,
//         targetAnchorType: nearestAnchorPair.targetAnchorType!,
//     };
// };
//
// export const isUtilityNode = (node: Node) => {
//     return ['pointer'].includes(node.type);
// };
//
// export const isCloudNode = (node: Node) => {
//     return ['server', 'cloud-function', 'object-storage', 'db-mysql'].includes(
//         node.type,
//     );
// };
//
// export const isCommonNode = (node: Node) => {
//     return ['text', 'image'].includes(node.type);
// };
