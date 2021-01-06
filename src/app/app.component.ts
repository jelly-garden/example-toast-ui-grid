import { Component, OnInit } from '@angular/core';
import Grid from 'tui-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // Grid.applyTheme('default');
    Grid.applyTheme('striped');
    // Grid.applyTheme('clean');

    /* 테마 커스터마이징 */
    // Grid.applyTheme('striped', {
    //   cell: {
    //     header: {
    //       background: '#eef'
    //     },
    //     evenRow: {
    //       background: '#fee'
    //     }
    //   }
    // });
    // Grid.applyTheme('default', {
    //   cell: {
    //     normal: {
    //       background: '#fff',
    //       border: '#e0e0e0',
    //       showVerticalBorder: false,
    //       showHorizontalBorder: true
    //     },
    //     header: {
    //       background: '#eef',
    //       border: '#e0e0e0'
    //     },
    //     selectedHeader: {
    //       background: '#e0e0e0'
    //     }
    //   }
    // });
  }
}
