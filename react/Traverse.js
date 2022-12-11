const Traverse = () => {
    const jSon = {
        "Account": {
            "Account Name": "Firefly",
            "Order": [
                {
                    "OrderID": "order103",
                    "Product": [
                        {
                            "Product Name": "Bowler Hat",
                            "ProductID": 858383,
                            "SKU": "0406654608",
                            "Description": {
                                "Colour": "Purple",
                                "Width": 300,
                                "Height": 200,
                                "Depth": 210,
                                "Weight": 0.75
                            },
                            "Price": 34.45,
                            "Quantity": 2
                        },
                        {
                            "Product Name": "Trilby hat",
                            "ProductID": 858236,
                            "SKU": "0406634348",
                            "Description": {
                                "Colour": "Orange",
                                "Width": 300,
                                "Height": 200,
                                "Depth": 210,
                                "Weight": 0.6
                            },
                            "Price": 21.67,
                            "Quantity": 1
                        }
                    ]
                },
                {
                    "OrderID": "order104",
                    "Product": [
                        {
                            "Product Name": "Bowler Hat",
                            "ProductID": 858383,
                            "SKU": "040657863",
                            "Description": {
                                "Colour": "Purple",
                                "Width": 300,
                                "Height": 200,
                                "Depth": 210,
                                "Weight": 0.75
                            },
                            "Price": 34.45,
                            "Quantity": 4
                        },
                        {
                            "ProductID": 345664,
                            "SKU": "0406654603",
                            "Product Name": "Cloak",
                            "Description": {
                                "Colour": "Black",
                                "Width": 30,
                                "Height": 20,
                                "Depth": 210,
                                "Weight": 2
                            },
                            "Price": 107.99,
                            "Quantity": 1
                        }
                    ]
                }
            ]
        }
    };

    const columns = [
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: 400
        },
    ];

    const [dataSource, setDataSource] = React.useState([]);

    const traverse = function(o, fn, scope = []) {
        for (let i in o) {
            fn.apply(this, [i, o[i], scope]);
            if (o[i] !== null && typeof o[i] === "object") {
                traverse(o[i], fn, scope.concat(i));
            }
        }
    }

    let ctx = 0;
    React.useEffect( () => {

        const tmpArr = [];


        traverse(jSon, (key, value, scope) => {
            // if (value === 'Some Value')
            {
                // console.log(`Position: myObject[${scope.concat(key).map(k => isNaN(k) ? `'${k}'` : k).join('][')}]`);

                console.log( `[${scope.concat(key).map(k => isNaN(k) ? `'${k}'` : k).join('][')}] = ${Array.isArray(value)?'':value}` );

                const key = String(ctx++);
                const path = `[${scope.concat(key).map(k => isNaN(k) ? `'${k}'` : k).join('][')}]`;
                const val = Array.isArray(value)?'':value;
                tmpArr.push( { key: key, path: path, value: val } );

            }
        });
        setDataSource(tmpArr);


    },[]);

    return (
        <div>
            <div>Traverse</div>
            <antd.Table dataSource={dataSource} columns={columns} pagination={false}/>
        </div>

    )
}