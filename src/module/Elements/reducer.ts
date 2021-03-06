import { createReducer } from 'typesafe-actions';
import { addEdge, Edge, Elements, isEdge, removeElements, Node, XYPosition } from 'react-flow-nns';
import { ElementActionTypes, ElementState } from './types';
import { ElementAction } from './actions';

const initialState: ElementState = {
	elements: [],
};

const elements = createReducer<ElementState, ElementActionTypes>(initialState, {
	[ElementAction.SET_ELEMENTS]: (state, action) => {
		if (action.payload instanceof Function) {
			return { elements: action.payload(state.elements) };
		}
		return { elements: action.payload };
	},
	[ElementAction.ADD_BLOCK]: (state, action) => {
		return {
			elements: state.elements.concat(action.payload.block),
		};
	},
	[ElementAction.REMOVE_BLOCK]: (state, action) => {
		const removeToElements = state.elements.filter((element) => {
			return element.id === action.payload.blockId;
		});

		if (removeToElements == null) {
			return state;
		}

		return {
			elements: removeElements(removeToElements, state.elements),
		};
	},
	[ElementAction.REMOVE_EDGE]: (state, action) => {
		const removeToElements = state.elements.filter((element) => {
			return element.id === action.payload.edgeId;
		});

		if (removeToElements == null) {
			return state;
		}

		return {
			elements: removeElements(removeToElements, state.elements),
		};
	},
	[ElementAction.SET_ELEMENT_BY_ID_UPDATE_CONFIG]: (state, action) => {
		const { id, key, value } = action.payload;
		return {
			elements: state.elements.map((element) => {
				if (element.id !== id) return element;
				return {
					...element,
					data: {
						...element.data,
						param: {
							...element.data.param,
							[key]: value,
						},
					},
				};
			}),
		};
	},
	[ElementAction.SET_ELEMENT_BY_ID_UPDATE_LABEL]: (state, action) => {
		const { id, label } = action.payload;
		return {
			elements: state.elements.map((element) => {
				if (element.id !== id) return element;

				return {
					...element,
					data: {
						...element.data,
						label,
					},
				};
			}),
		};
	},
	[ElementAction.SET_ELEMENT_BY_ID_UPDATE_POSITION]: (state, action) => {
		const { blockId, position } = action.payload;
		return {
			elements: state.elements.map((element) => {
				if (element.id !== blockId) return element;
				return {
					...element,
					position: position as XYPosition,
				};
			}),
		};
	},
});

export default elements;
