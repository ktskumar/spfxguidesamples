import { IList } from './../common/IObjects';
import { IDataProvider } from './IDataProvider';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

export default class SharePointDataProvider implements IDataProvider{

    private _webPartContext: IWebPartContext;    
    private _webAbsoluteUrl: string;

    constructor(_context: IWebPartContext){
        this._webPartContext = _context;
        this._webAbsoluteUrl = _context.pageContext.web.absoluteUrl;
    }

    public getAllLists(): Promise<IList[]>{   
        let _items: IList[];
        
        return this._webPartContext.spHttpClient.get(this._webAbsoluteUrl+"/_api/web/lists",SPHttpClient.configurations.v1).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{
            //Add Each list to _items array from retrived json
            _items =[];            
            if(data){
                for(let i=0; i< data.value.length; i++){
                    let item = data.value[i];
                    var lst: IList ={
                        Title: item.Title,
                        Id: item.Id
                    }
                    _items.push(lst);
                }
            }

            return _items;
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }
}