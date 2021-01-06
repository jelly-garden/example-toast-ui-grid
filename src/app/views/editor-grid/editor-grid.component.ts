import { Component, OnInit } from '@angular/core';
import Grid, { ColumnOptions } from 'tui-grid';
import { NumberEditor, RangeEditor, TextEditor } from '../../core/custom-editor';
import { DeleteBtnCellRenderer, RangeCellRenderer } from '../../core/custom-cell-renderer';
import { AddBtnHeaderRenderer } from '../../core/custom-header-renderer';

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.scss']
})
export class EditorGridComponent implements OnInit {

  grid: Grid;

  constructor() { }

  ngOnInit(): void {
    this.drawTable();
  }

  drawTable(): void {
    const columns: ColumnOptions[] = [
      {
        header: 'Product',
        name: 'product',
        align: 'center',
        editor: {
          type: TextEditor,
          options: {
            maxLength: 10
          }
        },
        defaultValue: ''
      },
      {
        header: 'Price',
        name: 'price',
        align: 'right',
        editor: {
          type: NumberEditor
        },
        defaultValue: 0,
        formatter: (props) => {
          return `${props.value} $`;
        }
      },
      {
        header: 'Unit',
        name: 'unit',
        align: 'right',
        editor: 'text'
      },
      {
        header: 'Grade',
        name: 'grade',
        align: 'center',
        renderer: { // 커스텀 렌더러
          type: RangeCellRenderer,
          options: {
            min: 1,
            max: 5,
            disabled: false
          }
        },
        editor: {
          type: RangeEditor,
          options: {
            min: 1,
            max: 5
          }
        },
        defaultValue: 1
      },
      {
        name: 'control',
        align: 'center',
        renderer: DeleteBtnCellRenderer
      }
    ];

    const data = [
      {
        product: 'Apple',
        price: 3.99,
        unit: 'Kg',
        grade: 1
      },
      {
        product: 'Orange',
        price: 2.99,
        unit: 'Kg',
        grade: 5
      },
      {
        product: 'Carrots',
        price: 0.39,
        unit: 'Units',
        grade: 3
      }
    ];

    this.grid = new Grid({
      el: document.getElementById('editor-grid'),
      columns,
      data,
      header: {
        complexColumns: [ // 복합 컬럼
          {
            header: 'info',
            name: 'controls',
            childNames: ['control'],
            renderer: AddBtnHeaderRenderer, // 커스텀 컬럼 헤더
            hideChildHeaders: true
          }
        ]
      }
    });

    this.setGridEvent();
  }

  setGridEvent() {
    this.grid.on('beforeChange', ev => {
      console.log('before change:', ev);
    });
    this.grid.on('afterChange', ev => {
      console.log('after change:', ev);
    });
    this.grid.on('click', ev => {
      console.log('click !', ev);
    });

    this.grid.on('selection', (ev) => {
      console.log('selection!', ev);
      // const a = this.grid.getSelectionRange();
      // console.log('##', a);

      const b = this.grid.getRowSpanData(1, 'asset_type');
      console.log(b);
    });
  }
}
