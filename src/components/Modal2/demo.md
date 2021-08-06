
### 参数说明

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| component | 组件 | class | - |
| title | 弹窗标题 | String | - |
| visible | 是否弹出弹窗 | Bool | true |
| handleOk | 点击确定回调 | Function | Function(event) |
| handleCancel | 取消触发回调函数 | Function | Function() |
| width | 弹窗宽度 | number | 520 |

### 引入

```

import React, { Component } from 'react';
import Modal from '../components/Modal2';

```

### 组件

```

class App extends Component {

    state = {
        visible: false
    }

    // 点击确定回调
    handleOk = (e) => {
        (e);
    }

    // 打开弹窗
    showModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    // 取消
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    }

    render() {
        const { visible } = this.props;
        return (
            <div>
                <span onClick={() => this.showModal('visible')}>编辑</span>
                <Modal2
                    component={(<AddEdit item={item} ref="form" />)}
                    title="编辑词库"
                    visible={addVisible}
                    handleOk={this.handleOk}
                    handleCancel={() => this.handleCancel('addVisible')}
                    handleCancel={() => this.handleCancel('addVisible')}
                />
            </div>
            
        );
    }
}

export default App;

```