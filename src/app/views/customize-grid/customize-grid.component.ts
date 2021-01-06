import { Component, OnInit } from '@angular/core';
import Grid, { ColumnOptions } from 'tui-grid';
import { NumberEditor, TextEditor, RangeEditor } from '../../custom-editor';
import { RangeCellRenderer, DeleteBtnCellRenderer } from '../../custom-cell-renderer';
import { AddBtnHeaderRenderer } from '../../custom-header-renderer';

@Component({
  selector: 'app-customize-grid',
  templateUrl: './customize-grid.component.html',
  styleUrls: ['./customize-grid.component.scss']
})
export class CustomizeGridComponent implements OnInit {

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
        editor: {
          type: TextEditor,
          options: {
            maxLength: 10
          }
        }
      },
      {
        header: 'Price',
        name: 'price',
        editor: {
          type: NumberEditor
        }
      },
      {
        header: 'Unit',
        name: 'unit',
        renderer: { // 디폴트 렌더러 스타일링
          styles: {
            fontWeight: 'bold',
            color: (props) => typeof props.value === 'string' ? props.value.length > 3 ? '#ccc' : '#222' : '#ccc'
          },
          attributes: {
            'data-type': 'default',
            title: (props) => `title: ${props.formattedValue}`
          },
          classNames: ['my-styled-cell']
        }
      },
      {
        header: 'Grade',
        name: 'grade',
        renderer: { // 커스텀 렌더러
          type: RangeCellRenderer,
          options: {
            min: 1,
            max: 5
          }
        },
        editor: {
          type: RangeEditor,
          options: {
            min: 1,
            max: 5
          }
        }
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
        grade: 1
      },
      {
        product: 'Carrots',
        price: 0.39,
        unit: 'Units',
        grade: 1
      }
    ];

    this.grid = new Grid({
      el: document.getElementById('customize-grid'),
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
  }
}
