/**
 * @file Santd tabs docs file
 **/
import san from 'san';
import Icon from './icon.md';

export default san.defineComponent({
    components: {
        icon: Icon
    },
    template: `
        <div>
            <icon/>
        </div>
    `
});
