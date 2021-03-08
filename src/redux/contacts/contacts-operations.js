import axios from 'axios';
import actions from './contacts-actions';


axios.defaults.baseURL='http://localhost:4040';


const getItemsList = () => dispatch =>{
    dispatch(actions.itemGetRequest());
    axios
    .get('/contacts')
    .then(({data})=>dispatch(actions.itemGetSuccess(data)))
    .catch(error=>dispatch(actions.itemGetError(error)));
}

const addItem = ({name, number}) => dispatch=> {
    const item = {name, number};
    dispatch(actions.itemAddRequest());
    axios
    .post('/contacts', item)
    .then(({data})=>dispatch(actions.itemAddSuccess(data)))
    .catch(error=>dispatch(actions.itemAddError(error))); 

}

const removeItem = id => dispatch=> {
    dispatch(actions.itemRemoveRequest());
    axios
    .delete(`/contacts/${id}`)
    .then(()=>dispatch(actions.itemRemoveSuccess(id)))
    .catch(error=>dispatch(actions.itemRemoveError(error))); 

}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addItem,
    removeItem,
    getItemsList
}