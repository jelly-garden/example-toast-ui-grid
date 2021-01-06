import { Component, OnInit } from '@angular/core';
import Grid, { ColumnOptions } from 'tui-grid';

@Component({
  selector: 'app-asset-grid',
  templateUrl: './asset-grid.component.html',
  styleUrls: ['./asset-grid.component.scss']
})
export class AssetGridComponent implements OnInit {

  grid: Grid;
  constructor() { }

  ngOnInit(): void {
    this.drawTable();

    this.setData();
  }

  drawTable(): void {
    const assetUseData = {
      cctv: [
        { text: '선택', value: '' },
        { text: '고정형', value: 'fixed' },
        { text: 'PTZ', value: 'ptz' },
        { text: '열상/열화상', value: 'thermal' }
      ],
      lpr: [
        { text: '선택', value: '' },
        { text: '차번인식', value: 'lpr' }
      ],
      server: [
        { text: '선택', value: '' },
        { text: '서버', value: 'server' }
      ],
      pc: [
        { text: '선택', value: '' },
        { text: '데스크탑', value: 'desktop' },
        { text: '노트북', value: 'laptop' }
      ],
      embell: [
        { text: '선택', value: '' },
        { text: '매립형', value: 'concealed' },
        { text: '도출형', value: 'derived' }
      ],
      network: [
        { text: '선택', value: '' },
        { text: '스위치', value: 'switch' },
        { text: '허브', value: 'hub' },
        { text: '방화벽', value: 'firewall' },
        { text: '무선장비', value: 'wireless' }
      ],
      poll: [
        { text: '선택', value: '' },
        { text: 'CCTV', value: 'cctv' }
      ],
      body: [
        { text: '선택', value: '' },
        { text: 'CCTV', value: 'cctv' }
      ],
      sensor: [
        { text: '선택', value: '' },
        { text: '이상음원', value: 'isd' },
        { text: '전기안전', value: 'electric' },
        { text: '기상센서', value: 'weather' },
        { text: '대기질', value: 'atmosphere' }
      ],
      eld: [
        { text: '선택', value: '' },
        { text: '전광판', value: 'eld' }
      ],
      solution: [
        { text: '선택', value: '' },
        { text: '솔루션', value: 'solution' }
      ],
      os: [
        { text: '선택', value: '' },
        { text: '윈도우', value: 'window' },
        { text: '리눅스', value: 'linux' }
      ]
    };

    const columns: ColumnOptions[] = [
      {
        header: '등록일자',
        name: 'reg_date',
        editor: {
          type: 'datePicker',
          options: {
            format: 'yyyy-MM-dd hh:mm A',
            timepicker: {
              layoutType: 'tab',
              inputType: 'spinbox'
            }
          }
        },
        sortable: true,
        sortingType: 'desc'
      },
      {
        header: '자산종류',
        name: 'asset_type',
        copyOptions: {
          useListItemText: true
        },
        formatter: 'listItemText',
        editor: {
          type: 'select',
          options: {
            listItems: [
              { text: '선택', value: '' },
              { text: 'CCTV', value: 'cctv' },
              { text: 'LPR', value: 'lpr' },
              { text: '서버', value: 'server' },
              { text: 'PC', value: 'pc' },
              { text: '비상벨', value: 'embell' },
              { text: '네트워크', value: 'network' },
              { text: '폴', value: 'poll' },
              { text: '함체', value: 'body' },
              { text: '센서', value: 'sensor' },
              { text: '전광판', value: 'eld' },
              { text: '솔루션', value: 'solution' },
              { text: 'OS', value: 'os' }
            ]
          }
        },
        relations: [
          {
            targetNames: ['asset_use'],
            listItems({ value}) {
              return typeof value === 'string' ? assetUseData[value] : [];
            },
            disabled({ value }) {
              return !value;
            }
          }
        ],
        sortable: true,
        sortingType: 'asc'
      },
      {
        header: '자산분류',
        name: 'asset_use',
        copyOptions: {
          useListItemText: true
        },
        formatter: 'listItemText',
        editor: {
          type: 'select',
          options: {
            listItems: []
          }
        },
        sortable: true,
        sortingType: 'asc'
      },
      {
        header: '자산이름',
        name: 'name',
        whiteSpace: 'pre-line',
        editor: 'text',
        sortable: true,
        sortingType: 'asc'
      },
      {
        header: '관리코드상세',
        name: 'asset_id',
        editor: 'text',
        sortable: true,
        sortingType: 'asc'
      },
      {
        header: '위치관리코드',
        name: 'bjcd',
        editor: 'text',
        sortable: true,
        sortingType: 'asc'
      },
      {
        header: '동정보',
        name: 'emd',
        copyOptions: {
          useListItemText: true
        },
        formatter: 'listItemText',
        editor: {
          type: 'select',
          options: {
            listItems: [
              { text: '선택', value: '' },
              { text: '가리봉동', value: '1' },
              { text: '개봉동', value: '2' },
              { text: '구로동', value: '3' },
              { text: '궁동', value: '4' },
              { text: '신도림동', value: '5' },
              { text: '오류동', value: '6' },
              { text: '온수동', value: '7' },
              { text: '천왕동', value: '8' },
              { text: '항동', value: '9' }
            ]
          }
        },
        sortable: true,
        sortingType: 'asc'
      },
      {
        header: '위치명',
        name: 'place_name',
        whiteSpace: 'pre-line',
        editor: 'text'
      },
      {
        header: '좌표정보',
        name: 'geom',
        editor: 'text'
      },
      {
        header: '주소(지번)',
        name: 'lot_address',
        whiteSpace: 'pre-line',
        editor: 'text'
      },
      {
        header: '주소(도로명)',
        name: 'road_address',
        whiteSpace: 'pre-line',
        editor: 'text'
      },
      {
        header: '설치/사용 목적',
        name: 'purpose',
        copyOptions: {
          useListItemText: false
        },
        formatter: 'listItemText',
        editor: {
          type: 'select',
          options: {
            listItems: [
              { text: '선택', value: '' },
              { text: '방범보안', value: '1' },
              { text: '방범(주택가)', value: '2' },
              { text: '주정차단속', value: '3' },
              { text: '방범(스쿨존)', value: '4' },
              { text: '차번단속', value: '5' },
              { text: '어린이보호', value: '6' },
              { text: '도시공원', value: '7' },
              { text: '공영주차장', value: '8' },
              { text: '재난안전', value: '9' },
              { text: '산불감시', value: '10' },
              { text: '재난정보', value: '11' },
              { text: '재난전파', value: '12' },
              { text: '하천감시', value: '13' },
              { text: '환경감시', value: '14' },
              { text: '무단투기', value: '15' },
              { text: '정보수집', value: '16' },
              { text: '솔루션운영', value: '17' },
              { text: '기타', value: '18' },
            ]
          }
        },
        sortable: true,
        sortingType: 'asc'
      },
      {
        header: '운영상태',
        name: 'status',
        copyOptions: {
          useListItemText: true
        },
        formatter: 'listItemText',
        editor: {
          type: 'select',
          options: {
            listItems: [
              { text: '선택', value: '' },
              { text: '등록', value: '1' },
              { text: '설치운영', value: '2' },
              { text: '장애', value: '3' },
              { text: '손/망실', value: '4' },
              { text: '폐기', value: '5' }
            ]
          }
        },
        sortable: true,
        sortingType: 'asc'
      }
    ];

    this.grid = new Grid({
      el: document.getElementById('asset-grid'),
      scrollX: false,
      scrollY: true,
      rowHeaders: ['rowNum', 'checkbox'],
      rowHeight: 'auto',
      pageOptions: {
        useClient: true,
        perPage: 5
      },
      columns,
      header: {
        height: 80,
        complexColumns: [
          {
            header: '자산정보',
            name: 'asset',
            childNames: ['asset_type', 'asset_use', 'name', 'asset_id']
          },
          {
            header: '위치',
            name: 'mergeColumn2',
            childNames: ['bjcd', 'emd', 'place_name', 'geom', 'lot_address', 'road_address']
          }
        ]
      },
      columnOptions: {
        resizable: true
      }
    });
  }

