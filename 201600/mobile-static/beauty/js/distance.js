define([],function(){

    var EARTH_RADIUS = 6378.137,
        rad  = function(d){
            return d * Math.PI/180; 
        },
        getDistance = function(lat1,lng1,lat2,lng2)
        {
            var radLat1 = rad(lat1),
                radLat2 = rad(lat2),
                a = radLat1 - radLat2,
                b = rad(lng1) - rad(lng2),
                s = 2 * Math.asin(Math.sqrt( Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
                s = s * EARTH_RADIUS;
                s = Math.round(s * 10000)/10;
                //返回的m
                return s;
        }
    return {
        getDistance: getDistance
    };
});
