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

const columnsJSonP27 = columnsJSon1;

const P27 = () => {

    const ACTION_REQUEST_INSERT         = 0;
    const ACTION_REQUEST_REFRESH        = 1;
    const ACTION_REQUEST_DELETE         = 2;

    const ACTION_RESPONSE_INSERT         = 0;
    const ACTION_RESPONSE_REFRESH        = 1;
    const ACTION_RESPONSE_DELETE         = 2;


    const { Option } = antd.Select;

    const [resp,setResp] = React.useState(null);
    const [ws, setWs] = React.useState(null);

    const [loading, setLoading] = React.useState(false);

    const [jSon1, setJson1] = React.useState([]);
    const [jSon2, setJson2] = React.useState([]);
    const [jSonP27, setJSonP27] = React.useState([]);

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
            console.log(e);
            setResp( e.data );
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
                    setJSonP27( j3 );
                    break;
                case ACTION_RESPONSE_DELETE:
                    break;
            }
            setLoading( false );
        }

    },[]);



    const [dataSource, setDataSource] = React.useState([]);


    return (
        <div>
            <h1>P27</h1>

            <div>
                <antd.Button loading={loading} onClick={ () => {
                    send( ACTION_REQUEST_INSERT, { test: "" } );
                } }>
                    Insert
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
            <div>
                <br/>
                oc.oc_fraud_s
                <antd.Table dataSource={jSon1} columns={columnsJSon1} pagination={false} loading={loading}/>
            </div>
            <div>
                <br/>
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