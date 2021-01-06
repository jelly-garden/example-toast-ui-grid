import { HeaderRenderer } from 'tui-grid/types/renderer';

export class AddBtnHeaderRenderer implements HeaderRenderer {
  el: any;

  constructor(props) {
    const grid = props.grid;
    const _el = document.createElement('a');

    _el.className = 'custom-btn';
    _el.innerHTML = `<em class="fa fa-plus"></em>`;
    _el.addEventListener('click', () => {
      grid.prependRow({});   // 맨 앞에 추가
      // grid.appendRow();           // 맨 뒤에 추가
    });

    this.el = _el;
  }

  getElement() {
    return this.el;
  }

  render(props) {
  }
}
