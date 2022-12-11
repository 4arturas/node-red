const ACTION_REQUEST_INSERT             = 0;
const ACTION_REQUEST_REFRESH            = 1;
const ACTION_REQUEST_DELETE             = 2;

const ACTION_RESPONSE_INSERT            = 0;
const ACTION_RESPONSE_REFRESH           = 1;
const ACTION_RESPONSE_DELETE            = 2;

const columnsJSon1 = [
    {
        title: 'client_id',
        dataIndex: 'client_id',
        key: 'client_id',
    },
    {
        title: 'amount',
        dataIndex: 'amount',
        key: 'amount',
    },
];

const columnsJSon2 = columnsJSon1;

const columnsJSonP27 = [
    {
        title: 'path',
        dataIndex: 'path',
        key: 'path',
    },
    {
        title: 'value',
        dataIndex: 'value',
        key: 'value',
    },
];

const P27 = () => {

    const { Option } = antd.Select;

    const [ws, setWs] = React.useState(null);

    const [loading, setLoading] = React.useState(false);

    const [jSon1, setJson1] = React.useState([]);
    const [jSon2, setJson2] = React.useState([]);
    const [jSonP27, setJSonP27] = React.useState([]);

    const traverse = function(o, fn, scope = []) {
        for (let i in o) {
            fn.apply(this, [i, o[i], scope]);
            if (o[i] !== null && typeof o[i] === "object") {
                traverse(o[i], fn, scope.concat(i));
            }
        }
    }

    const send = ( action, data ) => {
        setLoading( true );
        ws.send( JSON.stringify({ action: action, data: data } ) );
    }

    React.useEffect( () => {
        const wsLocal = new WebSocket('ws://127.0.0.1:1880/ws/react');
        setWs( wsLocal );

        wsLocal.onopen = function () {
            console.log('A client connected!');

            setLoading( true );
            wsLocal.send('A client connected');
            setWs( wsLocal );

            wsLocal.send( JSON.stringify({ action: ACTION_REQUEST_REFRESH, obj: { data: "" } } ) );
        }

        wsLocal.onmessage = function (e) {

            const jSonData = JSON.parse( e.data );
            console.log( jSonData );
            switch ( jSonData.action )
            {
                case ACTION_RESPONSE_INSERT:
                case ACTION_RESPONSE_REFRESH:
                    const j1 = jSonData.jSon1;
                    const j2 = jSonData.jSon2;
                    const j3 = jSonData.jSon3;
                    setJson1( j1 );
                    setJson2( j2 );

                    const tmpArr = [];

                    let ctx = 0;
                    traverse(j3, (key, value, scope) => {
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

                    setJSonP27( tmpArr );
                    break;

                case ACTION_RESPONSE_DELETE:
                    break;
            }
            setLoading( false );
        }

        return () => { ws.close(); }

    },[]);

    return (
        <div>
            <h1>P27</h1>

            <div>
                <antd.Button loading={loading} onClick={ () => {
                    send( ACTION_REQUEST_INSERT, { traceId: "1111" } );
                } }>
                    Insert 1111
                </antd.Button>
                <antd.Button loading={loading} onClick={ () => {
                    send( ACTION_REQUEST_INSERT, { traceId: "2222" } );
                } }>
                    Insert 2222
                </antd.Button>
                <antd.Button loading={loading} onClick={ () => {
                    send( ACTION_REQUEST_INSERT, { traceId: "3333" } );
                } }>
                    Insert 3333
                </antd.Button>

                <antd.Button loading={loading} onClick={ () => {
                    send( ACTION_REQUEST_REFRESH, { test: "" } );
                } }>
                    Refresh
                </antd.Button>
                <antd.Button loading={loading} onClick={ () => {
                    ws.send( JSON.stringify({ action: ACTION_REQUEST_DELETE, obj: null } ) );
                } }>
                    Delete
                </antd.Button>
            </div>

            <br/>
            <div>
                oc.oc_fraud_s
                <antd.Table dataSource={jSon1} columns={columnsJSon1} pagination={false} loading={loading}/>
            </div>

            <br/>
            <div>
                oc.oc_fraud_s
                <antd.Table dataSource={jSon2} columns={columnsJSon2} pagination={false} loading={loading}/>
            </div>

            <div>
                <br/>
                <antd.Table dataSource={jSonP27} columns={columnsJSonP27} pagination={false} loading={loading}/>
            </div>
        </div>
    );
}