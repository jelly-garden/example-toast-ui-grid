import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../core/event.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import Grid from 'tui-grid';
import * as moment from 'moment';
import { FormatterProps } from 'tui-grid/types/store/column';

@Component({
  selector: 'app-client-pagination',
  templateUrl: './client-pagination.component.html',
  styleUrls: ['./client-pagination.component.scss']
})
export class ClientPaginationComponent implements OnInit, OnDestroy {
  loading = false;

  private unsubscribe: Subject<any>;

  grid: Grid;

  constructor(
    private cdr: ChangeDetectorRef,
    private eventService: EventService
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.loadItems();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  drawTable(gridData): void {
    this.grid = new Grid({
      el: document.getElementById('client-pagination-grid'),
      rowHeaders: ['rowNum'],
      pageOptions: {
        useClient: true,
        perPage: 5
      },
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
          name: 'event_place_name'
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
      ],
      data: gridData
    });
  }

  loadItems() {
    this.loading = true;

    const queryParams = {
      page: 1,
      count: 34347
    };
    this.eventService.getHistoryNoneAuth(queryParams).pipe(
      tap(res => {
        if (res.code === 200) {
          this.drawTable(res.response.results);
        } else {
          this.drawTable([]);
        }
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    ).subscribe();
  }
}
