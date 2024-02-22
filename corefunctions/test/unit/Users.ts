import { expect } from 'chai';
import { Users } from '../../src/internal';

describe('Users', () => {

    it('can be initialized', () => {
        const signature = 'Signature';
        const disName = 'Sam';
        const layer = 10;
        const color = 'red';

        const user = new Users(signature, disName, layer, color);

        expect(user.Signature).to.equal(signature);
        expect(user.DisplayName).to.equal(disName);
        expect(user.Layer).to.equal(layer);
        expect(user.Color).to.equal(color);
    });
});