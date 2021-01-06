import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import Pagination from 'tui-pagination';
import { EventService } from '../../core/event.service';
import Grid from 'tui-grid';
import { Subject } from 'rxjs';
import { finalize, take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { FormatterProps } from 'tui-grid/types/store/column';

@Component({
  selector: 'app-server-pagination',
  templateUrl: './server-pagination.component.html',
  styleUrls: ['./server-pagination.component.scss']
})
export class ServerPaginationComponent implements OnInit, OnDestroy {
  loading = false;

  private unsubscribe: Subject<any>;

  grid: Grid;
  pagination: Pagination;

  page = 1;
  count = 5;
  totalCount = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private eventService: EventService
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.drawTable();

    this.loadItems().subscribe((response) => {
      if (response) {
        this.grid.resetData(response.results);

        this.totalCount = Number(response.total_count);

        this.drawPagination();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  drawTable(): void {
    this.grid = new Grid({
      el: document.getElementById('server-pagination-grid'),
      rowHeaders: ['rowNum'],
      columns: [
        {
          header: '이벤트코드',
          name: 'event_code'
        },
        {
          header: '이벤트명',
          name: 'event_name'
        },
        {
          header: '읍면동',
          name: 'emd_name'
        },
        {
          header: '발생위치',
          name: 'event_place_name',
          whiteSpace: 'pre-line'
        },
        {
          header: '내용',
          name: 'event_contents'
        },
        {
          header: '등록일자',
          name: 'reg_date',
          formatter: (props: FormatterProps) => {
            if (props.value) {
              const value = props.value as moment.MomentInput;
              return moment(value, 'X').format('YYYY-MM-DD HH:mm:ss');
            }
          }
        }
      ]
    });
  }

  drawPagination(): void {
    const options = {
      totalItems: this.totalCount,
      itemsPerPage: this.count,
      visiblePages: 10,
      page: this.page
    };

    this.pagination = new Pagination('pagination', options);

    this.setPaginationEvent();
  }

  loadItems() {
    this.loading = true;

    const queryParams = {
      page: this.page,
      count: this.count
    };
    return this.eventService.getHistoryNoneAuth(queryParams).pipe(
      map(res => {
        if (res.code === 200) {
          return res.response;
        } else {
          return null;
        }
      }),
      take(1),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    );
  }

  setPaginationEvent() {
    this.pagination.on('beforeMove', evt => {
      const { page } = evt;

      this.page = page;
      this.loadItems().subscribe((response) => {
        if (response) {
          this.grid.resetData(response.results);

          this.totalCount = Number(response.total_count);
          this.pagination.setTotalItems(this.totalCount);
        }
      });
    });
  }
}
