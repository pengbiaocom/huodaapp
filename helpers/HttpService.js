import ServiceBase from 'ServiceBase'

class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = {
      wechatSignIn: 'wxapp/public/login',
      messge: 'wxapp/message',
      address:'wxapp/address',
      cargo:'home/cargo',
      order:'home/order',
      address1:'home/address',
    }
	}

	wechatSignIn(params) {
		return this.postRequest(this.$$path.wechatSignIn, params)
	}

  getUserAddress(params){
    return this.getRequest(`${this.$$path.address1}/read`, params)
  }

  postAddOrder(params){
    return this.getRequest(`${this.$$path.order}/save`, params)
  }

  getOrderList(params){
    return this.getRequest(`${this.$$path.order}/index`, params)
  }

  getOrderDetail(params){
    return this.getRequest(`${this.$$path.order}/detail`, params)
  }

  getCargo(params){
    return this.getRequest(`${this.$$path.cargo}`, params)
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

  getOrderDate(params){
    return this.getRequest(`${this.$$path.address}/get_estimated_time`, params)
  }
  
  getOrderDelete(params){
    return this.getRequest(`${this.$$path.user}/order_delete`, params)
  }
  
}

export default Service