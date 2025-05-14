import Line from '@/types/Line';
// import { createSlice } from '@reduxjs/toolkit';

export const SET_LINE = 'SET_LINE';
export const SET_LINE_VALUE = 'SET_LINE_VALUE';
export const SET_LINE_POINT = 'SET_LINE_POINT';
export const SET_LINE_COLUMN = 'SET_LINE_COLUMN';
export const ADD_LINE_COLUMN = 'ADD_LINE_COLUMN';
export const REMOVE_LINE_COLUMN = 'REMOVE_LINE_COLUMN';
export const ADD_LINE_ROW = 'ADD_LINE_ROW';
export const REMOVE_LINE_ROW = 'REMOVE_LINE_ROW';

export const defaultColumn = [null, null, null, null, null];
export const defaultLine: Line = {
	size: 5, // yLength ; xLength = line.columns.length
	columns: [
		defaultColumn,
		defaultColumn,
		defaultColumn,
		defaultColumn,
		defaultColumn,
		defaultColumn,
	],
};

export const setLineAction = (value: any) => ({ type: SET_LINE, value });
export const setLineValue = (name: string, value: any) => ({
	type: SET_LINE_VALUE,
	name,
	value,
});
export const setLinePoint = (coord: number[], value: any) => ({
	type: SET_LINE_POINT,
	coord,
	value,
});
export const setLineColumn = (i: number, value: any) => ({
	type: SET_LINE_COLUMN,
	i,
	value,
});
export const addLineColumn = (x: number | undefined) => ({ type: ADD_LINE_COLUMN, i: x });
export const removeLineColumn = (x: number) => ({ type: REMOVE_LINE_COLUMN, i: x });
export const addLineRow = (y: number | undefined) => ({ type: ADD_LINE_ROW, i: y });
export const removeLineRow = (y: number) => ({ type: REMOVE_LINE_ROW, i: y });

const lineReducer = (line: Line = defaultLine, action: Record<string, any>) => {
	let columns;
	switch (action.type) {
		case SET_LINE:
			return action.value || line;

		case SET_LINE_VALUE:
			return { ...line, [action.name]: action.value };

		case SET_LINE_POINT:
			columns = line.columns.slice();
			columns[action.coord[0]] = columns[action.coord[0]].slice();
			columns[action.coord[0]][action.coord[1]] = action.value;
			return { ...line, columns };

		case SET_LINE_COLUMN:
			columns = line.columns.slice();
			columns[action.i] = action.value;
			return { ...line, columns };

		case ADD_LINE_COLUMN:
			columns = line.columns.slice();
			if (action.i === undefined) {
				columns.push(new Array(line.size).fill(null));
			} else {
				columns.splice(action.i, 0, new Array(line.size).fill(null));
			}
			return { ...line, columns };

		case REMOVE_LINE_COLUMN:
			columns = line.columns.slice();
			columns.splice(action.i, 1);
			return { ...line, columns };

		case ADD_LINE_ROW:
			columns = line.columns.map(col => {
				col = col.slice();
				if (action.i === undefined) {
					col.push(null);
				} else {
					col.splice(action.i + 1, 0, null);
				}
				return col;
			});
			return { ...line, columns, size: line.size + 1 };

		case REMOVE_LINE_ROW:
			columns = line.columns.map(col => {
				col = col.slice();
				col.splice(action.i, 1);
				return col;
			});
			return { ...line, columns, size: line.size - 1 };

		default:
			return line;
	}
};

// const lineSlice = createSlice({
// 	name: 'line',
// 	initialState: defaultLine,
// 	reducers: {
// 		setLine: (state: Line, { payload: line }) => line as Line,
// 		setLineValue: {
// 			reducer: (state: Line, { payload: { name, value } }) => {
// 				state[name as string] = value;
// 			},
// 			prepare: (name, value) => ({ payload: { name, value } }),
// 		},
// 	},
// });

export default lineReducer;
