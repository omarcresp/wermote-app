import { Component, Input } from '@angular/core';

export type TButtonStyles =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'link';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() bStyle!: TButtonStyles;
  @Input() icon!: string;

  public buttonStyles: Record<TButtonStyles, string> = {
    primary: 'bg-weco-400 text-weco-700 shadow-sm shadow-black text-lg font-semibold',
    secondary: 'bg-weco-600 text-weco-400 shadow-sm shadow-black text-lg font-semibold',
    tertiary: 'bg-neutral-100 text-neutral-500 shadow-sm shadow-black text-lg font-semibold',
    ghost: 'text-weco-700 border-neutral-500 text-lg border',
    link: 'text-neutral-500 underline',
  };
  public iconStyles: Record<TButtonStyles, string> = {
    primary: '',
    secondary: '',
    tertiary: '',
    ghost: 'text-neutral-500 border-neutral-500',
    link: '',
  };
  public baseStyles = 'rounded h-14 w-full pl-3 pr-2 flex items-center'.split(' ')
  public baseIconStyles = 'border-r text-3xl pr-2 h-9 flex items-center'.split(' ')

  get selectedStyles() {
    const styles = this.buttonStyles[this.bStyle] ?? this.buttonStyles.primary;

    return styles.split(' ')
  }

  get selectedIconStyles() {
    const styles = this.iconStyles[this.bStyle] ?? this.iconStyles.primary;

    return styles.split(' ')
  }
}
