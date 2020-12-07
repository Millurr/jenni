import React, {useContext, useState} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';
import ErrorNotice from "../../misc/ErrorNotice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AddLocationModal(props) {
    const {userData} = useContext(UserContext);
    const [locName, setLocName] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [show, setShow] = useState(false);
    const [error, setError] = useState();

    const onSubmit = async () => {
        const header = { headers: {'level': userData.user?.level.toString()}}
        let location = {
            'location': locName,
            'show': show,
            'startDate': start,
            'endDate': end,
            'inventory': []
        }

        try {            
            await Axios.post("http://localhost:5000/locations/addLoc/", location, header);
  
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <div style={{display:'flex', flexDirection:'column'}}><h4>Location Name</h4> <input onChange={e => setLocName(e.target.value)}/></div>
          <div style={{display:'flex', flexDirection:'column'}}><h4>Start Date</h4> <DatePicker showTimeSelect dateFormat="Pp" selected={start} onChange={date => setStart(date)} /></div>
          <div style={{display:'flex', flexDirection:'column'}}><h4>End Date</h4> <DatePicker showTimeSelect dateFormat="Pp" selected={end} onChange={date => setEnd(date)} /></div>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}><h4>Show to user?</h4> <Form.Check type="checkbox" onChange={() => setShow(!show)}/></div>
        </Modal.Body>
        <Modal.Footer>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
            <Button variant="outline-info" type="submit" onClick={onSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }