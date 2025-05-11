import { addLineColumn } from '@/reducers/lineReducer';
import React from 'react';
import { Row } from 'react-bootstrap';
import Icon from '../Icon';

interface Props {
	handleUpdate: CallableFunction;
	length?: number;
}
const LineAddRow: React.FC<Props> = ({ handleUpdate }) => {
	return (
		<Row className="add-row" onClick={e => handleUpdate(addLineColumn)}>
			<div>
				<Icon name="plus-lg" />
				<br /> Add Column
			</div>
		</Row>
	);
};
export default LineAddRow;
