import { Component, OnInit } from '@angular/core';
import Grid from 'tui-grid';
import { DataSource } from 'tui-grid/types/dataSource';

@Component({
  selector: 'app-data-source-grid',
  templateUrl: './data-source-grid.component.html',
  styleUrls: ['./data-source-grid.component.scss']
})
export class DataSourceGridComponent implements OnInit {

  grid: Grid;

  constructor() { }

  ngOnInit(): void {
    this.drawTable();
  }

  drawTable(): void {
    const dataSource: DataSource = {
      api: {
        readData: {
          url: '/vurix-dms/api/v1/event/historyNoneAuth',
          method: 'GET',
          initParams: {
            count: 5
          }
        }
      },
      contentType: 'application/json',
      initialRequest: true,  // 디폴트 값은 true
      withCredentials: true
    };

    this.grid = new Grid({
      el: document.getElementById('data-source-grid'),
      pageOptions: {
        perPage: 5
      },
      data: dataSource,
      columns: [
        {
          header: 'Name',
          name: 'name'
        },
        {
          header: 'Artist',
          name: 'artist'
        },
        {
          header: 'Type',
          name: 'type'
        },
        {
          header: 'Release',
          name: 'release'
        },
        {
          header: 'Genre',
          name: 'genre'
        }
      ]
    });

    this.grid.on('beforeRequest', (ev) => {
      // 요청을 보내기 전
      console.log('beforeRequest', ev);
    });
    this.grid.on('response', (ev) => {
      // 성공/실패와 관계 없이 응답을 받았을 경우
      console.log('response', ev);
    });
    this.grid.on('successResponse', (ev) => {
      // 결과가 true인 경우
      console.log('successResponse', ev);
    });
    this.grid.on('failResponse', (ev) => {
      // 결과가 false인 경우
      console.log('failResponse', ev);
    });
    this.grid.on('errorResponse', (ev) => {
      // 오류가 발생한 경우
      console.log('errorResponse', ev);
    });
  }
}
