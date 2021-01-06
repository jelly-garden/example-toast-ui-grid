import { CellEditor } from 'tui-grid/types/editor';

export class TextEditor implements CellEditor {
  el: any;

  constructor(props) {
    const _el = document.createElement('input');
    const { maxLength } = props.columnInfo.editor.options;

    _el.type = 'text';
    _el.maxLength = maxLength;
    _el.value = String(props.value);

    this.el = _el;
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  mounted() {
    this.el.select();
  }
}

export class NumberEditor implements CellEditor {
  el: any;

  constructor(props) {
    const _el = document.createElement('input');

    _el.type = 'number';
    _el.value = props.value;

    this.el = _el;
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  mounted() {
    this.el.select();
  }
}

export class RangeEditor implements CellEditor {
  el: any;

  constructor(props) {
    const _el = document.createElement('input');
    const { min, max } = props.columnInfo.editor.options;

    _el.type = 'range';
    _el.min = String(min);
    _el.max = String(max);
    _el.value = props.value;

    this.el = _el;
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  mounted() {
    this.el.select();
  }
}
