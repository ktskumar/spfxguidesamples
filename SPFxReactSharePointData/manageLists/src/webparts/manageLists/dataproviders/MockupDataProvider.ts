import { IList } from './../common/IObjects';
import { IDataProvider } from './IDataProvider';

export default class MockupDataProvider implements IDataProvider {
    constructor() {
    }

    public getAllLists(): Promise<IList[]> {
        let _items: IList[];
        //Initiate mockup values to the IList[] object
        _items = [
            {
                Title: 'List Name 1',
                Id: '1'
            },
            {
                Title: 'List Name 2',
                Id: '2'
            },
            {
                Title: 'List Name 3',
                Id: '3'
            },
            {
                Title: 'List Name 4',
                Id: '4'
            },
            {
                Title: 'List Name 5',
                Id: '5'
            }
        ];

        //Returns the mockup data 
        return new Promise<IList[]>((resolve) => {
            setTimeout(() => {
                resolve(_items);
            }, 2000);
        });
    }
}