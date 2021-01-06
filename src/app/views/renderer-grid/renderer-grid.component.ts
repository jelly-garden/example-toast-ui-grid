import { Component, OnInit } from '@angular/core';
import Grid, { ColumnOptions } from 'tui-grid';
import { RangeCellRenderer, EmptyCellRenderer } from '../../core/custom-cell-renderer';
import { EmptyHeaderRenderer } from '../../core/custom-header-renderer';

@Component({
  selector: 'app-renderer-grid',
  templateUrl: './renderer-grid.component.html',
  styleUrls: ['./renderer-grid.component.scss']
})
export class RendererGridComponent implements OnInit {

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
        align: 'center'
      },
      {
        header: 'Price',
        name: 'price',
        align: 'right',
        formatter: (props) => {
          return `${props.value} $`;
        }
      },
      {
        header: 'Unit',
        name: 'unit',
        align: 'right',
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
        align: 'center',
        renderer: { // 커스텀 렌더러
          type: RangeCellRenderer,
          options: {
            min: 1,
            max: 5,
            disabled: true
          }
        }
      },
      {
        name: 'control',
        renderer: EmptyCellRenderer
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
      el: document.getElementById('renderer-grid'),
      columns,
      data,
      bodyHeight: 300,
      showDummyRows: true,
      header: {
        complexColumns: [ // 복합 컬럼
          {
            header: 'info',
            name: 'controls',
            childNames: ['control'],
            renderer: EmptyHeaderRenderer, // 커스텀 컬럼 헤더
            hideChildHeaders: true
          }
        ]
      }
    });
  }
}

