import {useReducer, useCallback} from 'react';

const httpReducer = (httpState, action)=>{
    switch(action.type){
      case 'SEND':
        return {loading:true, error:null, data:null, extra:null, reqIdentifier:action.reqIdentifier};
      case 'RESPONSE':
        return {...httpState ,loading:false, data:action.responseData, extra:action.extra}
      case 'ERROR':
        return {loading:false, error:action.error};
      case 'CLEAR':
        return {...httpState, error:null}
      default:
        throw new Error('Should not reeached');
    }
  }
const useHttp = ()=>{
    const [httpState, dispatchHttp] = useReducer(httpReducer, 
        {loading:false, error:null, data:null, extra:null, reqIdentifier:null});
    const sendRequest = useCallback((url, method, body, rextra, reqIdentifier)=>{
        dispatchHttp({type:'SEND', reqIdentifier:reqIdentifier});
        fetch(url,{
            method: method, 
            headers: {
              'Content-Type': 'application/json'              
            },
            body: body
          }).then((response)=>{
              return response.json();
          })
          .then((jsonData)=>{
            dispatchHttp({type:'RESPONSE', responseData:jsonData, extra:rextra});

          })
          .catch((err)=>{
            dispatchHttp({
              type:'ERROR',
              error:'something went wrong'
            })
          })
    });
    return {
        isLoaing:httpState.loading,
        data:httpState.data,
        error:httpState.error,
        sendRequest:sendRequest,
        reqExtra:httpState.extra,
        reqIdentifier:httpState.reqIdentifier

    }
    
};

export default useHttp;