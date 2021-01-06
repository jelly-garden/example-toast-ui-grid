import { CellRenderer } from 'tui-grid/types/renderer';

export class RangeCellRenderer implements CellRenderer {
  el: any;

  constructor(props) {
    const _el = document.createElement('input');
    const { min, max, disabled } = props.columnInfo.renderer.options;

    _el.type = 'range';
    _el.min = String(min);
    _el.max = String(max);
    _el.disabled = disabled;

    this.el = _el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.el.value = String(props.value);
  }
}

export class DeleteBtnCellRenderer implements CellRenderer {
  el: any;

  constructor(props) {
    const grid = props.grid;
    const _el = document.createElement('a');

    _el.className = 'custom-btn';
    _el.innerHTML = `<em class="fa fa-times"></em>`;
    _el.addEventListener('click', () => {
      grid.removeRow(props.rowKey);
    });

    this.el = _el;
  }

  getElement() {
    return this.el;
  }

  render(props) {
  }
}

export class EmptyCellRenderer implements CellRenderer {
  el: any;

  constructor(props) {
    const _el = document.createElement('div');

    this.el = _el;
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.el.value = String(props.value);
  }
}
