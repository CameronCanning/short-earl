import { useState } from 'react';
import { ListGroup, Stack, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CopyButton from "./copyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Earls = ({ earls }) => {

    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const pageLength = 5;
    const start = page*pageLength;
    const end = page*pageLength + pageLength;
    const currentEarls = earls.slice(start, end);
    if (currentEarls.length < pageLength && page !== 0) {
        currentEarls.push(...new Array(pageLength - currentEarls.length).fill(null));
    }

    const nextPage = () => {
        if (earls.length >= end) setPage(prev => prev + 1);        
    }
    const prevPage = () => {
        if (page !== 0) setPage(prev => prev - 1);
    }

    return (
        <Card className='my-3 border-0'>
            {(true) &&
            <ListGroup  variant="flush">
                    {!authenticated ?
                    <ListGroup.Item key={-1} className='p-3 bg-warning'>
                        <div className='d-flex flex-wrap'>
                            <span className='me-auto align-self-center fs-5'>Log in to track and manage your links!</span>
                            <Button variant='outline-primary thick-btn' onClick={()=>{navigate('/app/login')}}>Get started</Button>
                        </div>
                    </ListGroup.Item>
                    :
                    earls.length > 0 &&
                    <ListGroup.Item key={-2} className='p-3 bg-secondary'>
                        <Stack direction='horizontal'>
                            <span className='text-truncate fs-4'>
                                Saved Earls
                            </span>       
                            <div className='ms-auto'>
                                <span className='pe-3 font-monospace' style={{userSelect: 'none'}}>
                                    {`${start+1}-${earls.length < end ? earls.length : end}`}
                                </span>
                                <Button className='btn-arrow' disabled={page === 0} onClick={prevPage}>
                                    <FontAwesomeIcon className='' icon={faAngleLeft} fixedWidth/>
                                </Button>
                                <Button className='btn-arrow' disabled={earls.length <= end} onClick={nextPage}>
                                    <FontAwesomeIcon className='' icon={faAngleRight} fixedWidth/>
                                </Button>
                            </div>                 

                        </Stack>
                    </ListGroup.Item>
                    }
                    {currentEarls.map((e,i) => {
                        if (e) {
                            return (
                            <ListGroup.Item key={i}> 
                                <Stack direction='horizontal'>
                                    <Stack className='text-truncate me-auto dark' gap={1}>
                                        <div className=' fw-bold'>
                                            {`shortearl.herokuapp.com/${e._id}`}
                                        </div>
                                        <div className='text-truncate '>
                                            {e.url}
                                        </div>
                                        {authenticated &&
                                        <div className='c-low'>
                                            <FontAwesomeIcon icon={faChartSimple} fixedWidth/>
                                            <span className='ps-1'>{e.clicks}</span>
                                        </div>
                                        }
                                    </Stack>  
                                    <div className='ps-1'>
                                        <CopyButton className='thick-btn' text={`shortearl.herokuapp.com/${e._id}`}/>
                                    </div>     
                                </Stack>
                            </ListGroup.Item> 
                            )
                        }
                        else {
                            return <ListGroup.Item key={i} style={i < 4 ? {height:'97px'} : {height:'96px'}}/>

                        }                                
                    })}
            </ListGroup>
            }
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