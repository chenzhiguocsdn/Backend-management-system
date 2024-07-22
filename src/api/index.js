import http from "./axios";
export const getData = () => {
  return http.request({
    url: "/home/getDate",
  });
};

export const getUserData = () => {
  return http.request({
    url: "http://localhost:8080/users",
    method: "get",
  });
};

export const createUserData = (data) => {
    return http.request({
        url: "http://localhost:8080/users/create",
        method: "post",
        data
    })
}

export const updataUserData = (data) => {
  return http.request({
    url:"http://localhost:8080/users/updata",
    method: "post",
    data
  })
}

export const deleteUserData = (data) => {
  return http.request({
    url:"http://localhost:8080/users/delete",
    method: "post",
    data
  })
}

export const serchUserData = (name) => {
  return http.request({
    url:"http://localhost:8080/users/search",
    method: "get",
    params: {  
      name: name  
  }  
  })
}

export const confirmLogin = (data) => {
  return http.request({
    url:"http://localhost:8080/login",
    method: "post",
    data
  })
}

// 注册
export const confirmregister = (data) => {
  return http.request({
    url:"http://localhost:8080/register",
    method: "post",
    data
  })
}
