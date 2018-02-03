import { D3jsTrainingPage } from './app.po';

describe('d3js-training App', () => {
  let page: D3jsTrainingPage;

  beforeEach(() => {
    page = new D3jsTrainingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
