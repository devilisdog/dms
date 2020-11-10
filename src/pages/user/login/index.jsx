import { Alert, Checkbox } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link, connect } from 'umi'
import LoginForm from './components/Login'

import request from '@/utils/request'

import styles from './style.less'
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm

const LoginMessage = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
)

const Login = props => {
    const { userLogin = {}, submitting } = props
    const { status, type: loginType } = userLogin
    const [autoLogin, setAutoLogin] = useState(false)

    const [type, setType] = useState('account')

    useEffect(() => {
        const napw = JSON.parse(localStorage.getItem('napw'))
        if (napw) {
            setAutoLogin(true)
        }
    }, [])

    const handleSubmit = values => {
        const params = {
            ...values,
        }

        request('/v1/login', {
            method: 'POST',
            data: params,
        })
            .then(res => {
                if (autoLogin) {
                    localStorage.setItem('napw', JSON.stringify(values))
                    localStorage.setItem('autoLogin', autoLogin)
                }

                localStorage.setItem('token', res?.data?.token)
                localStorage.setItem('user', JSON.stringify(res?.data?.user))
                props.history.push('/buildOrder')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className={styles.main}>
            <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit} autoLogin={autoLogin}>
                <Tab key="account" tab="">
                    {status === 'error' && loginType === 'account' && !submitting && <LoginMessage content="账户或密码错误" />}

                    <UserName
                        name="gh"
                        placeholder="用户名:"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <Password
                        name="pwd"
                        placeholder="密码:"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </Tab>
                {/* <Tab key="mobile" tab="手机号登录">
          {status === "error" && loginType === "mobile" && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: "请输入手机号！",
              },
              {
                pattern: /^1\d{10}$/,
                message: "手机号格式错误！",
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: "请输入验证码！",
              },
            ]}
          />
        </Tab> */}
                <div>
                    <Checkbox
                        checked={autoLogin}
                        onChange={e => {
                            setAutoLogin(e.target.checked)
                        }}
                    >
                        记住密码
                    </Checkbox>
                    {/* <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a> */}
                </div>
                <Submit loading={submitting}>登录</Submit>
            </LoginForm>
        </div>
    )
}

export default connect(({ login, loading }) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
}))(Login)
