import { Component, OnInit } from '@angular/core';
import Grid from 'tui-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    this.setTheme();
    this.setLanguage();
  }

  setTheme() {
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

  setLanguage() {
    Grid.setLanguage('en-US', { // set new language
      display: {
        noData: 'No data.',
        loadingData: 'Loading !!!!!',
        resizeHandleGuide: 'You can change the width of the column by mouse drag, ' +
          'and initialize the width by double-clicking.'
      },
      net: {
        confirmCreate: 'Are you sure you want to create {{count}} data?',
        confirmUpdate: 'Are you sure you want to update {{count}} data?',
        confirmDelete: 'Are you sure you want to delete {{count}} data?',
        confirmModify: 'Are you sure you want to modify {{count}} data?',
        noDataToCreate: 'No data to create.',
        noDataToUpdate: 'No data to update.',
        noDataToDelete: 'No data to delete.',
        noDataToModify: 'No data to modify.',
        failResponse: 'An error occurred while requesting data.\nPlease try again.'
      }
    });
  }
}
