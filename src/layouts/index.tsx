import React, { useEffect, useState } from 'react';
import { Layout, Menu, message } from 'antd';
import {
  AimOutlined,
  DeploymentUnitOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  ProfileOutlined,
  SlackOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { MenuItem } from '@/types';

import avatar from '@/assets/images/default-avatar.png';
import styles from './index.less';

interface BasicLayoutProps {
  user?: {
    info?: { username: string; head_img: string };
  };
  dispatch: Dispatch;
  children: React.ReactElement;
  location: {
    pathname: string;
  };
  fetchingSignOut: boolean;
}

const menus: MenuItem[] = [
  { key: '1', title: '菜单1', icon: <DeploymentUnitOutlined />, url: '/', type: 'page' },
  { key: '2', title: '菜单2', icon: <AimOutlined />, url: '/', type: 'page' },
  {
    key: '3',
    title: '菜单3',
    icon: <SlackOutlined />,
    type: 'list',
    subs: [
      { key: '4', title: '菜单4', icon: <ProfileOutlined />, url: '/', type: 'page' },
      { key: '5', title: '菜单5', icon: <SettingOutlined />, url: '/', type: 'page' },
    ],
  },
];

const { Header, Sider, Content, Footer } = Layout;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    user,
    dispatch,
    children,
    location: { pathname },
  } = props;
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);

  useEffect(() => {
    if (!user?.info) {
      dispatch({
        type: 'user/info',
      });
    }
  }, [dispatch, user?.info]);

  useEffect(() => {
    const currentMenu = menus.filter((menu) => menu.url === pathname);
    currentMenu.length > 0 ? setSelectedKeys([currentMenu[0].key]) : setSelectedKeys(['1']);
  }, [pathname]);

  const onRedirect = (menu: MenuItem) => {
    if (menu.url) {
      setSelectedKeys([menu.key]);
      history.push(menu.url);
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const signOut = () => {
    dispatch({
      type: 'user/signOut',
      callback: (response: any) => {
        const { code, msg } = response;
        if (code === 1) {
          message.info('注销成功!');
          history.push('/login');
        } else {
          message.error(msg);
        }
      },
    });
  };

  const generateSubmenu = (key: string) => {
    const menuItems = menus.filter((item: MenuItem) => item.key === key);
    if (menuItems.length > 0 && menuItems[0]?.subs && menuItems[0].subs.length > 0) {
      return menuItems[0].subs.map((menu: MenuItem) => (
        <Menu.Item key={menu.key} icon={menu.icon} onClick={() => onRedirect(menu)}>
          {menu.title}
        </Menu.Item>
      ));
    } else {
      return null;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>{collapsed ? '管理' : '管理系统'}</div>
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          {menus.map((menu: MenuItem) =>
            menu.type === 'list' ? (
              <Menu.SubMenu key={menu.key} icon={menu.icon} title={<span>{menu.title}</span>}>
                {generateSubmenu(menu.key)}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={menu.key} icon={menu.icon} onClick={() => onRedirect(menu)}>
                <span>{menu.title}</span>
              </Menu.Item>
            ),
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles.trigger,
            onClick: toggle,
          })}
          <div className={styles.info}>
            <span>Hi， {user?.info?.username} 欢迎回来</span>
            <span onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <img src={user?.info?.head_img || avatar} alt="用户头像" />
            </span>
            <ul
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              className={styles.dropdown}
              style={{ display: dropdown ? 'block' : 'none' }}
            >
              <li onClick={signOut}>
                <PoweroffOutlined /> 退出登录
              </li>
            </ul>
          </div>
        </Header>
        <Content className={styles.content}>{children}</Content>
        <Footer style={{ textAlign: 'center', fontSize: 14 }}>
          © 2021 XXXX有限公司. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default connect(({ user, loading }: any) => ({
  user,
  fetchingSignOut: loading.effects['user/signOut'],
}))(BasicLayout);