  setData() {
    const newData = [
      {
        reg_date: '2019-11-19 09:00 AM',
        asset_type: 'cctv',
        asset_use: 'fixed',
        name: '2016_C_실옥동_기업은행뒤편_고정2_LG',
        asset_id: 'F1',
        bjcd: '1111010100',
        emd: '1',
        place_name: '서울시 구로구 가리봉동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 가리봉동',
        road_address: '서울시 구로구 가리봉동',
        purpose: '1',
        status: '1'
      },
      {
        reg_date: '2019-11-20 09:00 AM',
        asset_type: 'cctv',
        asset_use: 'ptz',
        name: '2018_C_아산온천정육점앞_고정1_자가망',
        asset_id: 'P2',
        bjcd: '2611010800',
        emd: '2',
        place_name: '서울시 구로구 개봉동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 개봉동',
        road_address: '서울시 구로구 개봉동',
        purpose: '2',
        status: '2'
      },
      {
        reg_date: '2019-12-30 09:00 AM',
        asset_type: 'network',
        asset_use: 'firewall',
        name: '별관실내2층',
        asset_id: 'FW',
        bjcd: '2611010800',
        emd: '5',
        place_name: '서울시 구로구 신도림동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 신도림동',
        road_address: '서울시 구로구 신도림동',
        purpose: '5',
        status: '5'
      },
      {
        reg_date: '2020-01-10 09:00 AM',
        asset_type: 'lpr',
        asset_use: 'lpr',
        name: 'LPR1',
        asset_id: 'LPR1',
        bjcd: '2611010800',
        emd: '3',
        place_name: '서울시 구로구 구로동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 구로동',
        road_address: '서울시 구로구 구로동',
        purpose: '4',
        status: '2'
      },
      {
        reg_date: '2019-11-20 09:00 AM',
        asset_type: 'server',
        asset_use: 'server',
        name: '서버1',
        asset_id: 'Server',
        bjcd: '2611010800',
        emd: '4',
        place_name: '서울시 구로구 궁동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 궁동',
        road_address: '서울시 구로구 궁동',
        purpose: '4',
        status: '1'
      },
      {
        reg_date: '2020-01-05 09:00 AM',
        asset_type: 'network',
        asset_use: 'wireless',
        name: '무선장비1',
        asset_id: 'WN',
        bjcd: '2611010800',
        emd: '9',
        place_name: '서울시 구로구 항동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 항동',
        road_address: '서울시 구로구 항동',
        purpose: '18',
        status: '5'
      },
      {
        reg_date: '2019-12-30 09:00 AM',
        asset_type: 'sensor',
        asset_use: 'isd',
        name: '이상음원1',
        asset_id: 'IoT_S',
        bjcd: '2611010800',
        emd: '5',
        place_name: '서울시 구로구 신도림동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 신도림동',
        road_address: '서울시 구로구 신도림동',
        purpose: '11',
        status: '2'
      },
      {
        reg_date: '2019-12-30 09:00 AM',
        asset_type: 'sensor',
        asset_use: 'electric',
        name: '전기안전2',
        asset_id: 'IoT_E',
        bjcd: '2611010800',
        emd: '5',
        place_name: '서울시 구로구 신도림동',
        geom: 'POINT (126.995577 36.78828)',
        lot_address: '서울시 구로구 신도림동',
        road_address: '서울시 구로구 신도림동',
        purpose: '14',
        status: '1'
      }
    ];
    this.grid.resetData(newData);
  }
}
