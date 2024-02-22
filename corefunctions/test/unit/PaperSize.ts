import { expect } from 'chai';
import { PaperSize } from '../../src/internal';

describe('PaperSize', () => {

    it('can be initialized', () => {
        const width = '100';
        const height = '150';

        const paperSize = new PaperSize(width, height);

        expect(paperSize.width).to.equal(width);
        expect(paperSize.height).to.equal(height);
    });
});