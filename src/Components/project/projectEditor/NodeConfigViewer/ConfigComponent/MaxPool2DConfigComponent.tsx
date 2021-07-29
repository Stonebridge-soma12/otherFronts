import { IConfigComponent, MaxPool2DConfig } from '../../../../../core/block';
import { ChangeEvent, useMemo } from 'react';
import TextInput from '../../../../Input/TextInput';
import React from 'react';
import SecondDivisionTupleInput from '../../../../Input/SecondDivisionTupleInput';
import { configComponentToReactNode } from './util';

type Props = {
  config: MaxPool2DConfig,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const MaxPool2DConfigComponent = ({config, onChange}: Props) => {

  const { pool_size, strides, padding } = config;

  const configComponent: IConfigComponent<typeof config> = useMemo(() =>({
    padding: (<TextInput
      onChange={onChange}
      propertyContent={padding}
      propertyName={'padding'}
    />),
    pool_size: (<SecondDivisionTupleInput
      propertyName={'pool_size'}
      onChange={onChange}
      propertyContent={pool_size}
    />),
    strides: (<SecondDivisionTupleInput
      canNull={true}
      propertyName={'strides'}
      onChange={onChange}
      propertyContent={strides}/>
    )
  }), [config, onChange])

  return (<>
    {configComponentToReactNode(configComponent)}
  </>)
}

export default MaxPool2DConfigComponent;