import React, {useState} from 'react'
import '../../style.css'
// import UserContext from '../../context/UserContext';
import { Container, Button } from 'react-bootstrap';
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from '../misc/SuccessNotice';
import Footer from '../layouts/Footer';
import Axios from 'axios';

export default function Contact() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [pnumber, setPnumber] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const sendEmail = async() => {
        const toSend = {
            name,
            email,
            pnumber,
            subject,
            message
        }
        try {
            let res = await Axios.post('email/contact', toSend);
            setName(undefined);
            setEmail(undefined);
            setPnumber(undefined);
            setSubject(undefined);
            setMessage(undefined);
            setSuccess(res.data.success);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div>
        <div className="w3-container w3-light-grey" style={{padding: '128px 16px'}} id="contact">
        <h3 className="w3-center">CONTACT</h3>
        <p className="w3-center w3-large">Please let me know if I can make something for you or if you would just like to ask a question.</p>
        <Container fluid="md" style={{marginTop: 48}}>
            <p><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: JMCraft@gmail.com</p>
            <br />
            <form action="/action_page.php" target="_blank">
            <p><input className="w3-input w3-border" type="text" placeholder="Name" required name="Name" onChange={(e) => setName(e.target.value)} value={name} /></p>
            <p><input className="w3-input w3-border" type="text" placeholder="Email" required name="Email" onChange={(e) => setEmail(e.target.value)} value={email}/></p>
            <p><input className="w3-input w3-border" type="text" placeholder="Phone number (Not Required)" name="Phone Number" onChange={(e) => setPnumber(e.target.value)} value={pnumber}/></p>
            <p><input className="w3-input w3-border" type="text" placeholder="Subject" required name="Subject" onChange={(e) => setSubject(e.target.value)} value={subject}/></p>
            <p><input className="w3-input w3-border" type="text" placeholder="Message" required name="Message" onChange={(e) => setMessage(e.target.value)} value={message}/></p>
            <p>
                <Button disabled={!(name && email && subject && message)} variant="secondary" onClick={sendEmail}>
                <i className="fa fa-paper-plane" /> SEND MESSAGE
                </Button>
            </p>
            </form>
            {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                {success && (
                    <SuccessNotice message={success} clearMessage={() => setSuccess(undefined)} />
                )}
        </Container>
        </div>
        <Footer />
        </div>
    );

}