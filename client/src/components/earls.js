import { ListGroup, Offcanvas, Stack, Button, } from "react-bootstrap";

const Earls = ({ earl, show ,setShow}) => {
    const testEarls = [
        {earl: 'fsdf', url: 'https://youtube.com/wowzers'},
        {earl: '3gge', url: 'https://youtube.com/wowzers'},
        {earl: '3rerwlj', url: 'https://youtube.com/wowzers'},
        {earl: '3231flj', url: 'https://youtube.com/wowzers'}
    ];

    return (
            <Offcanvas show={show} onHide={()=> setShow(false)} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Earls</Offcanvas.Title>
                </Offcanvas.Header>
                <ListGroup  variant="flush">
                    <Offcanvas.Body>
                        {testEarls.map((e,i) => 
                            <ListGroup.Item key={i}> 
                                <Stack direction='horizontal'>
                                    <Stack className='text-truncate'>
                                        <div className='mb-2 text-truncate'>
                                            {e.url}
                                        </div>
                                        <div  style={{color: '#888'}}>
                                            {`shortearl.com/${e.earl}`}
                                        </div>                         
                                    </Stack>       
                                    <Button variant="dark ps-3">
                                        <div className=''>
                                            Copy
                                        </div>                                
                                    </Button>
                                </Stack>
                                                
                            </ListGroup.Item>               
                        )}
                        </Offcanvas.Body>
                </ListGroup>
            </Offcanvas>

    )
}

export default Earls;


/**
 * <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto form-control-lg" placeholder="Paste your long link here" />
            <Button variant="danger btn-lg">
                <p className='ps-3 pe-3 m-0'>Submit</p>
            </Button>
        </Stack>
 */