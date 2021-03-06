import { Component } from "react";
import {connect}  from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './App.module.css';
import ContactsList from "./components/ContactsList";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import LogoPhoneBook from './components/LogoPhoneBook';
import Container from './UI/Container/Container';
import actionsOperations from './redux/contacts/contacts-operations'
import actionsSelectors from './redux/contacts/contacts-selectors'







class App extends Component {

 componentDidMount(){
   this.props.getItemsList();
 }  


  render() {
    const {loading,contacts} = this.props;
    return (
      <>
          {loading === true && (
            <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            />
          ) }
          {loading === false && (
           <>
            <Container>
                <LogoPhoneBook/>
                <ContactForm/>
            </Container>
            <Container>
                <CSSTransition in={contacts.length > 1} 
                  timeout={250} 
                  classNames={styles}
                   unmountOnExit>
                   <div className={styles.SearchForm}>
                   <p>Find contacts by name</p>
                   <Filter/>
                  </div>
                </CSSTransition>
              <ContactsList contacts={contacts} />
            </Container>
           </>
          )}
         <ToastContainer position="top-left" autoClose={2000} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: actionsSelectors.AllContacts(state),
  loading: actionsSelectors.isLoading(state)
})
const mapDispatchToProps = dispatch => ({
  getItemsList: ()=> dispatch(actionsOperations.getItemsList())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
