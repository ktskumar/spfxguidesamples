import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ManageListsWebPartStrings';
import ManageLists from './components/ManageLists';
import { IManageListsProps } from './components/IManageListsProps';
import   MockupDataProvider  from './dataproviders/MockupDataProvider';

export interface IManageListsWebPartProps {
  description: string;
}

export default class ManageListsWebPart extends BaseClientSideWebPart<IManageListsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IManageListsProps > = React.createElement(
      ManageLists,
      {
        provider: new MockupDataProvider()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
