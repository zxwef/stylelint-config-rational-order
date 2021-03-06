const stylelint = require('stylelint');
const config = require('.');

const wrong = `
  a {
    position: relative;
    color: red;
    display: block;
    border: 1px solid blue;
    background: white;
  }
`;
const correct = `
  a {
    position: relative;
    display: block;
    color: red;
    background: white;
    border: 1px solid blue;
  }
`;

test('wrong order', () =>
  stylelint
    .lint({
      code: wrong,
      config,
    })
    .then(output => {
      const { errored } = output;
      const { warnings } = output.results[0];
      const expectedWarnings = [
        'Expected "display" to come before "color" (order/properties-order)',
        'Expected "background" to come before "border" (order/properties-order)',
      ];
      expect(errored).toBeTruthy();
      warnings.forEach(({ text }, idx) => {
        expect(text).toEqual(expect.stringContaining(expectedWarnings[idx]));
      });
    }));

test('correct order', () =>
  stylelint
    .lint({
      code: correct,
      config,
    })
    .then(output => {
      const { errored } = output;
      const { warnings } = output.results[0];
      expect(errored).toBeFalsy();
      expect(warnings).toHaveLength(0);
    }));
