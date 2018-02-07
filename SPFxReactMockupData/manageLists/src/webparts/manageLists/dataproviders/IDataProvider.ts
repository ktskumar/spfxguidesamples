import { IList } from './../common/IObjects';
export interface IDataProvider {
    getAllLists(): Promise<IList[]>;
}
