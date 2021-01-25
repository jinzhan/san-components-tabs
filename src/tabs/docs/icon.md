<text lang="cn">
#### 图标
有图标的标签。
</text>

```html
<template>
    <div>
    {{haha2}}
        <s-tabs defaultActiveKey="1">
            <s-tabpane key="1">
                <template slot="tab">
                    <s-icon type="apple" on-click="testClick" />Tab 1
                    <div on-click="testClick" style="color: red">hahah - {{haha2}}</div>
                </template>
                <div>
                    tab content is here!
                </div>
            </s-tabpane>
            <s-tabpane key="2">
                <template slot="tab">
                    <s-icon type="android" />Tab 2
                </template>
                Tab 2
            </s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import san from 'san';
import tabs from 'santd/tabs';
import icon from 'santd/icon';

export default {
    components: {
        's-tabs': tabs,
        's-tabpane': tabs.TabPane,
        's-icon': icon
    },
    initData() {
        return {
            haha: 'ha',
            haha2: 'ha2',
        };
    },
    testClick() {
        console.log('test click outside');
    }
}
</script>
```
