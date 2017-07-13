import { SpikesNgComponentsDemoPage } from './app.po';

describe('spikes-ng-components-demo App', () => {
  let page: SpikesNgComponentsDemoPage;

  beforeEach(() => {
    page = new SpikesNgComponentsDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
