import { YfClientPage } from './app.po';

describe('yf-client App', () => {
  let page: YfClientPage;

  beforeEach(() => {
    page = new YfClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
