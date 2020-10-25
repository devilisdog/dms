import React from 'react';
import { SiderMenuProps, PrivateSiderMenuProps } from '../SiderMenu/SiderMenu';
import './index.less';
import { GlobalHeaderProps } from '../GlobalHeader';
export declare type TopNavHeaderProps = SiderMenuProps & GlobalHeaderProps & PrivateSiderMenuProps & {};
declare const TopNavHeader: React.FC<TopNavHeaderProps>;
export default TopNavHeader;
