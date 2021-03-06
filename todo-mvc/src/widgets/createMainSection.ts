import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-interfaces/widgetBases';
import WeakMap from 'dojo-shim/WeakMap';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import { StoreObservablePatchable } from 'dojo-interfaces/abilities';

import { todoToggleAll } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoList from './createTodoList';

const stateFromMap = new WeakMap<Widget<WidgetState>, StoreObservablePatchable<WidgetState>>();

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		childNodeRenderers: [
			function (this: Widget<WidgetState>): DNode[] {
				const stateFrom = stateFromMap.get(this);
				const checkBoxOptions = {
					id: 'todo-toggle',
					stateFrom,
					listeners: {
						change: todoToggleAll
					}
				};

				return [
					d(createTodoList, { id: 'todo-list', stateFrom }),
					d(createCheckboxInput, <WidgetOptions<WidgetState> > checkBoxOptions)
				];
			}
		]
	},
	initialize(instance: Widget<WidgetState>, options: WidgetOptions<WidgetState>) {
		const { stateFrom } = options;
		if (stateFrom) {
			stateFromMap.set(instance, stateFrom);
		}
	}
});

export default createMainSection;
