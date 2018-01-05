import { SpeedDialItem } from './speed-dial-item';

describe('SpeedDialComponent', () => {
  let item: SpeedDialItem;

  beforeEach(() => {
    item = new SpeedDialItem('add', 'add');
  });

  it('should create', () => {
    expect(item).toBeTruthy();
    expect(item.name).toEqual('add');
  });

  it('should set isMatIcon', () => {
    expect(item).toBeTruthy();
    expect(item.isMatIcon).toBeTruthy();
  });

  it('should set svgIcons', () => {
    const svgIconName = 'campagin';
    const svgItem = new SpeedDialItem('add', undefined, true, svgIconName);
    expect(svgItem).toBeDefined();
    expect(svgItem.name).toEqual('add');
    expect(svgItem.isMatIcon).toBeFalsy();
    expect(svgItem.svgIconName).toEqual(svgIconName);
  });

});
