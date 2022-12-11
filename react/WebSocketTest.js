const WebSocketTest = () => {

    const [resp,setResp] = React.useState(null);
    const [wsTmp, setWsTmp] = React.useState(null);

    React.useEffect(()=>{
        const ws = new WebSocket('ws://127.0.0.1:1880/ws/react');
        setWsTmp( ws );

        ws.onopen = function () {
            console.log('A client connected!');
            ws.send('A client connected');
        }

        ws.onmessage = function (e) {
            console.log(e);
            setResp( e.data );
        }

    },[]);



    return (
        <div>
            <div>Web Socket</div>
            <div>The server time is {resp}</div>
            <div>
                <antd.Button onClick={()=>{
                    wsTmp.send(111);
                }}>
                    Send
                </antd.Button>
            </div>
        </div>
    );
}