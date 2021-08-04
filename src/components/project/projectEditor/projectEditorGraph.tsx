import { makeStyles } from '@material-ui/core';
import React, { EventHandler, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
	addEdge,
	ArrowHeadType,
	Background,
	Connection,
	Controls,
	Edge,
	Elements,
	FlowExportObject,
	MiniMap,
	Node,
	OnLoadParams,
	removeElements,
	useStoreActions,
	useStoreState,
} from 'react-flow-renderer';
import { useSelector } from 'react-redux';
import { nodeTypes } from '../../../core/reactFlow/node/nodetypes';
import { RootState } from '../../../module';
import { createCustomNode } from '../../../core/reactFlow/node';
import createCustomEdge from '../../../core/reactFlow/edge';
import { canGetNodeData, canInsertNode, getNodeData, getPosition } from '.';

const useStyle = makeStyles({
	wrapper: {
		width: '100%',
		height: '100%',
	},
	reactFlow: {
		'&:focus': {
			border: 'initial',
		},
	},
	runButton: {
		position: 'absolute',
		zIndex: 1000,
		top: 10,
		left: 110,
		backgroundColor: '#F7F7F7',
	},
	saveButton: {
		position: 'absolute',
		zIndex: 1000,
		top: 10,
		left: 40,
		backgroundColor: '#F7F7F7',
	},
});

type Props = {
	setReactInstance: EventHandler<any>;
	setElements: EventHandler<any>;
	flowState: FlowExportObject;
};

const ProjectEditorGraph = ({ setElements, flowState, setReactInstance }: Props) => {
	const classes = useStyle();
	const elements = useSelector((state: RootState) => state.elements.elements);
	const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
	const selectedElements = useStoreState((state) => state.selectedElements);
	const setSelectedElements = useStoreActions((state) => state.setSelectedElements);
	const reactFlowInstance = useSelector((state: RootState) => state.reactFlowInstance.instance);

	useEffect(() => {
		setElements(flowState?.elements || []);
	}, [flowState?.elements, setElements]);

	const onConnect = useCallback(
		(params: Edge | Connection) => {
			setElements(addEdge(createCustomEdge(params), elements));
		},
		[elements, setElements]
	);

	const onElementsRemove = useCallback(
		(elementsToRemove: Elements<any>) => {
			setElements(removeElements(elementsToRemove, elements));
		},
		[elements, setElements]
	);

	const onDragOver = useCallback((e: React.DragEvent) => {
		const localEvent = e;
		localEvent.preventDefault();
		localEvent.dataTransfer.dropEffect = 'copy';
	}, []);

	const onDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			const localEvent = e;
			const { dataTransfer } = localEvent;
			if (!canGetNodeData(dataTransfer)) return;
			const newNode: Node = createCustomNode({
				position: getPosition(localEvent, reactFlowWrapper.current, reactFlowInstance),
				data: getNodeData(dataTransfer),
			});
			if (!canInsertNode(elements, newNode)) return;
			setElements(elements.concat(newNode));
			setSelectedElements(newNode);
		},
		[elements, reactFlowInstance, setElements, setSelectedElements]
	);

	const onLoad = useCallback(
		(instance: OnLoadParams) => {
			setReactInstance(instance);
		},
		[setReactInstance]
	);

	const onKeyDown: KeyboardEventHandler = useCallback(
		(event) => {
			if ((event.code === 'Delete' || event.code === 'Escape') && selectedElements) {
				setElements(removeElements(selectedElements, elements));
			}
		},
		[elements, selectedElements, setElements]
	);

	return (
		<div ref={reactFlowWrapper} className={classes.wrapper}>
			<ReactFlow
				className={classes.reactFlow}
				elements={elements}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onLoad={onLoad}
				onConnect={onConnect}
				onKeyDown={onKeyDown}
				onElementsRemove={onElementsRemove}
				tabIndex={0}
				nodeTypes={nodeTypes}
				defaultPosition={flowState?.position}
				defaultZoom={flowState?.zoom}
			>
				<Controls
					style={{
						top: 10,
						left: 10,
						bottom: 'initial',
					}}
				/>
				<MiniMap
					nodeStrokeColor={(n) => {
						if (n.type === 'input') return '#0041d0';
						if (n.type === 'selectorNode') return '#1A192B';
						if (n.type === 'output') return '#ff0072';
						return '#000000';
					}}
					nodeColor={(n) => {
						if (n.type === 'selectorNode') return '#1A192B';
						return '#000000';
					}}
				/>
				<Background color="#aaa" />
			</ReactFlow>
		</div>
	);
};

export default ProjectEditorGraph;
