import { makeStyles, TextField } from '@material-ui/core';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import Input from './Input';
import { secondDivisionTupleRegExp } from './Validation';

const useStyle = makeStyles({
	propertyContentContainer: {
		width: '100%',
	},
});

type Props = {
	propertyName: string;
	propertyContent: string;
	onChange: (e: ChangeEvent<any>) => void;
	canNull?: boolean;
};

const SecondDivisionTupleInput: FC<Props> = ({ propertyName, propertyContent, onChange, canNull }: Props) => {
	const classes = useStyle();

	const handleChange = useCallback(
		(e: ChangeEvent<any>) => {
			onChange(e);
		},
		[onChange]
	);

	const body = (
		<TextField
			name={propertyName}
			onChange={handleChange}
			value={propertyContent}
			type="text"
			className={classes.propertyContentContainer}
			variant="standard"
			label={propertyName}
			placeholder="123, 456"
		/>
	);

	return <Input body={body} />;
};

SecondDivisionTupleInput.defaultProps = {
	canNull: false,
};

export default SecondDivisionTupleInput;
