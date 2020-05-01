export const GETLAT_LONG = 'get_lat_long';
export const GET_LAT_LONG_SUCCESS = 'get_lat_long_success';
export const GET_LAT_LONG_FAIL = 'get_lat_long_fail';


export const INITIAL_STATE = {
  lat:'',
  long:''
}


export default (state = INITIAL_STATE,action) => {
  switch(action.type){
    case GETLAT_LONG:{
      return {
        ...state,
        
      }
    }
    case GET_LAT_LONG_SUCCESS:{
      return {
...state,
      lat:action.lat,
      long:action.long
      }
      
    }
    case GET_LAT_LONG_FAIL :{
      return {
...state
      }

    }
  }
}


export const getLatLong = () => {
    
}