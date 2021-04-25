import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Popconfirm, message } from 'antd';
import {
  AimOutlined,
  DeploymentUnitOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  ProfileOutlined,
  SlackOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { history, Link } from 'umi';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { MenuItem } from '@/types';
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
  { key: '2', title: '菜单2', icon: <AimOutlined />, url: '/second', type: 'page' },
  {
    key: '3',
    title: '菜单3',
    icon: <SlackOutlined />,
    type: 'list',
    subs: [
      {
        key: '4',
        parent: '3',
        title: '菜单4',
        icon: <ProfileOutlined />,
        url: '/three',
        type: 'page',
      },
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
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const getCurrentMenu = (str: string): MenuItem | null => {
    let curr = null;
    const dfs = (subs: MenuItem[]) => {
      for (const m of subs) {
        if (m.url === str || m.key === str) {
          curr = m;
          break;
        }
        if (m.subs) {
          dfs(m.subs);
        }
      }
    };
    dfs(menus);
    return curr;
  };

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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleOpen = (openKeys: any) => {
    setOpenKeys(openKeys);
  };

  const createBreadcrumb = () => {
    const currentMenu = getCurrentMenu(pathname);
    const parentMenu =
      currentMenu && currentMenu.parent ? getCurrentMenu(currentMenu.parent) : null;

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        {parentMenu && <Breadcrumb.Item>{parentMenu.title}</Breadcrumb.Item>}
        {currentMenu && <Breadcrumb.Item>{currentMenu.title}</Breadcrumb.Item>}
      </Breadcrumb>
    );
  };

  return (
    <Layout>
      <Header>
        <div className={styles.info}>
          <div className={styles.logo}>LOGO</div>
          <div className={styles.info}>
            <Popconfirm
              placement="bottomRight"
              title={'确认注销登陆?'}
              onConfirm={signOut}
              okText="确定"
              cancelText="取消"
            >
              <div className={styles.avatar}>
                <UserSwitchOutlined />
              </div>
            </Popconfirm>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsedWidth={60}
          collapsible
          collapsed={collapsed}
          style={{ position: 'relative' }}
        >
          <Menu
            mode="inline"
            onOpenChange={handleOpen}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menus.map((menu: MenuItem) =>
              menu.subs && menu.subs.length ? (
                <Menu.SubMenu
                  key={menu.key}
                  icon={menu.icon || null}
                  title={<span>{menu.title}</span>}
                >
                  {generateSubmenu(menu.key)}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={menu.key} icon={menu.icon || null} onClick={() => onRedirect(menu)}>
                  <span>{menu.title}</span>
                </Menu.Item>
              ),
            )}
          </Menu>
          <div className={styles.trigger} onClick={toggle}>
            {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </div>
        </Sider>
        <Layout style={{ padding: '0 24px' }}>
          {createBreadcrumb()}
          <Content className={styles.content}>{children}</Content>
          <Footer style={{ textAlign: 'center', fontSize: 13, padding: 18 }}>
            © 2021 XXXXX有限公司. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default connect(({ user, loading }: any) => ({
  user,
  fetchingSignOut: loading.effects['user/signOut'],
}))(BasicLayout);
