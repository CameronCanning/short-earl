import { ListGroup, Stack, Button, Card, Container, Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const Earls = ({ earls, loggedin }) => {
    const testEarls = [
        {earl: 'fsdf', url: 'https://youtube.com/wowzers'},
        {earl: '3gge', url: 'https://youtube.com/wowzers'},
        {earl: '3rerwlj', url: 'https://youtube.com/wowzers'},
        {earl: '3231flj', url: 'https://youtube.com/wowzers'}
    ];

    return (
            <Card>
                <ListGroup  variant="flush">
                        {!loggedin && 
                        <ListGroup.Item key={-1} className='bg-warning p-3'>
                            <div className='d-flex flex-wrap'>
                                <span className='me-auto'>Log in to track, manage, and customize your links</span>
                                <Button className='' variant='outline-dark'>Get started</Button>
                            </div>
                        </ListGroup.Item>}
                        {testEarls.map((e,i) => 
                            <ListGroup.Item key={i}> 
                                <Stack direction='horizontal'>
                                    <Stack className='text-truncate'>
                                        <div className='mb-2 text-truncate'>
                                            {e.url}
                                        </div>
                                        <div style={{color: '#888'}}>
                                            {`shortearl.com/${e.earl}`}
                                        </div>                         
                                    </Stack>       
                                    <Button variant="light p-2">                                        
                                        <FontAwesomeIcon className='px-2' icon={faCopy} />                                        
                                    </Button>
                                </Stack>
                            </ListGroup.Item>               
                        )}
                </ListGroup>
            </Card>
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