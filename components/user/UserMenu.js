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

import { useMutation, useLazyQuery, fromPromise, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from "../../queries/user";
import { LOGIN, LOGOUT} from "../../mutations/auth";
import cookieCutter from 'cookie-cutter'

const UserMenu = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [login, { data }] = useMutation(LOGIN);
    const [logout] = useMutation(LOGOUT);
  
    const queryData = useQuery(GET_CURRENT_USER);

    const onLogin = () => {
      const loginData = { 
          variables: { 
              email,
              password,
          },
          refetchQueries: [{ query: GET_CURRENT_USER }]
      }

      login(loginData).then( response => {
            cookieCutter.set("token", response.data.login)
            getCurrentUser();
            setModal(false);
      });
    }
  
    const [modal, setModal] = useState(false);
  
    const toggleModal = () => setModal(!modal);
  
    const onLogout = () => {
        logout();
        cookieCutter.set('token', '', { expires: new Date(0) })
        getCurrentUser();
    }
    const getUserMenu = () => {
      if(queryData.loading || !queryData.called) {
          return null;
      }
      if(queryData.data && queryData.data.currentUser) {
        return <div className="d-flex align-items-center">
             <FontAwesomeIcon icon={faUser}/>
             <div className="mx-2">{queryData.data.currentUser.email}</div>
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