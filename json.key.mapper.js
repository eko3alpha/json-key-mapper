/* globals define */
'use strict';
(function(root, factory){
    if(typeof define === 'function' && define.amd){
        // AMD. Register as an anonymous module.
        define([], factory);
    } else{
        // Browser globals
        root.jkm = factory();
    }
}(this, function(){

    /**
     * Holds configuration
     * @type {Object}
     */

    var config = {map: []};

    /**
     * Stores a mapping profile with a given id
     * @param {string} name   mapping profile name
     * @param {object} mapData json object defining your mapping
     */

    var setMap = function(name, mapData){
        config.map[name] = mapData;
    };

    /**
     * Retrieves the mapping profile for a given name
     * @param  {string} name mapping profile name
     * @return {object}      mapping profile
     */

    var getMap = function(name){
        if(config.map[name]){
            return config.map[name];
        }
        return {};
    };

    /**
     * Returns the mapped data based on mapping name
     * @param  {string} mapName mapping profile name
     * @param  {object|array} data    data to be converted
     * @return {object|array}         mapped data
     */

    var map = function(mapInfo, data){

        var map;

        // if no data is passed in then exit, nothing to map
        if(data === undefined){
            return;
        }

        if(typeof mapInfo === 'string'){
            map = getMap(mapInfo);
        } else {
            map = mapInfo;
        }

        // if map is an empty object then
        // return value as is

        if(Object.keys(map).length === 0){
            return data;
        }

        // if data passed is not an array then its
        // a single object so use mapItem
        if(data.length === undefined){
            return mapItem(data, map);
        }

        // if data passed is an array then
        // use mapArray to map the data
        return mapArray(data, map);
    };

    /**
     * Maps arrays based on mapping provided
     * @param  {array} myArray array of json objects
     * @param  {object} map  mapping profile
     * @return {array}       array containing mapped elements
     */

    var mapArray = function(myArray, map){
        var mappedArray = [];
        for(var i = 0; i < myArray.length; i++){
            mappedArray.push(mapItem(myArray[i], map));
        }
        return mappedArray;
    };

    /**
     * Swaps key and values
     * Currently not being used ( planning for future update )
     * @param  {object} json json to be swapped
     * @return {object}      json whose property and values have been switched
     */

    var swapPropVals = function(json){
        var swapped = {};
        for(var key in json){
            if(json.hasOwnProperty(key)){
                swapped[json[key]] = key;
            }
        }
        return swapped;
    };

    /**
     * Maps json based on mapping provided keeping
     * unmapped properties untouched
     * @param  {array} item  json object
     * @param  {object} mapData  mapping profile
     * @return {object}       mapped json object
     */

    var mapItem = function(item, mapData){
        for(var prop in mapData){
            if(mapData.hasOwnProperty(prop) && item[prop]){


                console.log('prop:', prop);
                console.log('map[prop]:', mapData[prop]);
                console.log('item[prop]:', item[prop]);

                if(typeof mapData[prop] === 'object'){
                   item[prop] = map(mapData[prop], item[prop]);
                }else{
                    item[mapData[prop]] = item[prop];
                    delete item[prop];
                }
            }
        }
        return item;
    };

    /**
     * returns interface
     */

    return {
            __private: {config: config,
                        getMap: getMap,
                        mapItem: mapItem,
                        mapArray: mapArray},
            setMap: setMap,
            swapPropVals: swapPropVals,
            map: map
        };
}));
