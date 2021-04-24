import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal, 
    ModalHeader,
    ModalBody, 
    Input,
    Form,
    FormGroup,
    Label,
  } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'

import {useSelector, useDispatch} from "react-redux";
import { login, logout } from '../../redux/actions';

const UserMenu = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const router = useRouter();

    const onLogin = async () => {
        const variables = { 
            email,
            password,
        }
        const response = await dispatch(login(variables))
        if(response){
            setModal(false);
        }
    }
  
    //TODO handle errors from apollo when wrong credentials

    const [modal, setModal] = useState(false);
  
    const toggleModal = () => setModal(!modal);
  
    const onLogout = async () => {
        const response = await dispatch(logout());
        router.push("/");
    }
    const getUserMenu = () => {
      if(currentUser._id) {
        return <div className="d-flex align-items-center">
             <FontAwesomeIcon icon={faUser}/>
             <div className="mx-2">{currentUser.email}</div>
             <Button size="sm" onClick={()=> {
                 onLogout();
            }}>Logout</Button>
        </div>
      }
      return <Button onClick={()=> {
        setModal(true)
      }} color="success" size="sm">Login</Button>
    }
  
    return (
        <>
            { getUserMenu() }
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        onLogin()
                    }}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"/>
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </Form>
                </ModalBody>
            </Modal>
        </>
    );
  }
  
  export default UserMenu;