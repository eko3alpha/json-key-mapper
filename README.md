# json-key-mapper
Convert JSON keys from one format to another while preserving its value

Use this library when you need to convert JSON objects from one format to another.  You would use this to convert JSON from ajax calls that have a different structure then your project.  This will work with a single object or an array of objects.  The mapping process is non destructive.  Meaning you only need to define a few keys to convert and only those keys will be converted, the other keys will be left untouched.

Usage:
------
Define your mapping with a key and object.  In this case we want to define 'myUserMap'.  Your application will expect userId and postalCode, however the data source gives you id, and zip properties.  You can define as many mapping profiles as you need.

    jkm.setMap('myUserMap', {
        'id': 'userId',
        'zip': 'postalCode'
    });

Once the mapping has been defined you can pass in your values to be mapped.

    var original = {
        id: '123',
        name: 'eko3alpha',
        zip: '12345',
        country: 'US'
    }

lets convert!

    var converted = jkm.map('myUserMap', original);
    
now your data will be in a format ready to be consumed by your application!

    console.log(converted); // will output:
    
    {
       userId: 123,
       name: 'eko3alpha',
       postalCode: '12345',
       country: 'US'
    }
    
Now lets say you have an array of objects, you can reuse this mapping for each individual object.

    var originalArray = [{
        id: '123',
        name: 'eko3alpha',
        zip: '12345',
        country: 'US'
    },{
        id: '200',
        name: 'johnDoe',
        zip: '90210',
        country: 'US'
    }];
    
    var convertedArray = jkm.map('myUserMap', originalArray);
    
After convertion your new array will look like so:

    console.log(convertedArray); // will output:
    
    [{
       userId: 123,
       name: 'eko3alpha',
       postalCode: '12345',
       country: 'US'
    },{
       userId: 200,
       name: 'johnDoe',
       postalCode: '90210',
       country: 'US'
    }]
    
