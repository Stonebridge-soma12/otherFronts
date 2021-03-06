import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { createElement, memo } from 'react';
import ReactTooltip from 'react-tooltip';
import { NodeProps, useStoreState } from 'react-flow-nns';
import { BlockState } from '../../../../block';
import LayerNodeTable from './LayerNodeTable';
import useTargetCandidates from '../useTargetCandidates';
import NodeDescriptionTable from '../NodeDescription/DescriptionTable';
import style from '../target.module.css';
import { NodeColorTable, NodeStrokeColorTable } from '../NodeStroke';
import { DatasetPreviewTableRow } from '../../../../../../components/project/projectDataset/projectDatasetViewer/ProjectDatasetTable';

const useLayerStyle = makeStyles({
	wrapper: {
		padding: 10,
		paddingTop: 5,
		paddingBottom: 20,
		borderRadius: 3,
		fontSize: 12,
		borderWidth: '1px',
		borderStyle: 'solid',
		// backgroundColor: NodeColorTable.Layer,
		// borderColor: NodeStrokeColorTable.Layer,
		'&:focus': {
			boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.08)',
		},
	},
	nodeContentWrapper: {
		width: '100%',
		height: '100%',
		textAlign: 'center',
	},
	nodeContent: {
		color: 'white',
		fontSize: 16,
	},
	nodeHeaderWrapper: {
		width: 'fit-content',
		height: 'fit-content',
		marginBottom: 5,
	},
	nodeHeader: {
		fontSize: 7,
		opacity: 0.5,
	},
	tooltip: {
		width: '400px',
		display: 'inline-block',
	},
});

const LayerNode = (props: NodeProps<BlockState>) => {
	const { data } = props;
	const { targetCandidates } = useTargetCandidates();
	const { type, category } = data as BlockState;
	const classes = useLayerStyle();
	const node = createElement(LayerNodeTable[type], props);
	const nodeColorStyle = makeStyles({
		wrapper: {
			backgroundColor: NodeColorTable[category],
			borderColor: NodeColorTable[category],
		},
	});
	const nodeColor = nodeColorStyle();
	const NodeDescription = createElement(NodeDescriptionTable[data.type]);

	console.log(data);

	return (
		<>
			<div
				tabIndex={0}
				role="button"
				className={
					`${classes.wrapper} ${nodeColor.wrapper}`
					// ${targetCandidates?.has(type) && style.targetCandidate}`
				}
				data-tip={`nodeDescription${data.label}`}
				data-for={`nodeDescription${data.label}`}
			>
				<div className={classes.nodeHeaderWrapper}>
					<span className={classes.nodeHeader}>{type}</span>
				</div>
				<div className={classes.nodeContentWrapper}>
					<div className={classes.nodeContent}>{node}</div>
				</div>
			</div>
			<ReactTooltip
				id={`nodeDescription${data.label}`}
				type="light"
				place="right"
				effect="solid"
				border
				borderColor="black"
				offset={{ right: 20 }}
				className={classes.tooltip}
			>
				{NodeDescription}
			</ReactTooltip>
		</>
	);
};

export default memo(LayerNode);
