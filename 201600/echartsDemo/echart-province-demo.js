/**
 * Created by huzhongchun on 16/7/22.
 */

app.title = '34 省切换查看';

var provinces = ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];
var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

function showProvince() {
    var name = provinces[currentIdx];

    // myChart.showLoading();

    $.get('vendors/echarts/map/json/province/' + name + '.json', function (geoJson) {

        // myChart.hideLoading();

        echarts.registerMap(name, geoJson);

        myChart.setOption(option = {
            backgroundColor: '#404a59',
            title: {
                text: provincesText[currentIdx],
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                show: true,
                map: 'province',
                roam: true,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#111',
                        areaColor: '#323c48',
                    },
                    emphasis: {
                        areaColor: '#F5EB00',
                        borderWidth: 0
                    }
                },
            },
            series: [
                {
                    type: 'map',
                    mapType: name,
                    selectedMode: 'multiple',
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#000'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#111',
                            areaColor: '#323c48',
                        },
                        emphasis: {
                            areaColor: '#F5EB00',
                            borderWidth: 0
                        }
                    },
                    animation: false,
                    // animationDurationUpdate: 1000,
                    // animationEasingUpdate: 'quinticInOut'
                    data: [{"name":"浦东新区","selected":true},{"name":"徐汇区","selected":true},{"name":"闵行区","selected":true},{"name":"黄浦区","selected":true},{"name":"杨浦区","selected":true},{"name":"长宁区","selected":true},{"name":"静安区","selected":true},{"name":"普陀区","selected":true},{"name":"虹口区","selected":true},{"name":"闸北区","selected":true},{"name":"松江区","selected":true},{"name":"宝山区","selected":true},{"name":"嘉定区","selected":true},{"name":"青浦区","selected":true},{"name":"奉贤区","selected":true},{"name":"卢湾区","selected":true},{"name":"金山区","selected":true},{"name":"南汇区","selected":true},{"name":"昆明市","selected":true},{"name":"大理白族自治州","selected":true},{"name":"曲靖市","selected":true},{"name":"丽江市","selected":true},{"name":"西双版纳傣族自治州","selected":true},{"name":"玉溪市","selected":true},{"name":"红河哈尼族彝族自治州","selected":true},{"name":"保山市","selected":true},{"name":"怒江傈僳族自治州","selected":true},{"name":"普洱市","selected":true},{"name":"文山壮族苗族自治州","selected":true},{"name":"昭通市","selected":true},{"name":"德宏傣族景颇族自治州","selected":true},{"name":"呼和浩特市","selected":true},{"name":"包头市","selected":true},{"name":"巴彦淖尔市","selected":true},{"name":"赤峰市","selected":true},{"name":"乌兰察布市","selected":true},{"name":"呼伦贝尔市","selected":true},{"name":"通辽市","selected":true},{"name":"鄂尔多斯市","selected":true},{"name":"兴安盟","selected":true},{"name":"乌海市","selected":true},{"name":"锡林郭勒盟","selected":true},{"name":"朝阳区","selected":true},{"name":"海淀区","selected":true},{"name":"东城区","selected":true},{"name":"西城区","selected":true},{"name":"丰台区","selected":true},{"name":"昌平区","selected":true},{"name":"通州区","selected":true},{"name":"大兴区","selected":true},{"name":"顺义区","selected":true},{"name":"石景山区","selected":true},{"name":"房山区","selected":true},{"name":"门头沟区","selected":true},{"name":"怀柔区","selected":true},{"name":"平谷区","selected":true},{"name":"延庆县","selected":true},{"name":"四平市","selected":true},{"name":"长春市","selected":true},{"name":"吉林市","selected":true},{"name":"辽源市","selected":true},{"name":"延边朝鲜族自治州","selected":true},{"name":"松原市","selected":true},{"name":"白山市","selected":true},{"name":"通化市","selected":true},{"name":"成都市","selected":true},{"name":"眉山市","selected":true},{"name":"南充市","selected":true},{"name":"绵阳市","selected":true},{"name":"宜宾市","selected":true},{"name":"德阳市","selected":true},{"name":"资阳市","selected":true},{"name":"凉山彝族自治州","selected":true},{"name":"达州市","selected":true},{"name":"攀枝花市","selected":true},{"name":"泸州市","selected":true},{"name":"自贡市","selected":true},{"name":"乐山市","selected":true},{"name":"甘孜藏族自治州","selected":true},{"name":"巴中市","selected":true},{"name":"内江市","selected":true},{"name":"遂宁市","selected":true},{"name":"南开区","selected":true},{"name":"和平区","selected":true},{"name":"河西区","selected":true},{"name":"西青区","selected":true},{"name":"河东区","selected":true},{"name":"滨海新区","selected":true},{"name":"河北区","selected":true},{"name":"东丽区","selected":true},{"name":"津南区","selected":true},{"name":"塘沽区","selected":true},{"name":"宝坻区","selected":true},{"name":"北辰区","selected":true},{"name":"红桥区","selected":true},{"name":"武清区","selected":true},{"name":"汉沽区","selected":true},{"name":"蓟县","selected":true},{"name":"银川市","selected":true},{"name":"中卫市","selected":true},{"name":"固原市","selected":true},{"name":"合肥市","selected":true},{"name":"芜湖市","selected":true},{"name":"安庆市","selected":true},{"name":"蚌埠市","selected":true},{"name":"池州市","selected":true},{"name":"宣城市","selected":true},{"name":"六安市","selected":true},{"name":"滁州市","selected":true},{"name":"铜陵市","selected":true},{"name":"黄山市","selected":true},{"name":"阜阳市","selected":true},{"name":"淮北市","selected":true},{"name":"淮南市","selected":true},{"name":"亳州市","selected":true},{"name":"宿州市","selected":true},{"name":"马鞍山市","selected":true},{"name":"济南市","selected":true},{"name":"烟台市","selected":true},{"name":"临沂市","selected":true},{"name":"青岛市","selected":true},{"name":"淄博市","selected":true},{"name":"威海市","selected":true},{"name":"东营市","selected":true},{"name":"潍坊市","selected":true},{"name":"菏泽市","selected":true},{"name":"泰安市","selected":true},{"name":"滨州市","selected":true},{"name":"日照市","selected":true},{"name":"聊城市","selected":true},{"name":"枣庄市","selected":true},{"name":"德州市","selected":true},{"name":"莱芜市","selected":true},{"name":"济宁市","selected":true},{"name":"太原市","selected":true},{"name":"大同市","selected":true},{"name":"忻州市","selected":true},{"name":"临汾市","selected":true},{"name":"朔州市","selected":true},{"name":"吕梁市","selected":true},{"name":"运城市","selected":true},{"name":"晋中市","selected":true},{"name":"长治市","selected":true},{"name":"晋城市","selected":true},{"name":"广州市","selected":true},{"name":"深圳市","selected":true},{"name":"珠海市","selected":true},{"name":"佛山市","selected":true},{"name":"惠州市","selected":true},{"name":"东莞市","selected":true},{"name":"中山市","selected":true},{"name":"汕头市","selected":true},{"name":"揭阳市","selected":true},{"name":"汕尾市","selected":true},{"name":"江门市","selected":true},{"name":"阳江市","selected":true},{"name":"湛江市","selected":true},{"name":"清远市","selected":true},{"name":"河源市","selected":true},{"name":"韶关市","selected":true},{"name":"云浮市","selected":true},{"name":"潮州市","selected":true},{"name":"肇庆市","selected":true},{"name":"梅州市","selected":true},{"name":"茂名市","selected":true},{"name":"南宁市","selected":true},{"name":"柳州市","selected":true},{"name":"钦州市","selected":true},{"name":"桂林市","selected":true},{"name":"玉林市","selected":true},{"name":"北海市","selected":true},{"name":"梧州市","selected":true},{"name":"百色市","selected":true},{"name":"贺州市","selected":true},{"name":"河池市","selected":true},{"name":"贵港市","selected":true},{"name":"乌鲁木齐市","selected":true},{"name":"自治区直辖县级行政区划","selected":true},{"name":"伊犁哈萨克自治州","selected":true},{"name":"阿克苏地区","selected":true},{"name":"昌吉回族自治州","selected":true},{"name":"哈密地区","selected":true},{"name":"克拉玛依市","selected":true},{"name":"巴音郭楞蒙古自治州","selected":true},{"name":"喀什地区","selected":true},{"name":"博尔塔拉蒙古自治州","selected":true},{"name":"塔城地区","selected":true},{"name":"南京市","selected":true},{"name":"苏州市","selected":true},{"name":"南通市","selected":true},{"name":"镇江市","selected":true},{"name":"泰州市","selected":true},{"name":"常州市","selected":true},{"name":"无锡市","selected":true},{"name":"扬州市","selected":true},{"name":"徐州市","selected":true},{"name":"连云港市","selected":true},{"name":"淮安市","selected":true},{"name":"盐城市","selected":true},{"name":"宿迁市","selected":true},{"name":"南昌市","selected":true},{"name":"赣州市","selected":true},{"name":"宜春市","selected":true},{"name":"九江市","selected":true},{"name":"抚州市","selected":true},{"name":"吉安市","selected":true},{"name":"新余市","selected":true},{"name":"萍乡市","selected":true},{"name":"鹰潭市","selected":true},{"name":"景德镇市","selected":true},{"name":"上饶市","selected":true},{"name":"石家庄市","selected":true},{"name":"秦皇岛市","selected":true},{"name":"唐山市","selected":true},{"name":"张家口市","selected":true},{"name":"廊坊市","selected":true},{"name":"保定市","selected":true},{"name":"沧州市","selected":true},{"name":"邯郸市","selected":true},{"name":"衡水市","selected":true},{"name":"承德市","selected":true},{"name":"邢台市","selected":true},{"name":"郑州市","selected":true},{"name":"安阳市","selected":true},{"name":"洛阳市","selected":true},{"name":"濮阳市","selected":true},{"name":"许昌市","selected":true},{"name":"省直辖县级行政区划","selected":true},{"name":"开封市","selected":true},{"name":"驻马店市","selected":true},{"name":"南阳市","selected":true},{"name":"三门峡市","selected":true},{"name":"新乡市","selected":true},{"name":"漯河市","selected":true},{"name":"焦作市","selected":true},{"name":"信阳市","selected":true},{"name":"商丘市","selected":true},{"name":"平顶山市","selected":true},{"name":"周口市","selected":true},{"name":"杭州市","selected":true},{"name":"宁波市","selected":true},{"name":"温州市","selected":true},{"name":"金华市","selected":true},{"name":"嘉兴市","selected":true},{"name":"绍兴市","selected":true},{"name":"衢州市","selected":true},{"name":"湖州市","selected":true},{"name":"台州市","selected":true},{"name":"舟山市","selected":true},{"name":"丽水市","selected":true},{"name":"海口市","selected":true},{"name":"三亚市","selected":true},{"name":"省直辖县级行政区划","selected":true},{"name":"武汉市","selected":true},{"name":"襄阳市","selected":true},{"name":"咸宁市","selected":true},{"name":"黄石市","selected":true},{"name":"随州市","selected":true},{"name":"宜昌市","selected":true},{"name":"恩施土家族苗族自治州","selected":true},{"name":"鄂州市","selected":true},{"name":"荆州市","selected":true},{"name":"十堰市","selected":true},{"name":"黄冈市","selected":true},{"name":"省直辖县级行政区划","selected":true},{"name":"孝感市","selected":true},{"name":"荆门市","selected":true},{"name":"长沙市","selected":true},{"name":"常德市","selected":true},{"name":"湘潭市","selected":true},{"name":"岳阳市","selected":true},{"name":"湘西土家族苗族自治州","selected":true},{"name":"益阳市","selected":true},{"name":"株洲市","selected":true},{"name":"郴州市","selected":true},{"name":"衡阳市","selected":true},{"name":"张家界市","selected":true},{"name":"邵阳市","selected":true},{"name":"永州市","selected":true},{"name":"澳门半岛","selected":true},{"name":"兰州市","selected":true},{"name":"金昌市","selected":true},{"name":"酒泉市","selected":true},{"name":"嘉峪关市","selected":true},{"name":"天水市","selected":true},{"name":"平凉市","selected":true},{"name":"张掖市","selected":true},{"name":"白银市","selected":true},{"name":"陇南市","selected":true},{"name":"临夏回族自治州","selected":true},{"name":"厦门市","selected":true},{"name":"泉州市","selected":true},{"name":"福州市","selected":true},{"name":"龙岩市","selected":true},{"name":"漳州市","selected":true},{"name":"三明市","selected":true},{"name":"莆田市","selected":true},{"name":"宁德市","selected":true},{"name":"南平市","selected":true},{"name":"贵阳市","selected":true},{"name":"遵义市","selected":true},{"name":"六盘水市","selected":true},{"name":"安顺市","selected":true},{"name":"黔南布依族苗族自治州","selected":true},{"name":"黔西南布依族苗族自治州","selected":true},{"name":"毕节市","selected":true},{"name":"铜仁市","selected":true},{"name":"大连市","selected":true},{"name":"沈阳市","selected":true},{"name":"鞍山市","selected":true},{"name":"盘锦市","selected":true},{"name":"营口市","selected":true},{"name":"阜新市","selected":true},{"name":"锦州市","selected":true},{"name":"葫芦岛市","selected":true},{"name":"辽阳市","selected":true},{"name":"抚顺市","selected":true},{"name":"铁岭市","selected":true},{"name":"朝阳市","selected":true},{"name":"其它区","selected":true},{"name":"渝北区","selected":true},{"name":"江北区","selected":true},{"name":"南岸区","selected":true},{"name":"九龙坡区","selected":true},{"name":"渝中区","selected":true},{"name":"江津区","selected":true},{"name":"北碚区","selected":true},{"name":"沙坪坝区","selected":true},{"name":"大渡口区","selected":true},{"name":"合川区","selected":true},{"name":"万州区","selected":true},{"name":"巴南区","selected":true},{"name":"石柱土家族自治县","selected":true},{"name":"彭水苗族土家族自治县","selected":true},{"name":"秀山土家族苗族自治县","selected":true},{"name":"西安市","selected":true},{"name":"安康市","selected":true},{"name":"铜川市","selected":true},{"name":"咸阳市","selected":true},{"name":"汉中市","selected":true},{"name":"渭南市","selected":true},{"name":"榆林市","selected":true},{"name":"宝鸡市","selected":true},{"name":"延安市","selected":true},{"name":"西宁市","selected":true},{"name":"海南藏族自治州","selected":true},{"name":"香港岛","selected":true},{"name":"哈尔滨市","selected":true},{"name":"大庆市","selected":true},{"name":"鸡西市","selected":true},{"name":"齐齐哈尔市","selected":true},{"name":"伊春市","selected":true},{"name":"牡丹江市","selected":true},{"name":"大兴安岭地区","selected":true},{"name":"绥化市","selected":true},{"name":"佳木斯市","selected":true}]
                }
            ]
        });
    });
}

var currentIdx = 0;

showProvince();

// Draw icon
var zr = myChart.getZr();
zr.remove(app.iconGroup);

var icon0 = new echarts.graphic.Circle({
    shape: { r: 20 },
    style: {
        text: '<',
        fill: '#eee'
    },
    position: [50, zr.getHeight() / 2]
});
var icon1 = new echarts.graphic.Circle({
    shape: { r: 20 },
    style: {
        text: '>',
        fill: '#eee'
    },
    position: [zr.getWidth() - 50, zr.getHeight() / 2]
});
var group = new echarts.graphic.Group();
group.add(icon0);
group.add(icon1);
zr.add(group);

icon0.on('click', function () {
    currentIdx -= 1;
    if (currentIdx < 0) {
        currentIdx += provinces.length;
    }
    showProvince();
});
icon1.on('click', function () {
    currentIdx = (currentIdx + 1) % provinces.length;
    showProvince();
});