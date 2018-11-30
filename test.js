import hukam from './src';

describe('pull Hukam', () => {
  it('should return an object', async () => {
    const { ang } = await hukam();
    expect(ang)
      .toBeGreaterThan(1);
    expect(ang)
      .toBeLessThan(1430);
  });
});
