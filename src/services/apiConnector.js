import axios from 'axios'


export const axiosInstance = axios.create({});
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    })
}


// export const apiConnector = (method, url, bodyData, headers, params) => {
//   const requestOptions = {
//     method,
//     headers: headers || {},
//     body: bodyData ? JSON.stringify(bodyData) : undefined,
//   };

//   if (params) {
//     url += `?${new URLSearchParams(params).toString()}`;
//   }

//   return fetch(url, requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.error('Fetch error:', error);
//     });
// };