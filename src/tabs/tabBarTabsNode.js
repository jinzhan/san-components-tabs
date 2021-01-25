/**
 * @file Santd tabs tab bar tabs node file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Icon from '../icon';
import {isVertical} from './utils';
import {classCreator} from '../core/util';

const prefixCls = classCreator('tabs')();

const CustomTab = san.defineComponent({
    inited() {
        const slot = this.data.get('slot');
        console.log('this.scope:', this.scope);
        // this.parent = this.data.get('parent');
        this.sourceSlots.named.tab = slot; // this.data.get('slot');
        
        console.log('this.sourceSlots.named.tab:', this.sourceSlots.named.tab);
    },
    testClick() {
        console.log('innner ... testClick')
    },
    template: '<span><slot name="tab" /></span>'
});

export default san.defineComponent({
    computed: {
        tabBars() {
            let tabBarData = this.data.get('tabBarData') || [];
            const tabBarGutter = this.data.get('tabBarGutter');
            const tabBarPosition = this.data.get('tabBarPosition');
            const tabPanes = this.data.get('tabPanes') || [];

            return tabBarData.map((tabBar, index) => {
                const gutter = tabBarGutter && index === tabBarData.length - 1 ? 0 : tabBarGutter;
                const style = gutter !== undefined && {[isVertical(tabBarPosition) ? 'margin-bottom' : 'margin-right']: gutter + 'px'};
                let classArr = [`${prefixCls}-tab`];
                // 获取parent节点
                let slot = tabPanes[index] && tabPanes[index].sourceSlots.named.tab || null;
                console.log({slot});

                let closeIcon = tabPanes[index] && tabPanes[index].sourceSlots.named.closeIcon || null;
                tabBar.active && classArr.push(`${prefixCls}-tab-active`);
                tabBar.disabled && classArr.push(`${prefixCls}-tab-disabled`);

                return {
                    ...tabBar,
                    slot,
                    closeIcon,
                    classes: classArr,
                    style
                };
            });
        }
    },
    handleTabClick(e, key, disabled) {
        if (disabled) {
            return;
        }
        this.fire('tabClick', {key, e});
    },
    handleRemoveTab(key, e) {
        e.stopPropagation();
        this.fire('removeTab', {key, e});
    },
    attached() {
        this.dispatch('santd_tabs_addRef', {
            name: 'navTabsContainer',
            ref: this.el
        });
    },
    components: {
        's-icon': Icon,
        's-customtab': CustomTab
    },
    template: `
        <div>
            <div
                s-for="tabBar, index in tabBars trackBy index"
                role="tab"
                aria-disabled="{{tabBar.disabled ? true : false}}"
                aria-selected="{{tabBar.active ? true : false}}"
                class="{{tabBar.classes}}"
                index="{{index}}"
                style="{{tabBar.style}}"
                on-click="handleTabClick($event, tabBar.key, tabBar.disabled)"
            >
                <template>
                    <template s-if="tabBar.slot">
                        <s-customtab 
                        parent="{{tabBar}}"
                        slot="{{tabBar.slot}}" />
                    </template>
                    <template s-else>
                        {{tabBar.tab}}
                    </template>
                </template>
            </div>
        </div>
    `
});
