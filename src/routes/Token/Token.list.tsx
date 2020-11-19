import React from 'react';
import { ISelectedPrivacy } from './Token.interface';

interface IProps {
  data: any[];
  visible: boolean;
  renderItem: (token: ISelectedPrivacy) => any;
}

const ListToken = (props: IProps) => {
  const { data, visible, renderItem } = props;
  if (!visible || data.length === 0) {
    return null;
  }
  return (
    <div className='list-token'>
      {data.map((token: ISelectedPrivacy) => renderItem(token))}
    </div>
  );
};

export default React.memo(ListToken);
