import { googleMapsLoad } from '../googleMapAPI';
import * as googleMapService from '../googleMapAPI';

it('check google api is returing google object', async () => {

    const google = {
        maps: 'googlemap' 
    }
    const spy = jest.spyOn(googleMapService, 'googleMapsLoad');
    
    spy.mockImplementation(() => {
        return Promise.resolve(google);
    })

    const mapOb = await googleMapsLoad();
    expect(mapOb.map).toBe(google.map);
    spy.mockRestore();

})
