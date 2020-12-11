export interface ICategory {
    createdAt: string;
    deletedAt: string;
    desc: string;
    id: number;
    sortId: number;
    title: string;
    updatedAt: string;
    buttons: any[];
  }
  
  export interface ICategoryItem {
    appGroupId: number;
    createdAt: string;
    deletedAt: string;
    desc: string;
    icoUrl: string;
    id: number;
    key: string;
    message: string;
    route: string;
    sortId: number;
    title: string;
    toolTip: any;
    updatedAt: string;
  }