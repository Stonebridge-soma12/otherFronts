import { Elements, Node, isNode, OnLoadParams } from 'react-flow-nns';
import React from 'react';
import { BlockState, BlockType } from '../../../core/reactFlow/block';
import { getNodeId, getNodeLabel } from '../../../util';
import { MAXIMUM_NUMBER_PER_BLOCK_TYPE_AT_GRAPH } from '../../Project/settings/BlockLimit';

export type CustomNodeParams = {
	position?: any;
	data: BlockState;
};

export const createCustomNode = ({ position, data }: CustomNodeParams) => {
	return {
		id: getNodeId(),
		type: data.category || 'default',
		position: position || {
			x: 100,
			y: 100,
		},
		data: {
			...data,
			label: getNodeLabel(data.type),
		},
	};
};

export const REACT_APPLICATION_DRAG_EVENT_DATA = 'application/nodedata';

export const getNodeData = (dataTransfer: DataTransfer): BlockState => {
	const data = dataTransfer.getData(REACT_APPLICATION_DRAG_EVENT_DATA);
	return JSON.parse(data);
};

export const canGetNodeData = (dataTransfer: DataTransfer) => {
	return dataTransfer.types.includes(REACT_APPLICATION_DRAG_EVENT_DATA);
};

export const getPosition = (
	e: React.DragEvent | React.MouseEvent<HTMLDivElement>,
	reactFlowWrapper: HTMLDivElement | null,
	reactFlowInstance: OnLoadParams | null
) => {
	const reactFlowBounds = reactFlowWrapper?.getBoundingClientRect();
	const position = reactFlowInstance?.project({
		x: e.clientX - (reactFlowBounds?.left || 0),
		y: e.clientY - (reactFlowBounds?.top || 0),
	});

	return position;
};

export const canInsertNode = (elements: Elements, node: Node<BlockState>) => {
	const type = node.data?.type;
	const limit = MAXIMUM_NUMBER_PER_BLOCK_TYPE_AT_GRAPH[type as BlockType];
	const currentCount = elements.filter((e) => {
		if (!isNode(e)) {
			return false;
		}
		const blockStateNode: Node<BlockState> = e;
		return blockStateNode.data?.type === node.data?.type;
	}).length;

	if (currentCount >= limit) {
		throw new Error(`${type}은 최대 ${limit}개 까지만 추가할 수 있습니다.`);
	}
	return currentCount < limit;
};
