import * as React from 'react';
import styles from './ManageLists.module.scss';
import { IManageListsProps } from './IManageListsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import IManageListsState from './IManageListsState';
import { IDataProvider } from './../dataproviders/IDataProvider';
import { IList } from './../common/IObjects';

export default class ManageLists extends React.Component<IManageListsProps, IManageListsState> {
  
  constructor(props: IManageListsProps) {
    super(props);
    this.state = {
      lists: []
    };
  }

  public componentDidMount() {
    this.props.provider.getAllLists().then((_lists: IList[]) => {
      this.setState({
        lists: _lists
      });
    });
  }

  public render(): React.ReactElement<IManageListsProps> {    
    return (
      <div className={styles.manageLists}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Total Lists: {escape(this.state.lists.length.toString())}</span>
              { this.state.lists.map(function(item,key){  
              return(<p key={key} className={styles.description}>{item.Title} ({item.Id})</p>);
              })}              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
