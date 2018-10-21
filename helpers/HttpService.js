import ServiceBase from 'ServiceBase'

class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = {
      wechatSignIn: 'wxapp/public/login',
      messge: 'wxapp/message',
      address:'wxapp/address',
    }
	}

	wechatSignIn(params) {
		return this.postRequest(this.$$path.wechatSignIn, params)
	}
	
	getMessage(params) {
    return this.getRequest(`${this.$$path.messge}/lists`, params)
	}

  getMessageDetail(params) {
    return this.getRequest(`${this.$$path.messge}/read`, params)
  }

  postAddress(params){
    return this.getRequest(`${this.$$path.address}/add`, params)
  }
  
  getOrderDelete(params){
    return this.getRequest(`${this.$$path.user}/order_delete`, params)
  }
  
}

export default Service