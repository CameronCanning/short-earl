import { ListGroup, Stack, Button, Card, Container, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CopyButton from "./copyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Earls = ({ earls }) => {

    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Card className='my-3 border-0'>
            <ListGroup  variant="flush">
                    {!authenticated ?
                    <ListGroup.Item key={-1} className='p-3 bg-warning'>
                        <div className='d-flex flex-wrap'>
                            <span className='me-auto align-self-center fs-5'>Log in to track, manage, and customize your links</span>
                            <Button variant='outline-dark' onClick={()=>{navigate('/app/login')}}>Get started</Button>
                        </div>
                    </ListGroup.Item>
                    :
                    earls.length > 0 &&
                    <ListGroup.Item key={-2} className='p-3 bg-secondary'>
                        <Stack direction='horizontal'>
                            <span className='text-truncate fs-4'>
                                Saved Earls
                            </span>                        
                        </Stack>
                    </ListGroup.Item>
                    }
                    {earls.map((e,i) => 
                        <ListGroup.Item key={i}> 
                            <Stack direction='horizontal'>
                                <Stack className='text-truncate me-auto' gap={1}>
                                    <div className='text-truncate'>
                                        {e.url}
                                    </div>
                                    <div style={{color: '#888'}}>
                                        {`shortearl.com/${e._id}`}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faChartSimple}/>
                                        <span className='ps-1'>{e.clicks}</span>
                                    </div>                     
                                </Stack>       
                                <CopyButton text={`localhost:3000/${e._id}`}/>
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