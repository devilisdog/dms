import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, SelectLang, useIntl, connect } from 'umi'
import React from 'react'
import logo from '../assets/img/logo.png'
import bg from '../assets/img/bg.jpg'
import styles from './UserLayout.less'

const UserLayout = props => {
    const {
        route = {
            routes: [],
        },
    } = props
    const { routes = [] } = route
    const {
        children = {},
        location = {
            pathname: '',
        },
    } = props
    const { formatMessage } = useIntl()
    const { breadcrumb } = getMenuData(routes)
    const title = getPageTitle({
        pathname: location.pathname,
        formatMessage,
        breadcrumb,
        ...props,
    })
    return (
        <HelmetProvider>
            {/* <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet> */}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundImage: 'url("' + bg + '")',
                        backgroundSize: '100% 100%',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                        }}
                        className={styles.form_box}
                    >
                        <div style={{ textAlign: 'center', paddingTop: '12px' }}>
                            <div style={{ fontSize: '20px', fontWeight: '600' }}>凯旋DMS快捷接车子系统</div>
                            <img alt="logo" src={logo} />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default connect(({ settings }) => ({ ...settings }))(UserLayout)
