import { makeStyles, TextField } from '@material-ui/core';
import { ChangeEvent, useCallback, useState } from 'react';
import Input from './Input';
import { floatWithoutSpacesRegExp } from './Validation';

const useStyle = makeStyles({
	propertyContentContainer: {
		width: '100%',
	},
});

type Props = {
	propertyName: string;
	propertyContent: string;
	onChange: any;
};

const FloatInput = ({ propertyName, propertyContent, onChange }: Props) => {
	const classes = useStyle();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onChange({
				target: {
					name: e.target.name,
					value: e.target.value,
				},
			});
		},
		[onChange]
	);
	const body = (
		<TextField
			error={!floatWithoutSpacesRegExp.test(propertyContent)}
			name={propertyName}
			onChange={handleChange}
			value={propertyContent}
			className={classes.propertyContentContainer}
			variant="standard"
			label={propertyName}
			placeholder="123.123"
		/>
	);

	return <Input body={body} />;
};

export default FloatInput;
