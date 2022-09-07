import {ReactNode} from 'react';

export interface ILayout {
  children: ReactNode;
  isOverlay: boolean;
  headerLeftType: 'Back' | 'Home' | 'None';
  headerRightType: 'Add' | 'Delete' | 'None';
  navigation: any;
  isHeader: boolean;
  Loading?: boolean;
}

export interface IHeader {
  headerLeftType: 'Back' | 'Home' | 'None';
  headerRightType: 'Add' | 'Delete' | 'None';
  navigation: any;
}

export interface IPassword {
  id: string;
  type: string;
  url: string;
  password: string;
  createdAt: string;
}
