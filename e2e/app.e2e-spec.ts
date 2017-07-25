import { HenriPotierPage } from './app.po';

describe('henri-potier App', () => {
  let page: HenriPotierPage;

  beforeEach(() => {
    page = new HenriPotierPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
