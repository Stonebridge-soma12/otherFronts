import React, { useCallback, useState } from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles<Theme, { elementNumber: number }>(() => ({
	Wrapper: {
		padding: 0,
		listStyle: 'none',
	},
	item: {
		zIndex: 1000,
		width: '100%',
		margin: 0,
		marginLeft: 3,
		justifyContent: 'flex-start',
		'&::before': {
			lineHeight: 0,
			display: 'flex',
			marginRight: 3,
			content:
				"url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e\")",
			transition: 'all ease 0.5s',
		},
	},
	active: {
		'&::before': {
			transform: 'rotate(90deg)',
		},
	},
	collapse: {
		overflow: 'hidden',
		height: 0,
		transition: 'height ease-in-out 0.5s',
	},
	show: {
		opacity: 1,
		height: ({ elementNumber }) => elementNumber * 32,
	},
}));

type Props = {
	elementNumber: number;
	children: any;
	name: string | number;
};

const NodeContainer = ({ elementNumber, children, name }: Props) => {
	const classes = useStyle({ elementNumber });
	const [collapse, setCollapse] = useState(true);

	const onCollapseToggle = useCallback(() => {
		setCollapse((pre) => !pre);
	}, []);

	return (
		<li>
			<Button onClick={onCollapseToggle} className={`${classes.item} ${collapse ? '' : classes.active}`}>
				<h3 style={{ margin: 0 }}>{name}</h3>
			</Button>
			<ol className={`${classes.collapse} ${collapse ? '' : classes.show} depth`}>{children}</ol>
		</li>
	);
};

export default NodeContainer;
