
## 绝对定位 + margin-top;
1. 容器绝对定位，设置top值为50%，margin-top的值为容器高度一半的负数。
2. 前提：必须知道DIV的高度
3. 优点：适用于所有浏览器，不需要嵌套标签

        <div class=”content”></div>

        .content {
            position:absolute;
            top:50%;
            height:200px;
            margin-top:-100px; /* 容器高度的一半 */
        }

## 将display设为table;利用table的vertical-align属性实现。
1. 优点：content容器的高度不需要预先知道，高度可随意变化

        <div id="wrapper">
            <div id="cell">
            <div class="content"></div>
            </div>
        </div>
        #wrapper {display:table;}
        #cell {display:table-cell; vertical-align:middle;}


