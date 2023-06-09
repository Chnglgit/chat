import '../App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from "@mui/material";
import waves from '../wavess.gif';
import { faStopCircle, faRefresh, faPaperPlane, faMicrophoneAlt, faHome, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import talk from '../talk.webm';
import { useState, useEffect } from 'react';
import { ChatHistory } from './ChatHistory';
import { useNavigate } from "react-router-dom";

export const Chatbot = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Chatbot"
     }, []);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      const [chats, setChats] = useState([]);

      const sendMessage = () => {
        let chat = [{
            key: (new Date()).getTime(),
            userQuery: document.getElementById('textarea-id').value,
            videoResponse: ''
        }];
        setChats([...chats, ...chat]);

        setTimeout(() => {
            const y = document.getElementById('chatbot-main-div').getBoundingClientRect().bottom + window.scrollY;
            console.log(y);
            if (y > 1000) {
                window.scroll({
                    top: y,
                    behavior: 'smooth'
                });
            }
        }, 100);

        setTimeout(() => {
            chat[0].videoResponse = '../talk.webm';
            setChats([...chats, ...chat]);
            setTimeout(() => {
                const y = document.getElementById('chatbot-main-div').getBoundingClientRect().bottom + window.scrollY;
                console.log(y);
                if (y > 770) {
                    window.scroll({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }, 3000);
    
        resetTranscript();
      }

      const backToHome = () => {
        navigate('../');
      }

      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
    
      return (
        <div className="chatbot-main-div" id="chatbot-main-div">
            <div className='chatbot-header-wrap'>
                <div>
                    <FontAwesomeIcon icon={faHome} className='header-icon' onClick={backToHome} style={{cursor:'pointer'}} title='home' />
                </div>
                <div>
                    <h5>Audio Visual Conversational Bot</h5>
                </div>
                <div>
                    <FontAwesomeIcon icon={faRobot} className='header-icon' title='Hello, I am Audio Visual Conversational Bot!' />
                </div>
            </div>
            <ChatHistory chats={chats} />
            <div className="chatbot-footer">
                <img src={waves} className="listeningImg" alt=''
                     style={listening ? { display: 'block' } : { display: 'none' }}/>
                <div className="chatbot-footer-wrap">
                    <div className="chatbot-footer-item">
                        <Button
                                className="controlBtn"
                                variant='contained' 
                                color="success" 
                                title="Start"
                                onClick={SpeechRecognition.startListening}>
                                <FontAwesomeIcon icon={faMicrophoneAlt} />
                        </Button>
                    </div>
                    <div className="chatbot-footer-item">
                        <Button
                                className="controlBtn"
                                variant='contained' 
                                color="error" 
                                title="Stop"
                                onClick={SpeechRecognition.stopListening}>
                                <FontAwesomeIcon icon={faStopCircle} />
                        </Button>
                    </div>
                    <div className="chatbot-footer-item">
                        <Button
                                className="controlBtn"
                                variant='contained' 
                                color="secondary" 
                                title="Reset"
                                onClick={resetTranscript}>
                                <FontAwesomeIcon icon={faRefresh} />
                        </Button>
                    </div>
                    <div className="chatbot-footer-item" style={{width:'100%'}}>
                        <textarea type="text" 
                                  style={{width:'100%', borderRadius:'5px'}} 
                                  value={transcript}
                                  id="textarea-id"
                                  readOnly
                        />
                    </div>
                    <div className="chatbot-footer-item">
                        <Button
                                style={{width:'max-content', marginTop:'6px', borderRadius:'25%/50%'}}
                                variant='contained' 
                                color="info"
                                onClick={sendMessage}>
                                <FontAwesomeIcon icon={faPaperPlane} /> &nbsp; Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      );
}