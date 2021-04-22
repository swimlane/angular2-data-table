import { Directive, Input, Output, EventEmitter, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MouseEvent } from '../events';

@Directive({ selector: '[long-press]' })
export class LongPressDirective implements OnDestroy {
  @Input() pressEnabled: boolean = true;
  @Input() pressModel: any;
  @Input() duration: number = 500;

  @Output() longPressStart: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnd: EventEmitter<any> = new EventEmitter();

  pressing: boolean;
  isLongPressing: boolean;
  timeout: any;
  mouseX: number = 0;
  mouseY: number = 0;

  subscription: Subscription;

  @HostBinding('class.press')
  get press(): boolean {
    return this.pressing;
  }

  @HostBinding('class.longpress')
  get isLongPress(): boolean {
    return this.isLongPressing;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    // don't do right/middle clicks
    if (event.which !== 1 || !this.pressEnabled) return;

    // don't start drag if its on resize handle
    const target = <HTMLElement>event.target;
    if (target.classList.contains('resize-handle')) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.isLongPressing = false;

    const mouseup = fromEvent(document, 'mouseup');
    this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup());

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPressStart.emit({
        event,
        model: this.pressModel
      });

      this.subscription.add(
        fromEvent(document, 'mousemove')
          .pipe(takeUntil(mouseup))
          .subscribe((mouseEvent: MouseEvent) => this.onMouseMove(mouseEvent))
      );

      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.pressing && !this.isLongPressing) {
      const xThres = Math.abs(event.clientX - this.mouseX) > 10;
      const yThres = Math.abs(event.clientY - this.mouseY) > 10;

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event: MouseEvent): void {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit({
          event,
          model: this.pressModel
        });
        this.loop(event);
      }, 50);
    }
  }

  endPress(): void {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
    this._destroySubscription();

    this.longPressEnd.emit({
      model: this.pressModel
    });
  }

  onMouseup(): void {
    this.endPress();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
    this._destroySubscription();
  }

  private _destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
